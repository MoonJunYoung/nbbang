from fastapi import APIRouter, Header
from pydantic import BaseModel

from backend.base.exceptions import catch_exception
from backend.base.token import Token
from backend.share.service import ShareService

share_service = ShareService()


class SharePresentation:
    read_router = APIRouter(prefix="/api/share")
    create_router = APIRouter(prefix="/api/meeting/{meeting_id}/share")

    @create_router.get("/link", status_code=200)
    async def read_link(meeting_id: int, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            share_link = share_service.create_link(user_id, meeting_id)
            return share_link

        except Exception as e:
            catch_exception(e)

    @read_router.get("/page", status_code=200)
    async def read_page(uuid: str):
        try:
            share_page = share_service.read_page(uuid)
            return share_page

        except Exception as e:
            catch_exception(e)
