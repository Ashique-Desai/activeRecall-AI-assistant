# Chat Service
from typing import AsyncGenerator
from fastapi.responses import StreamingResponse

class ChatService:
    def __init__(self, client):
        self.client = client

    async def generate_response(self, input_text: str) -> AsyncGenerator[str, None]:
        async for chunk in self.client.generate_chat_response_stream(input_text):
            yield chunk
        




        

















