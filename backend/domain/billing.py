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

    def create(self):
        self._set_memebers()
        self._set_payments()

    def _split_price(self, price, attend_member_count):
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
            split_price = self._split_price(price, attend_member_count)
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
        billing_template = """{meeting}의 정산결과입니다.
        
결제내역
============
{payments}
정산결과
============
이번 모임의 총 사용 금액은 {total_amount}원 입니다.
{leader}
{members}"""

        meeting_text = self._set_meeting_text(self.meeting)
        payments_text = self._set_payments_text(self.result["payments"])
        leader_text, members_text = self._set_members_text(self.result["members"])
        total_amount = self.result["total_amount"]
        billing_text = billing_template.format(
            meeting=meeting_text,
            payments=payments_text,
            total_amount=total_amount,
            leader=leader_text,
            members=members_text,
        )
        return billing_text

    def _set_meeting_text(self, meeting):
        meeting_template = """{date} {name}"""
        meeting_text = meeting_template.format(date=meeting.date, name=meeting.name)
        return meeting_text

    def _set_payments_text(self, payments):
        payment_template = """{id}. {place} (결제금액 : {price} 원)
참석 멤버 : {attend_members}
결제 멤버 : {pay_member}

"""

        payments_text = ""

        for i, payment_id in enumerate(payments):
            payment = self.result["payments"][payment_id]
            id = i + 1
            place = payment["place"]
            price = payment["price"]
            attend_members = payment["attend_members"]
            pay_member = payment["pay_member"]
            payment_text = payment_template.format(
                id=id,
                place=place,
                price=format(price, ","),
                attend_members=attend_members,
                pay_member=pay_member,
            )

            payments_text = payments_text + payment_text
        return payments_text

    def _set_members_text(self, members):
        leader_template = """{name}님은 {amount}원을 {action} 됩니다."""

        member_template = """
{name}님은 {leader}님에게 {amount}원을 {action} 됩니다."""

        members_text = ""

        leader_name = self._get_leader_name(members)

        for member_id in members:
            member = self.result["members"][member_id]
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

    def _get_leader_name(self, members):
        for member_id in members:
            member = self.result["members"][member_id]
            if member["leader"]:
                return member["name"]
