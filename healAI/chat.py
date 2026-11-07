import json
import re

from openai import OpenAI

import config
import tools

MAX_TOOL_ROUNDS = 5

ROLE_LABELS = {
    "org": "a signed-in ORGANIZER",
    "user": "a signed-in ATTENDEE",
    None: "NOT signed in (a guest)",
}

SYSTEM_TEMPLATE = """You are healAI, the official assistant of the PureLife Portal — a platform for discovering, creating and booking health & social-service events.

STRICT SCOPE — you ONLY answer questions about this platform:
- events (listing, details, searching, creating, booking)
- bookings (viewing, making one)
- organizer and attendee accounts (registering, signing in, what each role can do)
- how to use the PureLife Portal

If the user asks anything outside that scope (general knowledge, coding, weather, jokes, other products, medical advice, etc.), politely decline in one sentence and steer the conversation back to the PureLife Portal. Never answer out-of-scope questions even if they seem harmless.

GROUNDING RULES:
- Use your tools for ALL platform data. NEVER invent events, ids, dates, bookings or organizations. If you don't know, say so or call a tool.
- Keep replies short, friendly and conversational (2-5 sentences unless the user wants detail).
- Reply in plain text only. Never use Markdown: no **, *, #, backticks, - lists, or emoji headers — the chat UI shows raw characters.
- Dates come from the platform as plain strings; repeat them as stored.

CURRENT SESSION: the user is {role}.
- If they are an ORGANIZER you can create events for them via tools (the event will belong to their organization).
- If they are an ATTENDEE you can browse events, book a spot, and show their bookings. If they ask you to create/update/delete an event, tell them attendees can't do that — they can browse and book instead, and organizers can sign in to manage events.
- If they are a GUEST you can only browse public events. For bookings or creating events, ask them to sign in first.

When the user says something like "go ahead and make me an event", collect any missing details (title, description, address, date, capacity) conversationally, then call the create_event tool once you have them. Confirm the result afterwards.
EVENT RULES: title 3-100 chars, description 10-1000 chars, address 5-200 chars, date in DD-MM-YYYY (e.g. 20-11-2026) and never in the past, capacity 1-99999. Convert dates like "November 20 2026" to 20-11-2026 before calling the tool. If a tool returns an error, explain it plainly to the user and offer to fix the details.
"""


def build_system_prompt(role: str | None) -> str:
    return SYSTEM_TEMPLATE.format(role=ROLE_LABELS.get(role, ROLE_LABELS[None]))


_MARKDOWN_BOLD = re.compile(r"\*\*(.+?)\*\*|__(.+?)__")
_MARKDOWN_ITALIC = re.compile(r"(?<![\w*])\*([^*\n]+)\*(?![\w*])|(?<![\w_])_([^_\n]+)_(?![\w_])")


def strip_markdown(text: str) -> str:
    text = _MARKDOWN_BOLD.sub(lambda m: m.group(1) or m.group(2) or "", text)
    text = _MARKDOWN_ITALIC.sub(lambda m: m.group(1) or m.group(2) or "", text)
    return text


def run_chat(message: str, history: list[dict], token: str | None, role: str | None) -> str:
    client = OpenAI(api_key=config.GROQ_API_KEY, base_url="https://api.groq.com/openai/v1")

    ctx = {"role": role, "token": token, "user_id": None}
    if token:
        claims = tools.decode_token(token)
        if claims and claims.get("sub") is not None:
            ctx["user_id"] = claims["sub"]

    valid_history = [
        {"role": m["role"], "content": m["content"]}
        for m in history[-20:]
        if m.get("role") in ("user", "assistant") and m.get("content")
    ]

    messages = [{"role": "system", "content": build_system_prompt(role)}]
    messages.extend(valid_history)
    messages.append({"role": "user", "content": message})

    available_tools = tools.tools_for_role(role)

    for _ in range(MAX_TOOL_ROUNDS):
        response = client.chat.completions.create(
            model=config.GROQ_MODEL,
            messages=messages,
            tools=available_tools,
        )
        choice = response.choices[0]
        messages.append(choice.message)

        if choice.finish_reason != "tool_calls" or not choice.message.tool_calls:
            return strip_markdown(choice.message.content or "")

        for call in choice.message.tool_calls:
            try:
                args = json.loads(call.function.arguments or "{}")
            except ValueError:
                args = {}
            if not isinstance(args, dict):
                args = {}
            args = {k: v for k, v in args.items() if v is not None}
            call.function.arguments = json.dumps(args)
            try:
                result = tools.run_tool(call.function.name, args, ctx)
            except Exception as exc:
                result = {"error": f"Tool failed: {exc}"}
            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": call.id,
                    "content": json.dumps(result, default=str),
                }
            )

    return "I hit a snag processing that. Could you try again?"
