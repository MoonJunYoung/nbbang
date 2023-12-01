from typing import Optional

from fastapi import APIRouter, Header
from pydantic import BaseModel

from backend.base.exceptions import catch_exception
from backend.base.token import Token
from backend.deposit.service import DepositService

deposit_service = DepositService()


class DepositData(BaseModel):
    bank: Optional[str] = None
    account_number: Optional[str] = None
    kakao_deposit_id: Optional[str] = None


class DepositPresentation:
    user_router = APIRouter(prefix="/api/user")
    meeting_router = APIRouter(prefix="/api/meeting/{meeting_id}")

    @user_router.patch("/kakao-deposit-id", status_code=200)
    async def update_deposit_for_user(
        deposit_data: DepositData, Authorization=Header(None)
    ):
        target = "user"
        deposit_type = "kakao_deposit_id"
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            deposit_service.update(
                meeting_id=None,
                user_id=user_id,
                target=target,
                deposit_type=deposit_type,
                kakao_deposit_id=deposit_data.kakao_deposit_id,
            )
        except Exception as e:
            catch_exception(e)

    @user_router.patch("/bank-account", status_code=200)
    async def update_bank_account_for_user(
        deposit_data: DepositData, Authorization=Header(None)
    ):
        target = "user"
        deposit_type = "bank_account"
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            deposit_service.update(
                meeting_id=None,
                user_id=user_id,
                target=target,
                deposit_type=deposit_type,
                bank=deposit_data.bank,
                account_number=deposit_data.account_number,
            )
        except Exception as e:
            catch_exception(e)

    @meeting_router.patch("/kakao-deposit-id", status_code=200)
    async def update_kakao_deposit_id_for_meeting(
        meeting_id: int, deposit_data: DepositData, Authorization=Header(None)
    ):
        target = "meeting"
        deposit_type = "kakao_deposit_id"
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            deposit_service.update(
                meeting_id=meeting_id,
                user_id=user_id,
                target=target,
                deposit_type=deposit_type,
                kakao_deposit_id=deposit_data.kakao_deposit_id,
            )
        except Exception as e:
            catch_exception(e)

    @meeting_router.patch("/bank-account", status_code=200)
    async def update_bank_account_for_meeting(
        meeting_id: int, deposit_data: DepositData, Authorization=Header(None)
    ):
        target = "meeting"
        deposit_type = "bank_account"
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            deposit_service.update(
                meeting_id=meeting_id,
                user_id=user_id,
                target=target,
                deposit_type=deposit_type,
                bank=deposit_data.bank,
                account_number=deposit_data.account_number,
            )
        except Exception as e:
            catch_exception(e)
