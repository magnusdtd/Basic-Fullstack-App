from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from app.models.database import User, get_session
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
def register(user: User, db: Session = Depends(get_session)):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User registered successfully."}

@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_session)):
    statement = select(User).where(User.username == username)
    db_user = db.exec(statement).first()
    if not db_user or not pwd_context.verify(password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    return {"message": "Login successful."}
