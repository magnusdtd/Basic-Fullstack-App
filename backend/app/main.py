from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from app.models.database import create_db_and_tables
from app.routes.auth import router as auth_router
import os
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth routes
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])

# Serve static React files
app.mount("/static", StaticFiles(directory="app/build/static"), name="static")

@app.get("/")
def serve_react():
    return FileResponse("app/build/index.html")

@app.get("/api/hello")
def say_hello():
    return {"message": "Hello from FastAPI!"}

# Catch-all for React routes (SPA)
@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    path = f"app/build/{full_path}"
    if os.path.exists(path):
        return FileResponse(path)
    return FileResponse("app/build/index.html")

