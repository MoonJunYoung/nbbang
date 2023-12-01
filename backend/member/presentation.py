from fastapi import APIRouter, Header
from pydantic import BaseModel

from backend.base.exceptions import catch_exception
from backend.base.token import Token
from backend.member.service import MemberService

member_service = MemberService()


class MemberData(BaseModel):
    name: str
    leader: bool


class MemberPresentation:
    router = APIRouter(prefix="/api/meeting/{meeting_id}/member")

    @router.post("", status_code=201)
    async def create(meeting_id, member_data: MemberData, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            member_service.create(
                name=member_data.name,
                leader=member_data.leader,
                meeting_id=meeting_id,
                user_id=user_id,
            )
        except Exception as e:
            catch_exception(e)

    @router.get("", status_code=200)
    async def read(meeting_id, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            members = member_service.read(
                meeting_id,
                user_id=user_id,
            )
            return members
        except Exception as e:
            catch_exception(e)

    @router.put("/{member_id}", status_code=200)
    async def update(
        meeting_id: int,
        member_id: int,
        member_data: MemberData,
        Authorization=Header(None),
    ):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            member_service.update(
                id=member_id,
                name=member_data.name,
                leader=member_data.leader,
                meeting_id=meeting_id,
                user_id=user_id,
            )
        except Exception as e:
            catch_exception(e)

    @router.delete("/{member_id}", status_code=200)
    async def delete(meeting_id: int, member_id: int, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            member_service.delete(
                id=member_id,
                meeting_id=meeting_id,
                user_id=user_id,
            )
        except Exception as e:
            catch_exception(e)
