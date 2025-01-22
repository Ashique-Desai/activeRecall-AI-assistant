# app/mocks/mock_openai_client.py
class MockOpenAIClient:
    async def generate_chat_response(self, input_text):
        return f"Mock response to: {input_text}"