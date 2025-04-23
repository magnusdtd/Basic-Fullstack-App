from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from app.models.database import User, get_session
from passlib.context import CryptContext
from app.models.queries import get_user_by_username, create_user
from app.models.database import LoginRequest

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
def register(user: User, db: Session = Depends(get_session)):
    # Check if the user already exists
    existing_user = get_user_by_username(db, user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    hashed_password = pwd_context.hash(user.password)
    create_user(db, user.username, hashed_password)
    return {"message": "User registered successfully."}

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_session)):
    # Check if the user exists
    db_user = get_user_by_username(db, request.username)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    # Verify the password
    if not pwd_context.verify(request.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    return {"message": "Login successful."}
