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

    def delete_member_if_not_leader(self):
        if self.leader:
            raise MemberIsLeaderDeleteExcption

    def set_amount(self, amount):
        self.amount = amount

    def set_toss_send_link(self, toss_send_link):
        self.toss_send_link = toss_send_link

    def set_kakao_send_link(self, kakao_send_link):
        self.toss_send_link = kakao_send_link
