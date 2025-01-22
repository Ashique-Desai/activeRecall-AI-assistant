from pydantic import BaseModel

class AudioResponse(BaseModel):
    transcription: str
    chat_response: str
