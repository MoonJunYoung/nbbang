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
