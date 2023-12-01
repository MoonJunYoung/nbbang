from backend.base.dto import ShareDTO, set_DTO
from backend.calculate.domain import Calculate
from backend.meeting.domain import Meeting
from backend.meeting.repository import MeetingRepository
from backend.member.domain import Member
from backend.member.repository import MemberRepository
from backend.payment.domain import Payment
from backend.payment.repository import PaymentRepository
from backend.share.domain import Share
from backend.user.repository import UserRepository


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
        calculate.split_payments()
        calculate.split_members()
        share = Share(meeting=meeting, calcaulte=calculate)
        share.set_send_link()
        return set_DTO(ShareDTO, share)
