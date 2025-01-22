# tests/test_audio_routes.py
import pytest  # type: ignore
from fastapi.testclient import TestClient
from app.main import create_app
from app.core.container import ApplicationContainer

@pytest.fixture
def test_app(monkeypatch):
    # Mock the environment variable for testing
    monkeypatch.setenv("OPENAI_API_KEY", "mock_test_key")
    
    container = ApplicationContainer()
    container.config.api_key.override("mock_test_key")  # Optional override
    
    # Create the app after setting the environment variable
    app = create_app()
    app.container = container
    return app

def test_audio_route_dependency_injection(test_app):
    with TestClient(test_app) as client:
        response = client.post("/audio/upload-audio")
        assert response.status_code != 500, "Dependency injection failed!"






