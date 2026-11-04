import httpx
import jwt

import config
import db


def decode_token(token: str) -> dict | None:
    try:
        return jwt.decode(
            token,
            config.SECRET_KEY,
            algorithms=["HS256"],
            options={"require": ["exp"], "verify_sub": False},
        )
    except Exception:
        return None


def _list_events(search: str = "") -> list[dict]:
    if search:
        rows = db.query(
            """SELECT id, title, "desc", address, date, strength, org_refer
               FROM posts
               WHERE deleted_at IS NULL
                 AND (title ILIKE %s OR "desc" ILIKE %s OR address ILIKE %s)
               ORDER BY id DESC LIMIT 50""",
            (f"%{search}%", f"%{search}%", f"%{search}%"),
        )
    else:
        rows = db.query(
            """SELECT id, title, "desc", address, date, strength, org_refer
               FROM posts WHERE deleted_at IS NULL ORDER BY id DESC LIMIT 50"""
        )
    return rows


def _get_event(event_id: int) -> dict:
    rows = db.query(
        """SELECT id, title, "desc", address, date, strength, org_refer
           FROM posts WHERE id = %s AND deleted_at IS NULL""",
        (event_id,),
    )
    if not rows:
        return {"error": f"Event {event_id} not found."}
    return rows[0]


def _list_my_bookings(user_id: int) -> list[dict]:
    return db.query(
        """SELECT p.id, p.title, p."desc", p.address, p.date, p.strength
           FROM user_events ue
           JOIN posts p ON p.id = ue.post_id AND p.deleted_at IS NULL
           WHERE ue.user_id = %s
           ORDER BY p.id DESC LIMIT 50""",
        (user_id,),
    )


def _create_event(token: str, title: str, desc: str, address: str, date: str, strength: int) -> dict:
    try:
        resp = httpx.post(
            f"{config.GO_API_URL}/postevent",
            json={
                "Title": title,
                "Desc": desc,
                "Address": address,
                "Date": date,
                "Strength": strength,
            },
            headers={"Authorization": f"Bearer {token}"},
            timeout=15,
        )
    except httpx.HTTPError as exc:
        return {"error": f"Could not reach the platform API: {exc}"}
    body = {}
    if resp.headers.get("content-type", "").startswith("application/json"):
        try:
            body = resp.json()
        except ValueError:
            body = {}
    if resp.status_code >= 400:
        message = body.get("message") or body.get("Message") or ""
        return {"error": message or f"Platform API rejected the request (HTTP {resp.status_code})."}
    data = body.get("user", {})
    return {
        "id": data.get("ID") or data.get("Id") or data.get("id"),
        "title": data.get("Title", title),
        "desc": data.get("Desc", desc),
        "address": data.get("Address", address),
        "date": data.get("Date", date),
        "strength": data.get("Strength", strength),
        "org_refer": data.get("OrgRefer"),
        "created": True,
    }


def _book_event(token: str, event_id: int) -> dict:
    try:
        resp = httpx.post(
            f"{config.GO_API_URL}/bookings/{event_id}",
            json={},
            headers={"Authorization": f"Bearer {token}"},
            timeout=15,
        )
    except httpx.HTTPError as exc:
        return {"error": f"Could not reach the platform API: {exc}"}
    body = resp.json() if resp.headers.get("content-type", "").startswith("application/json") else {}
    message = body.get("Message") or body.get("message") or ""
    if resp.status_code >= 400:
        return {"error": message or f"Booking failed (HTTP {resp.status_code})."}
    return {"booked": True, "event_id": event_id, "message": message or "Booked successfully."}


LIST_EVENTS = {
    "type": "function",
    "function": {
        "name": "list_events",
        "description": "List events on the PureLife Portal, optionally filtered by a search term.",
        "parameters": {
            "type": "object",
            "properties": {
                "search": {
                    "type": "string",
                    "description": "Optional search text matched against title, description and address.",
                }
            },
        },
    },
}

GET_EVENT = {
    "type": "function",
    "function": {
        "name": "get_event",
        "description": "Fetch a single event by its id.",
        "parameters": {
            "type": "object",
            "properties": {"event_id": {"type": "integer"}},
            "required": ["event_id"],
        },
    },
}

LIST_MY_BOOKINGS = {
    "type": "function",
    "function": {
        "name": "list_my_bookings",
        "description": "List the events the signed-in attendee has booked.",
        "parameters": {"type": "object", "properties": {}},
    },
}

CREATE_EVENT = {
    "type": "function",
    "function": {
        "name": "create_event",
        "description": "Create a new event on the PureLife Portal under the signed-in organizer's account.",
        "parameters": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string",
                    "description": "Event title, 3-100 characters.",
                },
                "desc": {
                    "type": "string",
                    "description": "Event description, 10-1000 characters.",
                },
                "address": {
                    "type": "string",
                    "description": "Event location/address, 5-200 characters.",
                },
                "date": {
                    "type": "string",
                    "description": "Event date in DD-MM-YYYY format (e.g. 20-11-2026). Must be today or later. Convert any natural-language date to this format.",
                },
                "strength": {
                    "type": "integer",
                    "description": "Number of available spots, between 1 and 99999.",
                },
            },
            "required": ["title", "desc", "address", "date", "strength"],
        },
    },
}

BOOK_EVENT = {
    "type": "function",
    "function": {
        "name": "book_event",
        "description": "Book a spot in an event for the signed-in attendee.",
        "parameters": {
            "type": "object",
            "properties": {"event_id": {"type": "integer"}},
            "required": ["event_id"],
        },
    },
}


def tools_for_role(role: str | None) -> list[dict]:
    tools = [LIST_EVENTS, GET_EVENT]
    if role == "org":
        tools.append(CREATE_EVENT)
    elif role == "user":
        tools.extend([LIST_MY_BOOKINGS, BOOK_EVENT])
    return tools


def run_tool(name: str, args: dict, ctx: dict) -> dict:
    if name == "list_events":
        return {"events": _list_events(args.get("search", ""))}
    if name == "get_event":
        return _get_event(int(args["event_id"]))
    if name == "list_my_bookings":
        return {"bookings": _list_my_bookings(int(ctx["user_id"]))}
    if name == "create_event":
        if ctx.get("role") != "org":
            return {"error": "Only organizer accounts can create events."}
        return _create_event(
            ctx["token"],
            args["title"],
            args["desc"],
            args["address"],
            args["date"],
            int(args["strength"]),
        )
    if name == "book_event":
        if ctx.get("role") != "user":
            return {"error": "Only attendee accounts can book events."}
        return _book_event(ctx["token"], int(args["event_id"]))
    return {"error": f"Unknown tool: {name}"}
