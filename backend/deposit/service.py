from backend.meeting.domain import Meeting
from backend.meeting.repository import MeetingRepository
from backend.user.domain import User
from backend.user.repository import UserRepository


class DepositService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.user_repository = UserRepository()

    def update(
        self,
        meeting_id,
        user_id,
        target,
        deposit_type,
        kakao_deposit_id=None,
        bank=None,
        account_number=None,
    ):
        if target == "user":
            domain: User = self.user_repository.ReadByID(user_id).run()
            repository = self.user_repository

        elif target == "meeting":
            domain: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
            repository = self.meeting_repository

        deposit = domain.deposit

        if deposit_type == "kakao_deposit_id":
            deposit.update_kakao_deposit_id(kakao_deposit_id)
            domain.set_deposit(deposit)
            repository.UpdateKakaoID(domain).run()

        elif deposit_type == "bank_account":
            deposit.update_bank_account(bank, account_number)
            domain.set_deposit(deposit)
            repository.UpdateAccountNumber(domain).run()
