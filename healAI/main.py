from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import chat
import config

app = FastAPI(title="healAI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[Message] = []
    token: str | None = None
    role: str | None = Field(default=None, pattern="^(org|user)$")


@app.get("/health")
def health():
    return {"status": "ok", "model": config.GROQ_MODEL}


@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    if not config.GROQ_API_KEY:
        raise HTTPException(status_code=503, detail="healAI is not configured: set GROQ_API_KEY in healAI/.env")
    try:
        reply = chat.run_chat(
            message=req.message,
            history=[m.model_dump() for m in req.history],
            token=req.token,
            role=req.role,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"LLM request failed: {exc}") from exc
    return {"reply": reply}
