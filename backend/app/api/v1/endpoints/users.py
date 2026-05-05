from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService, get_user_service

router = APIRouter()

# Dependency Injection for the service
def get_service(db: Session = Depends(get_db)):
    return get_user_service(db)

@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, service: UserService = Depends(get_service)):
    return service.create_user(user)

@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, service: UserService = Depends(get_service)):
    return service.get_user(user_id)
