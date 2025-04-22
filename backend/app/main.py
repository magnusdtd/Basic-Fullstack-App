from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static React files
app.mount("/static", StaticFiles(directory="app/build/static"), name="static")

@app.get("/")
def serve_react():
    return FileResponse("app/build/index.html")

@app.get("/api/hello")
def say_hello():
    return {"message": "Hello from FastAPI!"}

class User(BaseModel):
    name: str

@app.post("/api/user")
def receive_user(user: User):
    return {"greeting": f"Hello, {user.name}!"}

# Optional: Catch-all for React routes (SPA)
@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    path = f"app/build/{full_path}"
    if os.path.exists(path):
        return FileResponse(path)
    return FileResponse("app/build/index.html")

