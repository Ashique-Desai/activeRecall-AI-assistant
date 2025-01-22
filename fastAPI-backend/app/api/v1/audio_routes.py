from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import StreamingResponse
from dependency_injector.wiring import inject, Provide  # type: ignore
from app.services.transcription_service import TranscriptionService
from app.services.chat_service import ChatService
from app.core.container import ApplicationContainer

router = APIRouter()

@router.post("/upload-audio")
@inject
async def upload_audio(
    audio: UploadFile = File(...),
    transcription_service: TranscriptionService = Depends(Provide[ApplicationContainer.transcription_service]),
    chat_service: ChatService = Depends(Provide[ApplicationContainer.chat_service]),
):
    try:
        transcription_text = await transcription_service.transcribe_audio(audio)
        print({'transcription_result': transcription_text})
        chat_response = await chat_service.generate_response(transcription_text)
        print({'chat_response': chat_response})
        # return {"transcription": transcription_text, "chat_response": chat_response}
        return StreamingResponse(chat_response, media_type="text/event-stream")
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))