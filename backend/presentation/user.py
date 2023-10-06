from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.exception import IdentifierAlreadyException, IdentifierNotFoundException, PasswordNotMatchException

from backend.service.user import UserService


user_service = UserService()


class UserData(BaseModel):
    identifier: str = None
    password: str = None


class UserPresentation:
    router = APIRouter(prefix="/api/")

    @router.post("sign-up", status_code=201)
    async def sign_up(user_data: UserData):
        try:
            user_service.sign_up(
                identifier=user_data.identifier,
                password=user_data.password,
            )
        except IdentifierAlreadyException as e:
            raise HTTPException(status_code=409, detail=f"{e}")

    @router.post("sign-in", status_code=201)
    async def sign_in(user_data: UserData):
        try:
            return user_service.sign_in(
                identifier=user_data.identifier,
                password=user_data.password,
            )
        except IdentifierNotFoundException:
            raise HTTPException(status_code=401, detail="incorrect identifier or password")
        except PasswordNotMatchException:
            raise HTTPException(status_code=401, detail="incorrect identifier or password")
