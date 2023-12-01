from fastapi import APIRouter, Header
from pydantic import BaseModel

from backend.base.exceptions import catch_exception
from backend.base.token import Token
from backend.payment.service import PaymentService

payment_service = PaymentService()


class PaymentData(BaseModel):
    place: str
    price: int
    pay_member_id: int
    attend_member_ids: list[int]


class PaymentPresentation:
    router = APIRouter(prefix="/api/meeting/{meeting_id}/payment")

    @router.post("", status_code=201)
    async def create(meeting_id, payment_data: PaymentData, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            payment_service.create(
                place=payment_data.place,
                price=payment_data.price,
                pay_member_id=payment_data.pay_member_id,
                attend_member_ids=payment_data.attend_member_ids,
                meeting_id=meeting_id,
                user_id=user_id,
            )
        except Exception as e:
            catch_exception(e)

    @router.get("", status_code=200)
    async def read(meeting_id, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            payments = payment_service.read(
                meeting_id=meeting_id,
                user_id=user_id,
            )
            return payments
        except Exception as e:
            catch_exception(e)

    @router.put("/{payment_id}", status_code=200)
    async def update(
        meeting_id: int,
        payment_id: int,
        payment_data: PaymentData,
        Authorization=Header(None),
    ):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            payment_service.update(
                id=payment_id,
                place=payment_data.place,
                price=payment_data.price,
                pay_member_id=payment_data.pay_member_id,
                attend_member_ids=payment_data.attend_member_ids,
                meeting_id=meeting_id,
                user_id=user_id,
            )
        except Exception as e:
            catch_exception(e)

    @router.delete("/{payment_id}", status_code=200)
    async def delete(meeting_id: int, payment_id: int, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            payment_service.delete(
                id=payment_id,
                meeting_id=meeting_id,
                user_id=user_id,
            )
        except Exception as e:
            catch_exception(e)
