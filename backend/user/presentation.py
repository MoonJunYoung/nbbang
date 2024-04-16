from typing import Optional

from base.database_connector import get_db_session
from base.exceptions import catch_exception
from base.token import Token
from fastapi import APIRouter, Depends, Header
from pydantic import BaseModel
from user.service import UserService

user_service = UserService()


class LogInData(BaseModel):
    identifier: str
    password: str
    name: str = None


class OauthData(BaseModel):
    token: str


class DepositInformationData(BaseModel):
    bank: Optional[str] = None
    account_number: Optional[str] = None
    kakao_deposit_id: Optional[str] = None


class UserPresentation:
    router = APIRouter(prefix="/api/user")

    @router.get("", status_code=200)
    async def read(
        Authorization: str = Header(None), db_session=Depends(get_db_session)
    ):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            return user_service.read(user_id, db_session)

        except Exception as e:
            catch_exception(e)

    @router.post("/sign-up", status_code=201)
    async def sign_up(login_data: LogInData, db_session=Depends(get_db_session)):
        try:
            user_id = user_service.sign_up(
                identifier=login_data.identifier,
                password=login_data.password,
                name=login_data.name,
                db_session=db_session,
            )
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/sign-in", status_code=201)
    async def sign_in(login_data: LogInData, db_session=Depends(get_db_session)):
        try:
            user_id = user_service.sign_in(
                identifier=login_data.identifier,
                password=login_data.password,
                db_session=db_session,
            )
            return Token.create_token_by_user_id(user_id)
        except Exception as e:
            catch_exception(e)

    @router.post("/google-login", status_code=201)
    async def google_login(oauth: OauthData, db_session=Depends(get_db_session)):
        try:
            platform = "google"
            name, platform_id = Token.get_user_name_and_platform_id_by_google_oauth(
                oauth.token
            )
            user_id = user_service.oauth_login(name, platform_id, platform, db_session)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/kakao-login", status_code=201)
    async def kakao_login(oauth: OauthData, db_session=Depends(get_db_session)):
        try:
            platform = "kakao"
            name, platform_id = Token.get_user_name_and_platform_id_by_kakao_oauth(
                oauth.token
            )
            user_id = user_service.oauth_login(name, platform_id, platform, db_session)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/naver-login", status_code=201)
    async def naver_login(oauth: OauthData, db_session=Depends(get_db_session)):
        try:
            platform = "naver"
            name, platform_id = Token.get_user_name_and_platform_id_by_naver_oauth(
                oauth.token
            )
            user_id = user_service.oauth_login(name, platform_id, platform, db_session)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.put("/kakao-deposit-id", status_code=200)
    async def edit_kakao_deposit_information(
        deposit_information_data: DepositInformationData,
        Authorization=Header(None),
        db_session=Depends(get_db_session),
    ):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            user_service.edit_kakao_deposit(
                user_id=user_id,
                kakao_deposit_id=deposit_information_data.kakao_deposit_id,
                db_session=db_session,
            )
        except Exception as e:
            catch_exception(e)

    @router.put("/bank-account", status_code=200)
    async def edit_toss_deposit_information(
        deposit_information_data: DepositInformationData,
        Authorization=Header(None),
        db_session=Depends(get_db_session),
    ):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            user_service.edit_toss_deposit(
                user_id=user_id,
                bank=deposit_information_data.bank,
                account_number=deposit_information_data.account_number,
                db_session=db_session,
            )
        except Exception as e:
            catch_exception(e)
