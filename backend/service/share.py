from backend.domain.calculate import Calculate
from backend.domain.meeting import Meeting
from backend.domain.member import Member
from backend.domain.payment import Payment
from backend.domain.share import Share
from backend.domain.user import User
from backend.exceptions import IncompleteShareExcption, SharePageNotMeetingExcption
from backend.repository.meeting import MeetingRepository
from backend.repository.member import MemberRepository
from backend.repository.payment import PaymentRepository
from backend.repository.user import UserRepository


class ShareService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.member_repository = MemberRepository()
        self.payment_repository = PaymentRepository()
        self.user_repository = UserRepository()

    def create_link(self, user_id, meeting_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        share_link = Share(meeting=meeting, calcaulte=None).create_share_page_link()
        return share_link

    def read_page(self, uuid):
        meeting: Meeting = self.meeting_repository.ReadByUUID(uuid).run()
        members: list[Member] = self.member_repository.ReadByMeetingID(meeting.id).run()
        payments: list[Payment] = self.payment_repository.ReadByMeetingID(
            meeting.id
        ).run()
        calculate = Calculate(members=members, payments=payments)
        calculate.split_members()
        share = Share(meeting=meeting, calcaulte=calculate)
        return share
