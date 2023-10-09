from backend.domain.meeting import Meeting
from backend.repository.meeting import MeetingRepository


class MeetingService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()

    def create(self, user_id):
        meeting = Meeting(
            id=None,
            name=None,
            date=None,
            user_id=user_id,
        )
        meeting.set_template()
        self.meeting_repository.create(meeting)
        return meeting

    def update(self, id, name, date):
        meeting = Meeting(
            id=id,
            name=name,
            date=date,
        )
        self.meeting_repository.update(meeting)

    def delete(self, id):
        meeting = Meeting(
            id=id,
            name=None,
            date=None,
        )
        self.meeting_repository.delete(meeting)
