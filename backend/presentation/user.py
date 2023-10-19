from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel

from backend.exceptions import catch_exception
from backend.presentation.token import Token
from backend.service.user import UserService

user_service = UserService()


class UserData(BaseModel):
    identifier: str
    password: str


class UserPresentation:
    router = APIRouter(prefix="/api/user")

    @router.get("", status_code=200)
    async def read(Authorization: str = Header(None)):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            return user_service.read(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/sign-up", status_code=201)
    async def sign_up(user_data: UserData):
        try:
            user_id = user_service.sign_up(
                identifier=user_data.identifier,
                password=user_data.password,
            )
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/sign-in", status_code=201)
    async def sign_in(user_data: UserData):
        try:
            user_id = user_service.sign_in(
                identifier=user_data.identifier,
                password=user_data.password,
            )
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)
