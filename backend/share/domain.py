from urllib import parse

from backend.calculate.domain import Calculate
from backend.meeting.domain import Meeting
from backend.member.domain import Member


class Share:
    def __init__(self, meeting: Meeting, calcaulte: Calculate) -> None:
        self.meeting = meeting
        self.calcaulte = calcaulte

    def set_send_link(self):
        for member in self.calcaulte.members:
            member.create_deposit_link(self.meeting)

    def create_share_page_link(self):
        return f"https://nbbang.shop/share?meeting={self.meeting.uuid}"
