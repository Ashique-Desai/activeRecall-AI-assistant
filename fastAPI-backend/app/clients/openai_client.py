# OpenAI Client
import openai
import asyncio
import logging

class OpenAIClient:
    def __init__(self, api_key: str, model: str = "gpt-4o-mini"):
        self.api_key = api_key
        openai.api_key = self.api_key  # Set the API key
        self.chat = openai.chat  # access the chat API 
        self.audio = openai.audio # access the audio API 
        self.model = model # Allow model selection

        # configure logging
        logging.basicConfig(
            level=logging.INFO,
            format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        )
        self.logger = logging.getLogger(self.__class__.__name__)         

    # Async method to interact with the OpenAI API
    async def generate_chat_response(self, input_text: str) -> str:
        try:
            self.logger.info("generate_response called with input: %s", input_text)  
            # Use asyncio.to_thread to run the synchronous OpenAI API call asynchronously
            response = await asyncio.to_thread(
                self.chat.completions.create,
                model = self.model,
                messages = [
                    {"role": "developer", "content": "You are a helpful assistant."},
                    {"role": "user", "content": input_text},
                ],
                stream = False,  # Set stream=False for standard response
            )
             
            message_content = response.choices[0].message
            self.logger.info("Response received: %s", message_content)
            return message_content  # Return the response text
        except openai.APIError as e:
            #Handle API error here, e.g. retry or log
            self.logger.error("OpenAI API returned an API Error: %s" , e)            
        except openai.APIConnectionError as e:
            #Handle connection error 
            self.logger.error("Failed to connect to OpenAI API: %s", e)           
        except openai.RateLimitError as e:
            #Handle rate limit error (we recommend using exponential backoff)
            self.logger.error("OpenAI API request exceeded rate limit: %s", e)           
        except Exception as e:
            self.logger.error("Error during chat completion: %s", e)
            return "Error generating response"
        
    # generate chat stream response
    async def generate_chat_response_stream(self, input_text: str):
        try:
            # Create a chat completion with streaming enabled
            stream = self.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": input_text},
                ],
                stream=True,
            )

            # Process the stream asynchronously
            for chunk in stream:
                if hasattr(chunk.choices[0].delta, 'content') and chunk.choices[0].delta.content is not None:
                    current_content = chunk.choices[0].delta.content
                    print(chunk.choices[0].delta.content, end="")
                    yield current_content
        except openai.APIError as e:
            #Handle API error here, e.g. retry or log
            self.logger.error("OpenAI API returned an API Error: %s" , e)            
        except openai.APIConnectionError as e:
            #Handle connection error 
            self.logger.error("Failed to connect to OpenAI API: %s", e)           
        except openai.RateLimitError as e:
            #Handle rate limit error (we recommend using exponential backoff)
            self.logger.error("OpenAI API request exceeded rate limit: %s", e)  
        except Exception as e:
            print(f"Error occurred while generating chat response: {e}")
            raise




                        
    
  

            