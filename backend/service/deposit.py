from backend.domain.deposit import Deposit
from backend.domain.meeting import Meeting
from backend.domain.user import User
from backend.presentation.deposit import DepositData
from backend.repository.meeting import MeetingRepository
from backend.repository.user import UserRepository


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
        deposit_data: DepositData,
    ):
        if target == "user":
            domain: User = self.user_repository.ReadByID(user_id).run()
            repository = self.user_repository

        elif target == "meeting":
            domain: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
            repository = self.meeting_repository

        pre_deposit = domain.deposit

        if deposit_type == "kakao_deposit_id":
            update_deposit = pre_deposit.update_kakao_deposit_id(
                deposit_data.kakao_deposit_id
            )
            domain.set_deposit(update_deposit)
            repository.UpdateKakaoID(domain).run()

        elif deposit_type == "bank_account":
            update_deposit = pre_deposit.update_bank_account(
                deposit_data.bank, deposit_data.account_number
            )
            domain.set_deposit(update_deposit)
            repository.UpdateAccountNumber(domain).run()
