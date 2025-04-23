from app.models.database import User, get_session
from sqlmodel import Session, select

def get_user_by_username(db: Session, username: str) -> User:
    statement = select(User).where(User.username == username)
    return db.exec(statement).first()

def create_user(db: Session, username: str, hashed_password: str) -> User:
    db_user = User(username=username, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
