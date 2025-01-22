# for testing (delete later) 
# Test chroma db installation and sample code

from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
import asyncio
import chromadb

# Create a Chroma Client
chroma_client = chromadb.Client()

#Create a collection
collection = chroma_client.create_collection(name="my_collection")

# Add some text documents to the collection
collection.add(
    documents=[
        "This is a document about pineapple",
        "This is a document about oranges"],
        ids=["id1", "id2"]
)

# Query the collection
results = collection.query(
    query_texts=["This is a query document about hawaii"], # Chroma will embed this for you
    n_results=2 # how many results to return
)

async def main():      
    print("Chroma result:", results)

# Run the example async function
asyncio.run(main())






