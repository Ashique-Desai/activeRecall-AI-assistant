# AI Practice app for students using active recall techniques (frontend Next.js, Backend python)

## Folder structure

```
root/
    ├── client/
    │   ├── src/
    │   │   ├── app/
    │   │   │   ├── page.tsx             # Entry point for the app
    │   │   │   ├── layout.tsx           # Layout for the app
    │   │   │   └── ...
    │   │   ├── components/
    │   │   │   ├── Voice/
    │   │   │   │   ├── RecordButton.tsx
    │   │   │   │   ├── AudioPlayer.tsx
    │   │   │   │   └── AudioRecorder.tsx
    │   │   └── ...
    │   ├── Dockerfile               # Docker configuration for the Next.js app
    │   ├── next.config.mjs          # Next.js configuration
    │   ├── .gitignore               # Git ignore file for client-side code
    │   ├── .dockerignore            # Docker ignore file
    │   ├── tsconfig.json            # TypeScript configuration
    │   ├── package.json             # Node.js dependencies and scripts
    │   ├── README.md                # Documentation for the client app
    │
    ├── fastAPI-backend/
        ├── app/
        │   ├── __init__.py
        │   ├── main.py                # Entry point for the FastAPI app
        │   ├── api/                   # API routes/controllers
        │   │   |
        │   │   ├── v1/                # Versioning for APIs
        │   │   │   |
        │   │   │   ├── chat_routes.py # Routes for the /chat endpoint
        │   │   │   ├── audio_routes.py # Routes for the /upload-audio endpoint
        │   ├── core/                  # Core application settings and configurations
        │   │   |
        │   │   ├── config.py          # Configuration settings
        │   ├── services/              # Business logic for the application
        │   │   |
        │   │   ├── chat_service.py    # Chat-related logic
        │   │   ├── transcription_service.py # Transcription-related logic
        │   ├── clients/               # External API clients
        │   │   |
        │   │   ├── openai_client.py   # Wrapper for the OpenAI API client
        │   ├── models/                # Pydantic models for request/response validation
        │   │   |
        │   │   ├── chat.py            # Chat endpoint models
        │   │   ├── audio.py           # Audio endpoint models
        │   ├── tests/                 # Test suite
        │       |
        │       ├── test_chat_service.py       # Unit tests for ChatService
        │       ├── test_transcription_service.py # Unit tests for TranscriptionService
        │       ├── test_chat_routes.py        # Tests for /chat endpoint
        │       ├── test_audio_routes.py       # Tests for /upload-audio endpoint
        ├── requirements.txt          # Python dependencies
        ├── Dockerfile                # Dockerfile for containerization
        ├── compose.yml               # Docker Compose configuration
        ├── .env                      # Environment variables
        └── README.md                 # Project documentation



```

## Docker commands to start/stop the app in container:

```
systemctl --user start docker-desktop # start the docker engine
docker compose up --build
docker compose down

systemctl --user stop docker-desktop # # stop the docker engine
```

## Features to be added: CHanges to the UI and add Vector database which will enable vector matching capability required for dynamic prompts and providing context to the LLM (RAG).
