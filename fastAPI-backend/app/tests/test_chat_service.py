import pytest  # type: ignore
import pytest_asyncio # type: ignore
from dependency_injector import providers # type: ignore
from app.core.container import ApplicationContainer
from app.services.chat_service import ChatService
from app.mocks.mock_openai_client import MockOpenAIClient


# The unit tests use dependency inversion to create and inject mock class/client 
# instead of patching etc, this is a better way of testing compared to monkey patch or mock functions
@pytest.fixture
def container_with_mock():
    container = ApplicationContainer()
    container.openai_client.override(providers.Factory(MockOpenAIClient))
    return container

@pytest.fixture
def chat_service(container_with_mock):
   return container_with_mock.chat_service()

@pytest.mark.asyncio
async def test_generate_response(chat_service: ChatService):
    input_text = "Hello World!"
    response = await chat_service.generate_chat_response_stream(input_text)
    assert response == f"Mock response to: {input_text}"