from backend.domain.member import Member
from backend.domain.payment import Payment


class Billing:
    def __init__(self, payments: list[Payment], members: list[Member]) -> None:
        self.result = {
            "payments": {},
            "billing": {},
        }
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

    def _get_attend_member_data(self, attend_member_ids):
        attend_members = list()
        for attend_meeber_id in attend_member_ids:
            member_name = self._get_member_data(attend_meeber_id)
            attend_members.append(member_name)
        return attend_members

    def _set_memebers(self):
        for member in self.members:
            id = member.id
            name = member.name
            leader = member.leader
            result = {
                "member": name,
                "leader": leader,
                "amount": 0,
            }
            self.result["billing"][id] = result

    def _set_payments(self):
        for payment in self.payments:
            id = payment.id
            place = payment.place
            price = payment.price
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

            member = self.result["billing"][payment.pay_member_id]
            self.result["billing"][payment.pay_member_id]["amount"] = member["amount"] - price

            for attend_member_id in payment.attend_member_ids:
                member = self.result["billing"][attend_member_id]
                self.result["billing"][attend_member_id]["amount"] = member["amount"] + split_price
