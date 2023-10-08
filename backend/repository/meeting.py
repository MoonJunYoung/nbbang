from backend.domain.meeting import Meeting
from backend.repository.connector import MysqlSession
from backend.repository.model import MeetingModel


class MeetingRepository(MysqlSession):
    def create(self, meeting: Meeting) -> None:
        meeting_model = MeetingModel(
            id=None,
            name=meeting.name,
            date=meeting.date,
            user_id=meeting.user_id,
        )
        self.session.add(meeting_model)
        self.session.commit()
        meeting.id = meeting_model.id
