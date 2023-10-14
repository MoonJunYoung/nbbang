from backend.domain.meeting import Meeting
from backend.domain.user import User
from backend.repository.connector import MysqlCRUDTemplate, MysqlSession
from backend.repository.model import MeetingModel


class MeetingRepository:
    class Create(MysqlCRUDTemplate):
        def __init__(self, meeting: Meeting) -> None:
            self.meeting = meeting
            super().__init__()

        def execute(self):
            meeting_model = MeetingModel(
                id=None,
                name=self.meeting.name,
                date=self.meeting.date,
                user_id=self.meeting.user_id,
            )
            self.session.add(meeting_model)
            self.session.commit()
            self.meeting.id = meeting_model.id

    class Update(MysqlCRUDTemplate):
        def __init__(self, meeting: Meeting) -> None:
            self.meeting = meeting
            super().__init__()

        def execute(self):
            meeting_model = self.session.query(MeetingModel).filter(MeetingModel.id == self.meeting.id).first()
            meeting_model.name = self.meeting.name
            meeting_model.date = self.meeting.date
            self.session.commit()

    class Delete(MysqlCRUDTemplate):
        def __init__(self, meeting: Meeting) -> None:
            self.meeting = meeting
            super().__init__()

        def execute(self):
            meeting_model = self.session.query(MeetingModel).filter(MeetingModel.id == self.meeting.id).first()
            self.session.delete(meeting_model)
            self.session.commit()

    class ReadByUserID(MysqlCRUDTemplate):
        def __init__(self, user_id) -> None:
            self.user_id = user_id
            super().__init__()

        def execute(self):
            meetings = list()
            meeting_models = self.session.query(MeetingModel).filter(MeetingModel.user_id == self.user_id).all()
            for meeting_model in meeting_models:
                meeting = Meeting(
                    id=meeting_model.id,
                    name=meeting_model.name,
                    date=meeting_model.date,
                    user_id=meeting_model.user_id,
                )
                meetings.append(meeting)
            return meetings

    class ReadByID(MysqlCRUDTemplate):
        def __init__(self, id) -> None:
            self.id = id
            super().__init__()

        def execute(self):
            meeting_model = self.session.query(MeetingModel).filter(MeetingModel.id == self.id).first()
            meeting = Meeting(
                id=meeting_model.id,
                name=meeting_model.name,
                date=meeting_model.date,
                user_id=meeting_model.user_id,
            )
            return meeting
