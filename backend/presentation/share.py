from fastapi import APIRouter, Header
from pydantic import BaseModel

from backend.exceptions import catch_exception
from backend.presentation.token import Token
from backend.service.share import ShareService

share_service = ShareService()


class SharePresentation:
    router = APIRouter(prefix="/api/share")

    @router.get("/text", status_code=200)
    async def read_text(uuid: str):
        try:
            share_text = share_service.create_text(uuid)
            return share_text
        except Exception as e:
            catch_exception(e)

    @router.get("/link", status_code=200)
    async def read_link(uuid: str):
        try:
            share_link = share_service.create_link(uuid)
            return share_link

        except Exception as e:
            catch_exception(e)

    @router.get("/page", status_code=200)
    async def read_page(uuid: str):
        try:
            share_page = share_service.read_page(uuid)
            return share_page

        except Exception as e:
            catch_exception(e)
