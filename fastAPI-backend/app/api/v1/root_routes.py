from fastapi import APIRouter
from dependency_injector import wiring


router = APIRouter()

# test at root if the dependency_injector is installed correctlty
@router.get("/")
async def read_root(): 
    APIRouter_info = str(APIRouter)
    wiring_info = str(wiring)   
    print(wiring_info)     # Prints the JSON response from the API
    return {"wiring": wiring_info, "APIRouter": APIRouter_info}

