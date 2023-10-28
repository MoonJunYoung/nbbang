from fastapi import APIRouter, Header

from backend.exceptions import catch_exception
from backend.presentation.token import Token
from backend.service.billing import BillingService

billing_service = BillingService()


class BillingPresentation:
    router = APIRouter(prefix="/api/meeting/{meeting_id}/billing")

    @router.get("", status_code=200)
    async def read(meeting_id, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            billing = billing_service.create(
                meeting_id,
                user_id=user_id,
            )
            return billing
        except Exception as e:
            catch_exception(e)

    @router.get("/share", status_code=200)
    async def share(meeting_id, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(token=Authorization)
            billing = billing_service.share(
                meeting_id,
                user_id=user_id,
            )
            return billing
        except Exception as e:
            catch_exception(e)
