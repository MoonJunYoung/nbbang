from backend.domain.payment import Payment
from backend.exceptions import (
    MemberIsLeaderDeleteExcption,
    PaymentInMemberDeleteExcption,
)


class Member:
    def __init__(self, id, name, leader, meeting_id) -> None:
        self.id = id
        self.name = name
        self.leader = leader
        self.meeting_id = meeting_id

    def check_in_payment(self, payments: list[Payment]):
        for payment in payments:
            for attend_member_id in payment.attend_member_ids:
                if self.id == attend_member_id:
                    raise PaymentInMemberDeleteExcption

    def delete_member_if_not_leader(self):
        if self.leader:
            raise MemberIsLeaderDeleteExcption

    def set_amount(self):
        self.amount = 0

    def add_amount(self, amont):
        self.amount = self.amount + amont
