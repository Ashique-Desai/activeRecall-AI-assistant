# use official Python image
FROM python:3.11-slim

# Install system dependencies if needed
# RUN apt-get update && apt-get install -y \
#     build-essential \
#     libffi-dev \
#     python3-dev \
#     gcc \
#     g++ \
#     make

ENV PYTHONPATH=/app

# set the working directory in the container
WORKDIR /app

# upgrade pip
# RUN pip install --upgrade pip

# install dependency_injector separately as it is throwing error
# RUN pip install --no-cache-dir dependency_injector pydantic_settings
RUN pip install --no-cache-dir pydantic_settings

# copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt --verbose

# clean pip cache to reduce image size 
RUN pip cache purge 


# copy the FastAPI application
COPY . .

# expose the FastAPI port
EXPOSE 8000

# start FastAPI application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
