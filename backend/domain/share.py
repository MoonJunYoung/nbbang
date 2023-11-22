from urllib import parse

from backend.domain.calculate import Calculate
from backend.domain.meeting import Meeting
from backend.domain.member import Member


class Share:
    def __init__(self, meeting: Meeting, calcaulte: Calculate) -> None:
        self.meeting = meeting
        self.calcaulte = calcaulte

    def set_send_link(self):
        bank = self.meeting.deposit.bank
        account_number = self.meeting.deposit.account_number
        kakao_deposit_id = self.meeting.deposit.kakao_deposit_id
        for member in self.calcaulte.members:
            if bank and account_number:
                toss_deposit_link = self._create_toss_deposit_link(member)
                member.set_toss_deposit_link(toss_deposit_link)

            if kakao_deposit_id:
                kakao_deposit_link = self._create_kakao_deposit_link(member)
                member.set_kakao_deposit_link(kakao_deposit_link)

    def _create_toss_deposit_link(self, member: Member):
        base_url = "supertoss://send"
        params = {
            "amount": int(member.amount),
            "bank": self.meeting.deposit.bank,
            "accountNo": self.meeting.deposit.account_number,
        }
        encoded_params = parse.urlencode(params)
        encoded_url = f"{base_url}?{encoded_params}"
        return encoded_url

    def _create_kakao_deposit_link(self, member: Member):
        def _to_hex_value(value):
            return format(value * 524288, "x")

        base_url = "https://qr.kakaopay.com/{kakao_deposit_id}{hex_amount}"
        hex_amount = _to_hex_value(int(member.amount))
        send_link = base_url.format(
            kakao_deposit_id=self.meeting.deposit.kakao_deposit_id,
            hex_amount=hex_amount,
        )
        return send_link

    def create_share_page_link(self):
        return f"https://nbbang.shop/share?meeting={self.meeting.uuid}"
