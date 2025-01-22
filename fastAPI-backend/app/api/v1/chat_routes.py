import asyncio
from fastapi import APIRouter, Body, Depends, HTTPException
from dependency_injector.wiring import inject, Provide # type: ignore
from app.services.chat_service import ChatService
from app.core.container import ApplicationContainer
from app.models.request import RequestModel
from fastapi.responses import StreamingResponse

router = APIRouter()


# @router.get("/chat")
# async def stream_data():
#     async def message_generator():
#         words = [f"word{i}" for i in range(1,20) ]
#         for message in words:
#             yield f"data: {message}\n\n"
#             await asyncio.sleep(1)

#     return StreamingResponse(message_generator(), media_type="text/event-stream")


@router.get("/chat")
@inject
def chat(
    input_text: str,
    chat_service: ChatService = Depends(Provide[ApplicationContainer.chat_service]),
):
    try:
        # Use the service's generator for streaming response
        response_generator = chat_service.generate_response(input_text)
        return StreamingResponse(response_generator, media_type="text/event-stream")
    except ValueError as e:        
        raise HTTPException(status_code=500, detail=str(e))




