import datetime
import re
import uuid

from backend.base.exceptions import MeetingUserMismatchException
from backend.deposit.domain import Deposit


class Meeting:
    def __init__(self, id, name, date, user_id, uuid) -> None:
        self.id = id
        self.name = name
        self.date = str(Date(date))
        self.user_id = user_id
        self.uuid = uuid

    def set_template(self):
        self.name = "모임명을 설정해주세요"
        self.date = datetime.date.isoformat(datetime.date.today())

    def is_user_of_meeting(self, user_id):
        if not self.user_id == user_id:
            raise MeetingUserMismatchException(user_id, self.id)

    def set_uuid(self):
        self.uuid = uuid.uuid4()

    def set_deposit(self, deposit: Deposit):
        self.deposit = deposit

    def create_share_link(self):
        self.share_link = f"https://nbbang.shop/share?meeting={self.uuid}"


class Date:
    def __init__(self, date) -> None:
        self.date = date
        if re.match(r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$", self.date):
            dt = datetime.datetime.strptime(self.date, "%Y-%m-%dT%H:%M:%S.%fZ")
            self.date = dt.strftime("%Y-%m-%d")

    def __str__(self):
        return self.date
