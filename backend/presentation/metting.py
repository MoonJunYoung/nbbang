from fastapi import APIRouter, HTTPException, Header, Response, Request
from pydantic import BaseModel
from backend.presentation.token import Token
from backend.service.meeting import MeetingService


meeting_service = MeetingService()


class MeetingData(BaseModel):
    name: str
    date: str


class MeetingPresentation:
    router = APIRouter(prefix="/api/meeting")

    @router.post("", status_code=201)
    async def create(request: Request, response: Response, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            meeting = meeting_service.create(user_id)

            base_url = str(request.base_url)
            response.headers["Location"] = f"{base_url}api/meeting/{meeting.id}"
        except Exception as e:
            print(e)
            raise HTTPException(status_code=401, detail=f"{e}")

    @router.get("", status_code=200)
    async def read(Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            meetings = meeting_service.read(user_id)
            return meetings
        except Exception as e:
            raise HTTPException(status_code=401, detail=f"{e}")

    @router.put("/{meeting_id}", status_code=200)
    async def update(meeting_id: int, meeting_date: MeetingData, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            meeting_service.update(
                id=meeting_id,
                name=meeting_date.name,
                date=meeting_date.date,
                user_id=user_id,
            )
        except Exception as e:
            raise HTTPException(status_code=401, detail=f"{e}")

    @router.delete("/{meeting_id}", status_code=200)
    async def delete(meeting_id: int, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            meeting_service.delete(
                id=meeting_id,
                user_id=user_id,
            )
        except Exception as e:
            raise HTTPException(status_code=401, detail=f"{e}")
