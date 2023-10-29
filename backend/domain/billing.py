import datetime

from backend.domain.meeting import Meeting
from backend.domain.member import Member
from backend.domain.payment import Payment


class Billing:
    def __init__(self, meeting: Meeting, payments: list[Payment], members: list[Member]) -> None:
        self.result = {
            "payments": {},
            "members": {},
            "total_amount": 0,
        }
        self.meeting = meeting
        self.payments = payments
        self.members = members
        self.total_amount = 0

    def add_total_amount(self, amount):
        self.total_amount = self.total_amount + amount

    def create(self):
        self._set_memebers()
        self._set_payments()

    def _split_price(self, payment: Payment):
        price = payment.price
        attend_member_count = len(payment.attend_member_ids)
        if price % attend_member_count:
            return price // attend_member_count + 1
        return price / attend_member_count

    def _get_member_data(self, member_id):
        for member in self.members:
            if member_id == member.id:
                return member.name

    def _get_attend_member_data(self, attend_member_ids) -> str:
        attend_members = ""
        for attend_meeber_id in attend_member_ids:
            member_name = self._get_member_data(attend_meeber_id)
            attend_members = attend_members + member_name + ","
        attend_members = attend_members.rstrip(",")
        return attend_members

    def _set_memebers(self):
        for member in self.members:
            id = member.id
            name = member.name
            leader = member.leader
            result = {
                "name": name,
                "leader": leader,
                "amount": 0,
            }
            self.result["members"][id] = result

    def _set_payments(self):
        total_amount = 0
        for payment in self.payments:
            id = payment.id
            place = payment.place
            price = payment.price
            total_amount = total_amount + payment.price
            pay_member = self._get_member_data(payment.pay_member_id)
            attend_members = self._get_attend_member_data(payment.attend_member_ids)
            attend_member_count = len(payment.attend_member_ids)
            split_price = self._split_price(payment)
            result = {
                "place": place,
                "price": price,
                "pay_member": pay_member,
                "attend_members": attend_members,
                "attend_member_count": attend_member_count,
                "split_price": split_price,
            }
            self.result["payments"][id] = result

            member = self.result["members"][payment.pay_member_id]
            self.result["members"][payment.pay_member_id]["amount"] = member["amount"] - price

            for attend_member_id in payment.attend_member_ids:
                member = self.result["members"][attend_member_id]
                self.result["members"][attend_member_id]["amount"] = member["amount"] + split_price
        self.result["total_amount"] = format(int(total_amount), ",")

    def create_share_text(self):
        billing_template = """{meeting}의 정산결과입니다.\n\n결제내역\n============\n{payments}\n정산결과\n============\n이번 모임의 총 사용 금액은 {total_amount}원 입니다.\n{leader}\n\n{members}\ncreate by nbbang.shop"""
        meeting_text = self._set_meeting_text()
        payments_text = self._set_payments_text()
        leader_text, members_text = self._set_members_text()
        total_amount = self.total_amount
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
        date = datetime.datetime.fromisoformat(self.meeting.date).strftime("%Y/%m/%d")
        meeting_text = meeting_template.format(
            date=date,
            name=self.meeting.name,
        )
        return meeting_text

    def _set_payments_text(self):
        payment_template = """{id}. {place} (결제금액 : {price} 원)\n참석 멤버 : {attend_members}\n결제 멤버 : {pay_member}\n\n"""
        payments_text = ""
        for i, payment in enumerate(self.payments):
            id = i + 1
            place = payment.place
            price = payment.price
            self.add_total_amount(price)
            attend_members = self._get_attend_member_data(payment.attend_member_ids)
            pay_member = self._get_member_data(payment.pay_member_id)
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
        self._set_member_amount_by_payment()
        leader_name = self._get_leader_name()
        for member in self.members:
            name = member.name
            amount = member.amount
            if amount < 0:
                amount = -amount
                action = "받으면"
            else:
                action = "보내면"

            if member.leader:
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
        for member in self.members:
            if member.leader:
                return member.name

    def _set_member_amount(self):
        for member in self.members:
            member.set_amount()

    def _add_member_amount(self, member_id, amount):
        for member in self.members:
            if member.id == member_id:
                member.add_amount(amount)

    def _set_member_amount_by_payment(self):
        self._set_member_amount()
        for payment in self.payments:
            split_price = self._split_price(payment)
            for member_id in payment.attend_member_ids:
                self._add_member_amount(member_id, split_price)
            self._add_member_amount(payment.pay_member_id, -payment.price)
