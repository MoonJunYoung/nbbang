from backend.exceptions import (
    MemberIsLeaderDeleteExcption,
    PaymentInMemberDeleteExcption,
)


class Member:
    def __init__(self, id, name, leader, meeting_id, amount=0) -> None:
        self.id = id
        self.name = name
        self.leader = leader
        self.meeting_id = meeting_id
        self.amount = amount

    def delete_member_if_not_leader(self):
        if self.leader:
            raise MemberIsLeaderDeleteExcption

    def add_amount(self, amount):
        self.amount += amount

    def set_toss_deposit_link(self, toss_deposit_link):
        self.toss_deposit_link = toss_deposit_link

    def set_kakao_deposit_link(self, kakao_deposit_link):
        self.kakao_deposit_link = kakao_deposit_link
