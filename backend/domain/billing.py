import datetime

from backend.domain.meeting import Meeting
from backend.domain.member import Member
from backend.domain.payment import Payment


class Billing:
    def __init__(self, meeting: Meeting, payments: list[Payment], members: list[Member]) -> None:
        self.meeting = meeting
        self.payments = payments
        self.members = members
        if meeting and payments and members:
            self._set_meeting_dict()
            self._set_members_dict()
            self._set_payments_dict()
        else:
            self.meeting = {}
            self.payments = {}
            self.members = {}

    def _set_meeting_dict(self):
        meeting_dict = dict()
        name = self.meeting.name
        date = self.meeting.date
        total_amount = 0
        bank = self.meeting.bank
        account_number = self.meeting.account_number
        kakao_id = self.meeting.kakao_id
        meeting_dict = {
            "name": name,
            "date": date,
            "total_amount": total_amount,
            "bank": bank,
            "account_number": account_number,
            "kakao_id": kakao_id,
        }
        self.meeting = meeting_dict

    def _set_members_dict(self):
        members_dict = dict()
        for member in self.members:
            name = member.name
            leader = member.leader
            amount = 0
            members_dict[member.id] = {
                "name": name,
                "leader": leader,
                "amount": amount,
            }
        self.members = members_dict

    def _set_payments_dict(self):
        payments_dict = dict()
        for payment in self.payments:
            id = payment.id
            place = payment.place
            price = payment.price
            pay_member = self.members[payment.pay_member_id]["name"]
            attend_members = "".join(
                self.members[member_id]["name"] + ", " for member_id in payment.attend_member_ids
            ).rstrip(" ,")
            attend_members_count = len(payment.attend_member_ids)
            split_price = (
                price // attend_members_count + 1 if price % attend_members_count else price / attend_members_count
            )
            payments_dict[id] = {
                "place": place,
                "price": price,
                "pay_member": pay_member,
                "attend_members": attend_members,
                "attend_members_count": attend_members_count,
                "split_price": split_price,
            }

            self.members[payment.pay_member_id]["amount"] -= price
            for member_id in payment.attend_member_ids:
                self.members[member_id]["amount"] += split_price

            self.meeting["total_amount"] += price
        self.payments = payments_dict
