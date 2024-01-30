from backend.base.database_connector import MysqlCRUDTemplate
from backend.base.database_model import MeetingModel
from backend.meeting.domain import Meeting


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
                uuid=self.meeting.uuid,
                account_number=self.meeting.toss_deposit_information.account_number,
                bank=self.meeting.toss_deposit_information.bank,
                kakao_deposit_id=self.meeting.kakao_deposit_information.kakao_deposit_id,
            )
            self.session.add(meeting_model)
            self.session.commit()
            self.meeting.id = meeting_model.id

    class UpdateMeeting(MysqlCRUDTemplate):
        def __init__(self, meeting: Meeting) -> None:
            self.meeting = meeting
            super().__init__()

        def execute(self):
            meeting_model = (
                self.session.query(MeetingModel)
                .filter(MeetingModel.id == self.meeting.id)
                .first()
            )
            meeting_model.name = self.meeting.name
            meeting_model.date = self.meeting.date
            self.session.commit()

    class UpdateMeetingTossDeposit(MysqlCRUDTemplate):
        def __init__(self, meeting: Meeting) -> None:
            self.meeting = meeting
            super().__init__()

        def execute(self):
            meeting_model = (
                self.session.query(MeetingModel)
                .filter(MeetingModel.id == self.meeting.id)
                .first()
            )
            meeting_model.bank = self.meeting.toss_deposit_information.bank
            meeting_model.account_number = (
                self.meeting.toss_deposit_information.account_number
            )
            self.session.commit()

    class UpdateMeetingKakaoDeposit(MysqlCRUDTemplate):
        def __init__(self, meeting: Meeting) -> None:
            self.meeting = meeting
            super().__init__()

        def execute(self):
            meeting_model = (
                self.session.query(MeetingModel)
                .filter(MeetingModel.id == self.meeting.id)
                .first()
            )
            meeting_model.kakao_deposit_id = (
                self.meeting.kakao_deposit_information.kakao_deposit_id
            )
            self.session.commit()

    class Delete(MysqlCRUDTemplate):
        def __init__(self, meeting: Meeting) -> None:
            self.meeting = meeting
            super().__init__()

        def execute(self):
            meeting_model = (
                self.session.query(MeetingModel)
                .filter(MeetingModel.id == self.meeting.id)
                .first()
            )
            self.session.delete(meeting_model)
            self.session.commit()

    class ReadByUserID(MysqlCRUDTemplate):
        def __init__(self, user_id) -> None:
            self.user_id = user_id
            super().__init__()

        def execute(self):
            meetings = list()
            meeting_models = (
                self.session.query(MeetingModel)
                .filter(MeetingModel.user_id == self.user_id)
                .order_by(MeetingModel.id.desc())
                .all()
            )
            if not meeting_models:
                return meetings
            for meeting_model in meeting_models:
                meeting = Meeting(
                    id=meeting_model.id,
                    name=meeting_model.name,
                    date=meeting_model.date,
                    user_id=meeting_model.user_id,
                    uuid=meeting_model.uuid,
                )
                meetings.append(meeting)
            return meetings

    class ReadByID(MysqlCRUDTemplate):
        def __init__(self, id) -> None:
            self.id = id
            super().__init__()

        def execute(self):
            meeting_model = (
                self.session.query(MeetingModel)
                .filter(MeetingModel.id == self.id)
                .first()
            )
            if not meeting_model:
                return None
            meeting = Meeting(
                id=meeting_model.id,
                name=meeting_model.name,
                date=meeting_model.date,
                user_id=meeting_model.user_id,
                uuid=meeting_model.uuid,
                bank=meeting_model.bank,
                account_number=meeting_model.account_number,
                kakao_deposit_id=meeting_model.kakao_deposit_id,
            )
            return meeting

    class ReadByUUID(MysqlCRUDTemplate):
        def __init__(self, uuid) -> None:
            self.uuid = uuid
            super().__init__()

        def execute(self):
            meeting_model = (
                self.session.query(MeetingModel)
                .filter(MeetingModel.uuid == self.uuid)
                .first()
            )
            if not meeting_model:
                return None
            meeting = Meeting(
                id=meeting_model.id,
                name=meeting_model.name,
                date=meeting_model.date,
                user_id=meeting_model.user_id,
                uuid=meeting_model.uuid,
                bank=meeting_model.bank,
                account_number=meeting_model.account_number,
                kakao_deposit_id=meeting_model.kakao_deposit_id,
            )
            return meeting
