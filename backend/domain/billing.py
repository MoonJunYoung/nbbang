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
        meeting_dict = {
            "name": name,
            "date": date,
            "total_amount": total_amount,
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

    def create_share_text(self):
        billing_template = """{meeting}의 정산결과입니다.\n\n결제내역\n============\n{payments}\n정산결과\n============\n이번 모임의 총 사용 금액은 {total_amount}원 입니다.\n{leader}\n\n{members}\ncreated by nbbang.shop"""
        meeting_text = self._set_meeting_text()
        payments_text = self._set_payments_text()
        leader_text, members_text = self._set_members_text()
        total_amount = self.meeting["total_amount"]
        billing_text = billing_template.format(
            meeting=meeting_text,
            payments=payments_text,
            total_amount=format(int(total_amount), ","),
            leader=leader_text,
            members=members_text,
        )
        return billing_text

    def _set_meeting_text(self):
        meeting_template = """{date} {name}"""
        date = datetime.datetime.fromisoformat(self.meeting["date"]).strftime("%Y/%m/%d")
        meeting_text = meeting_template.format(
            date=date,
            name=self.meeting["name"],
        )
        return meeting_text

    def _set_payments_text(self):
        payment_template = """{id}. {place} (결제금액 : {price} 원)\n참석 멤버 : {attend_members}\n결제 멤버 : {pay_member}\n\n"""
        payments_text = ""
        for i, payment in enumerate(self.payments.values()):
            id = i + 1
            place = payment["place"]
            price = payment["price"]
            attend_members = payment["attend_members"]
            pay_member = payment["pay_member"]
            payment_text = payment_template.format(
                id=id,
                place=place,
                price=format(int(price), ","),
                attend_members=attend_members,
                pay_member=pay_member,
            )
            payments_text = payments_text + payment_text
        return payments_text

    def _set_members_text(self):
        leader_template = """{name}님은 {amount}원을 {action} 됩니다."""
        member_template = """{name}님은 {leader}님에게 {amount}원을 {action} 됩니다.\n"""

        members_text = ""
        leader_name = self._get_leader_name()
        for member in self.members.values():
            name = member["name"]
            amount = member["amount"]
            if amount < 0:
                amount = -amount
                action = "받으면"
            else:
                action = "보내면"

            if member["leader"]:
                leader_text = leader_template.format(
                    name=name,
                    amount=format(int(amount), ","),
                    action=action,
                )
            else:
                member_text = member_template.format(
                    name=name,
                    leader=leader_name,
                    amount=format(int(amount), ","),
                    action=action,
                )
                members_text = members_text + member_text
        return leader_text, members_text

    def _get_leader_name(self):
        for member in self.members.values():
            if member["leader"]:
                return member["name"]
