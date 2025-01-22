from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.chat_routes import router as chat_router
from app.api.v1.root_routes import router as root_router
from app.api.v1.audio_routes import router as audio_router
from app.core.container import ApplicationContainer
from fastapi.responses import StreamingResponse


def create_app() -> FastAPI:
    container = ApplicationContainer()   

    # Load the settings into the container
    container.config.from_dict({
        "api_key": settings.OPENAI_API_KEY,  # Populate the container with the API key
    })

    app = FastAPI(title="Transcription & Chat API", version="1.0.0")

    # dependency injection
    app.container = container

    # Wire the container
    container.wire(modules=[       
        "app.api.v1.chat_routes",
        "app.api.v1.audio_routes",
    ])

    # test streaming
    async def fake_video_streamer():
        for i in range(32000):
            yield b"some fake video bytes"

    @app.get("/get-stream")
    async def getStream():
        return StreamingResponse(fake_video_streamer())
     # end of test streaming

    # register routers
    app.include_router(root_router, prefix="", tags=["Root"])
    app.include_router(chat_router, prefix="", tags=["Chat"] )
    app.include_router(audio_router, prefix="", tags=["Audio"])
    
 

    return app

app = create_app()