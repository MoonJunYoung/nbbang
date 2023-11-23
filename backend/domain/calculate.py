from backend.domain.member import Member
from backend.domain.payment import Payment


class Calculate:
    def __init__(self, members: list[Member], payments: list[Payment]) -> None:
        self.members = members
        self._set_members_dict()
        self.payments = payments
        self._set_payments_dict()

    def _set_members_dict(self):
        members_dict = dict()
        for member in self.members:
            members_dict[member.id] = {
                "name": member.name,
                "leader": member.leader,
                "amount": 0,
            }
        self.members_dict = members_dict

    def _set_payments_dict(self):
        payments_dict = dict()
        for payment in self.payments:
            payments_dict[payment.id] = {
                "place": payment.place,
                "price": payment.price,
                "pay_member_id": payment.pay_member_id,
                "attend_member_ids": payment.attend_member_ids,
            }
        self.payments_dict = payments_dict

    def split_payments(self):
        for payment in self.payments:
            split_price = self._split_price(payment)
            attend_member = [
                self.members_dict[member_id]["name"]
                for member_id in payment.attend_member_ids
            ]
            pay_member = self.members_dict[payment.pay_member_id]["name"]
            payment.set_split_price(split_price)
            payment.set_attend_member(attend_member)
            payment.set_pay_member(pay_member)

    def _split_price(self, payment: Payment):
        price = payment.price
        attend_members_count = len(payment.attend_member_ids)
        if not payment.attend_member_ids:
            return 0
        split_price = (
            price // attend_members_count + 1
            if price % attend_members_count
            else price / attend_members_count
        )
        return split_price

    def split_members(self):
        for payment in self.payments:
            self.members_dict[payment.pay_member_id]["amount"] -= payment.price
            split_price = self._split_price(payment)
            for member_id in payment.attend_member_ids:
                self.members_dict[member_id]["amount"] += split_price

        for member in self.members:
            member.set_amount(self.members_dict[member.id]["amount"])
