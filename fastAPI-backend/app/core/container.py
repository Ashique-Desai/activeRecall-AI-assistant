# container.py
from dependency_injector import containers, providers # type: ignore
from app.clients.openai_client import OpenAIClient
from app.services.transcription_service import TranscriptionService
from app.services.chat_service import ChatService



class ApplicationContainer(containers.DeclarativeContainer):
    config = providers.Configuration()

    openai_client = providers.Factory(OpenAIClient, api_key=config.api_key)
   
    transcription_service = providers.Factory(TranscriptionService, client=openai_client)

    chat_service = providers.Factory(ChatService, client=openai_client)
  