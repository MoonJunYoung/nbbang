from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from backend.presentation.token import Token
from backend.service.meeting import MeetingService


meeting_service = MeetingService()


class MeetingData(BaseModel):
    name: str = None
    date: str = None


class MeetingPresentation:
    router = APIRouter(prefix="/api/user/{user_id}/meeting")

    @router.post("", status_code=201)
    async def create(user_id: int, Authorization=Header(None)):
        Token.check_token(token=Authorization, user_id=user_id)
        meeting = meeting_service.create(user_id)
        return meeting

    @router.put("/{meeting_id}", status_code=200)
    async def update(user_id: int, meeting_id: int, Authorization=Header(None), meeting_date=MeetingData):
        Token.check_token(token=Authorization, user_id=user_id)
        meeting = meeting_service.update(
            id=meeting_id,
            name=meeting_date.name,
            date=meeting_date.date,
        )
        return meeting

    @router.delete("/{meeting_id}", status_code=200)
    async def delete(user_id: int, meeting_id: int, Authorization=Header(None)):
        Token.check_token(token=Authorization, user_id=user_id)
        meeting_service.delete(
            id=meeting_id,
        )
