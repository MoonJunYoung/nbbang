from backend.base.exceptions import IncompleteShareExcption, SharePageNotMeetingExcption
from backend.calculate.domain import Calculate
from backend.meeting.domain import Meeting
from backend.meeting.repository import MeetingRepository
from backend.member.domain import Member
from backend.member.repository import MemberRepository
from backend.payment.domain import Payment
from backend.payment.repository import PaymentRepository
from backend.user.domain import User
from backend.user.repository import UserRepository


class MeetingService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.member_repository = MemberRepository()
        self.payment_repository = PaymentRepository()
        self.user_repository = UserRepository()

    def add(self, user_id):
        user: User = self.user_repository.ReadByID(user_id).run()
        meeting = Meeting.create_template(user_id)
        meeting.load_user_deposit_information(user)
        self.meeting_repository.Create(meeting).run()
        return meeting

    def edit_meeting(self, id, user_id, name, date):
        meeting: Meeting = self.meeting_repository.ReadByID(id).run()
        meeting.is_user_of_meeting(user_id)
        meeting.update_information(name, date)
        self.meeting_repository.UpdateMeeting(meeting).run()

    def edit_kakao_deposit(self, id, user_id, kakao_deposit_id):
        meeting: Meeting = self.meeting_repository.ReadByID(id).run()
        meeting.is_user_of_meeting(user_id)
        meeting.update_kakao_deposit_information(kakao_deposit_id)
        self.meeting_repository.UpdateMeetingKakaoDeposit(meeting).run()

    def edit_toss_deposit(self, id, user_id, bank, account_number):
        meeting: Meeting = self.meeting_repository.ReadByID(id).run()
        meeting.is_user_of_meeting(user_id)
        meeting.update_toss_deposit_information(bank, account_number)
        self.meeting_repository.UpdateMeetingTossDeposit(meeting).run()

    def remove(self, id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(id).run()
        meeting.is_user_of_meeting(user_id)
        self.meeting_repository.Delete(meeting).run()
        self.member_repository.DeleteByMeetingID(meeting.id).run()
        self.payment_repository.DeleteByMeetingID(meeting.id).run()

    def read(self, id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(id).run()
        meeting.is_user_of_meeting(user_id)
        meeting.create_share_link()
        return meeting

    def read_meetings(self, user_id):
        meetings = self.meeting_repository.ReadByUserID(user_id).run()
        return meetings

    def read_share_page(self, uuid):
        meeting: Meeting = self.meeting_repository.ReadByUUID(uuid).run()
        if not meeting:
            raise SharePageNotMeetingExcption
        members: list[Member] = self.member_repository.ReadByMeetingID(meeting.id).run()
        payments: list[Payment] = self.payment_repository.ReadByMeetingID(
            meeting.id
        ).run()
        if not members or not payments:
            raise IncompleteShareExcption
        calculate = Calculate(members=members, payments=payments)
        calculate.split_payments()
        calculate.split_members()

        for member in members:
            member.create_deposit_link(meeting)
        return meeting
