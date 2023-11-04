from backend.domain.meeting import Meeting
from backend.repository.meeting import MeetingRepository
from backend.repository.member import MemberRepository
from backend.repository.payment import PaymentRepository


class MeetingService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.member_repository = MemberRepository()
        self.payment_repository = PaymentRepository()

    def create(self, user_id):
        meeting = Meeting(
            id=None,
            name=None,
            date=None,
            user_id=user_id,
            uuid=None,
            account_number=None,
            bank=None,
        )
        meeting.set_template()
        meeting.set_uuid()
        self.meeting_repository.Create(meeting).run()
        return meeting

    def update(self, id, name, date, user_id, account_number, bank):
        meeting: Meeting = self.meeting_repository.ReadByID(id)
        meeting.is_user_of_meeting(user_id)
        meeting = Meeting(
            id=id,
            name=name,
            date=date,
            user_id=None,
            uuid=None,
            account_number=account_number,
            bank=bank,
        )
        if meeting.name and meeting.date:
            self.meeting_repository.UpdateInFo(meeting).run()
        elif meeting.account_number and meeting.bank:
            self.meeting_repository.UpdateAccountNumber(meeting).run()

    def delete(self, id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(id).run()
        meeting.is_user_of_meeting(user_id)
        self.meeting_repository.Delete(meeting).run()
        self.member_repository.DeleteByMeetingID(meeting.id).run()
        self.payment_repository.DeleteByMeetingID(meeting.id).run()

    def read_by_user_id(self, user_id):
        meetings = self.meeting_repository.ReadByUserID(user_id).run()
        return meetings

    def read(self, id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(id).run()
        meeting.is_user_of_meeting(user_id)
        return meeting
