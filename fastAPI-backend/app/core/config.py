from pydantic_settings import BaseSettings  # type: ignore # Import BaseSettings from pydantic-settings
from pydantic import ConfigDict  # Import ConfigDict from pydantic

class Settings(BaseSettings):
    OPENAI_API_KEY: str

    # Replace Config with ConfigDict
    model_config: ConfigDict = {
        'env_file': '.env',  
    }

settings = Settings()
