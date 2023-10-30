from fastapi import APIRouter, Header
from pydantic import BaseModel

from backend.exceptions import catch_exception
from backend.presentation.token import Token
from backend.service.user import UserService

user_service = UserService()


class GoogleTokenData(BaseModel):
    token: str


class UserPresentation:
    router = APIRouter(prefix="/api/user")

    @router.get("", status_code=200)
    async def read(Authorization: str = Header(None)):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            return user_service.read(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/google-login", status_code=201)
    async def google_login(google_data: GoogleTokenData):
        try:
            name, email = Token.get_user_name_and_email_by_google_Oauth(google_data.token)
            user_id = user_service.google_login(name, email)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)
