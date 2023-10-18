import datetime

from backend.exceptions import MeetingUserMismatchException


class Meeting:
    def __init__(self, id, name, date, user_id) -> None:
        self.id = id
        self.name = name
        self.date = date
        self.user_id = user_id

    def set_template(self):
        self.name = "모임명을 설정해주세요"
        self.date = datetime.date.isoformat(datetime.date.today())

    def is_user_of_meeting(self, user_id):
        if not self.user_id == user_id:
            raise MeetingUserMismatchException(user_id, self.id)
