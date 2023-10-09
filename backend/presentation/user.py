from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from backend.exception import (
    IdentifierAlreadyException,
    IdentifierNotFoundException,
    InvalidTokenException,
    PasswordNotMatchException,
)

from backend.service.user import UserService
from backend.presentation.token import Token

user_service = UserService()


class UserData(BaseModel):
    identifier: str = None
    password: str = None


class UserPresentation:
    router = APIRouter(prefix="/api")

    @router.post("/sign-up", status_code=201)
    async def sign_up(user_data: UserData):
        if not user_data.identifier or not user_data.password:
            raise HTTPException(status_code=422, detail="empty value")
        try:
            user_id = user_service.sign_up(
                identifier=user_data.identifier,
                password=user_data.password,
            )
            return Token.create_token_by_user_id(user_id)

        except IdentifierAlreadyException as e:
            raise HTTPException(status_code=409, detail=f"{e}")

    @router.post("/sign-in", status_code=201)
    async def sign_in(user_data: UserData):
        if not user_data.identifier or not user_data.password:
            raise HTTPException(status_code=422, detail="empty value")
        try:
            user_id = user_service.sign_in(
                identifier=user_data.identifier,
                password=user_data.password,
            )
            return Token.create_token_by_user_id(user_id)

        except IdentifierNotFoundException:
            raise HTTPException(status_code=401, detail="incorrect identifier or password")
        except PasswordNotMatchException:
            raise HTTPException(status_code=401, detail="incorrect identifier or password")

    @router.get("/user", status_code=200)
    async def get_user(Authorization: str = Header(None)):
        Token.check_token(Authorization)
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            return user_service.get_user(user_id)
        except Exception as e:
            raise HTTPException(status_code=401, detail=f"{e}")
