from fastapi import APIRouter, Cookie, HTTPException
from backend.presentation.token import Token
from backend.service.meeting import MeetingService


meeting_service = MeetingService()


class MeetingPresentation:
    router = APIRouter(prefix="/api/user/{user_id}/meeting")

    @router.post("", status_code=201)
    async def create(user_id: int, authToken=Cookie(None)):
        if not authToken:
            raise HTTPException(status_code=401, detail="authToken is missing")
        token_user_id = Token.get_user_id_by_token(authToken)
        if user_id != token_user_id:
            raise HTTPException(status_code=403, detail="not permission to resource")
        meeting = meeting_service.create(user_id)
        return meeting
