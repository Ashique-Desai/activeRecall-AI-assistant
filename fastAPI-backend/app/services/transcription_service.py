from io import BytesIO
from fastapi import UploadFile

class TranscriptionService:
    def __init__(self, client):
        self.client = client

    async def transcribe_audio(self, audio: UploadFile) -> str:
        try:
            file_content = await audio.read()
            audio_file = BytesIO(file_content)
            audio_file.name = audio.filename

            transcription = self.client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
            return transcription.text
        except Exception as e:
            raise ValueError(f"Error during transcription: {str(e)}")
