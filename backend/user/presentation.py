from fastapi import APIRouter, Header
from pydantic import BaseModel

from backend.base.exceptions import catch_exception
from backend.base.token import Token
from backend.user.service import UserService

user_service = UserService()


class LogInData(BaseModel):
    identifier: str
    password: str
    name: str = None


class OauthData(BaseModel):
    token: str


class AccountData(BaseModel):
    bank: str = None
    account_number: str = None
    kakao_id: str = None


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
    async def sign_up(login_data: LogInData):
        try:
            user_id = user_service.sign_up(
                identifier=login_data.identifier,
                password=login_data.password,
                name=login_data.name,
            )
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/sign-in", status_code=201)
    async def sign_in(login_data: LogInData):
        try:
            user_id = user_service.sign_in(
                identifier=login_data.identifier,
                password=login_data.password,
            )
            return Token.create_token_by_user_id(user_id)
        except Exception as e:
            catch_exception(e)

    @router.post("/google-login", status_code=201)
    async def google_login(oauth: OauthData):
        try:
            platform = "google"
            name, platform_id = Token.get_user_name_and_platform_id_by_google_oauth(
                oauth.token
            )
            user_id = user_service.oauth_login(name, platform_id, platform)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/kakao-login", status_code=201)
    async def kakao_login(oauth: OauthData):
        try:
            platform = "kakao"
            name, platform_id = Token.get_user_name_and_platform_id_by_kakao_oauth(
                oauth.token
            )
            user_id = user_service.oauth_login(name, platform_id, platform)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/naver-login", status_code=201)
    async def naver_login(oauth: OauthData):
        try:
            platform = "naver"
            name, platform_id = Token.get_user_name_and_platform_id_by_naver_oauth(
                oauth.token
            )
            user_id = user_service.oauth_login(name, platform_id, platform)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)
