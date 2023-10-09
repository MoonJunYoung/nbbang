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
        token = Authorization
        if not token:
            raise HTTPException(status_code=401, detail="authToken is missing")
        token_user_id = Token.get_user_id_by_token(token)
        if user_id != token_user_id:
            raise HTTPException(status_code=403, detail="not permission to resource")
        meeting = meeting_service.create(user_id)
        return meeting

    @router.put("/{meeting_id}", status_code=200)
    async def update(user_id: int, meeting_id: int, Authorization=Header(None), meeting_date=MeetingData):
        token = Authorization
        if not token:
            raise HTTPException(status_code=401, detail="authToken is missing")
        token_user_id = Token.get_user_id_by_token(token)
        if user_id != token_user_id:
            raise HTTPException(status_code=403, detail="not permission to resource")
        meeting = meeting_service.update(
            id=meeting_id,
            name=meeting_date.name,
            date=meeting_date.date,
        )
        return meeting
