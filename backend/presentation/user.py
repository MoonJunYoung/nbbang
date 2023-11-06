from fastapi import APIRouter, Header
from pydantic import BaseModel

from backend.exceptions import catch_exception
from backend.presentation.token import Token
from backend.service.user import UserService

user_service = UserService()


class OauthData(BaseModel):
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
    async def google_login(oauth: OauthData):
        try:
            platform = "google"
            name, platform_id = Token.get_user_name_and_platform_id_by_google_oauth(oauth.token)
            user_id = user_service.oauth_login(name, platform_id, platform)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/kakao-login", status_code=201)
    async def kakao_login(oauth: OauthData):
        try:
            platform = "kakao"
            name, platform_id = Token.get_user_name_and_platform_id_by_kakao_oauth(oauth.token)
            user_id = user_service.oauth_login(name, platform_id, platform)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)
