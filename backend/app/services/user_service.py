from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate
from app.repositories.user_repo import UserRepository

class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def get_user(self, user_id: int):
        user = self.repo.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    def create_user(self, user: UserCreate):
        existing_user = self.repo.get_by_email(user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        # In a real app, hash the password here using passlib
        hashed_password = user.password + "_hashed"
        return self.repo.create(user, hashed_password)

def get_user_service(db: Session):
    repo = UserRepository(db)
    return UserService(repo)