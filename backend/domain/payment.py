from backend.domain.member import Member
from backend.exceptions import PaymentInMemberDeleteExcption


class Payment:
    def __init__(
        self, id, place, price, pay_member_id, attend_member_ids, meeting_id
    ) -> None:
        self.id = id
        self.place = place
        self.price = price
        self.pay_member_id = pay_member_id
        self.attend_member_ids = attend_member_ids
        self.meeting_id = meeting_id

    def check_in_member(self, member: Member):
        for attend_member_id in self.attend_member_ids:
            if member.id == attend_member_id:
                raise PaymentInMemberDeleteExcption

    def set_split_price(self, split_pirce):
        self.split_price = split_pirce

    def set_pay_member(self, pay_member):
        self.pay_member = pay_member

    def set_attend_member(self, attend_member):
        self.attend_member = attend_member
