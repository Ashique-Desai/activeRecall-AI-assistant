from pydantic import BaseModel

class ChatRequest(BaseModel):
    input_text: str

class ChatResponse(BaseModel):
    response: str