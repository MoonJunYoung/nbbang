import datetime
from urllib import parse

from backend.domain.billing import Billing


class Share:
    def __init__(self, billing: Billing) -> None:
        self.billing = billing

    def set_toss_send_link(self):
        bank = self.billing.meeting["bank"]
        account_number = self.billing.meeting["account_number"]
        for member in self.billing.members.values():
            if bank and account_number:
                amount = member["amount"]
                if amount > 0:
                    toss_send_link = self._create_toss_send_link(
                        bank=bank,
                        account_number=account_number,
                        amount=amount,
                    )
                    member["toss_send_link"] = toss_send_link
            else:
                member["toss_send_link"] = ""

    def _create_toss_send_link(self, bank, account_number, amount):
        base_url = "supertoss://send"
        params = {
            "amount": int(amount),
            "bank": bank,
            "accountNo": account_number,
        }
        encoded_params = parse.urlencode(params)
        encoded_url = f"{base_url}?{encoded_params}"
        return encoded_url

    def create_share_page_link(self, uuid):
        return f"https://nbbang.shpp/share?meeting={uuid}"

    def create_share_text(self):
        billing_template = """{meeting}의 정산결과입니다.\n\n결제내역\n============\n{payments}\n정산결과\n============\n이번 모임의 총 사용 금액은 {total_amount}원 입니다.\n{leader}\n\n{members}\n\n{account_number}created by nbbang.shop"""
        meeting_text = self._set_meeting_text()
        payments_text = self._set_payments_text()
        leader_text, members_text = self._set_members_text()
        account_number_text = self._set_account_number_text()
        total_amount = self.billing.meeting["total_amount"]
        billing_text = billing_template.format(
            meeting=meeting_text,
            payments=payments_text,
            total_amount=format(int(total_amount), ","),
            leader=leader_text,
            members=members_text,
            account_number=account_number_text,
        )
        return billing_text

    def _set_meeting_text(self):
        meeting_template = """{date} {name}"""
        date = datetime.datetime.fromisoformat(self.billing.meeting["date"]).strftime("%Y/%m/%d")
        meeting_text = meeting_template.format(
            date=date,
            name=self.billing.meeting["name"],
        )
        return meeting_text

    def _set_account_number_text(self):
        account_number_text_template = """입금계좌\n============\n{bank} {account_number}\n\n\n"""
        bank = self.billing.meeting["bank"]
        account_number = self.billing.meeting["account_number"]
        if bank or account_number:
            account_number_text = account_number_text_template.format(
                bank=bank,
                account_number=account_number,
            )
        else:
            account_number_text = ""
        return account_number_text

    def _set_payments_text(self):
        payment_template = """{id}. {place} (결제금액 : {price} 원)\n참석 멤버 : {attend_members}\n결제 멤버 : {pay_member}\n\n"""
        payments_text = ""
        for i, payment in enumerate(self.billing.payments.values()):
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
        for member in self.billing.members.values():
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
        for member in self.billing.members.values():
            if member["leader"]:
                return member["name"]
