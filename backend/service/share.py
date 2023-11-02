from backend.domain.billing import Billing
from backend.domain.meeting import Meeting
from backend.domain.share import Share
from backend.repository.meeting import MeetingRepository
from backend.repository.member import MemberRepository
from backend.repository.payment import PaymentRepository


class ShareService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.member_repository = MemberRepository()
        self.payment_repository = PaymentRepository()

    def _make_share(self, uuid, toss_send=None):
        meeting: Meeting = self.meeting_repository.ReadByUUID(uuid).run()
        members = self.member_repository.ReadByMeetingID(meeting.id).run()
        payments = self.payment_repository.ReadByMeetingID(meeting.id).run()
        billing = Billing(meeting=meeting, payments=payments, members=members)
        share = Share(billing=billing, toss_send=toss_send)
        return share

    def create_text(self, uuid):
        share = self._make_share(uuid)
        sahre_text = share.create_share_text()
        return sahre_text

    def create_link(self, uuid, toss_send):
        share = self._make_share(uuid, toss_send)
        share_link = share.create_share_page_link(uuid)
        return share_link

    def read_page(self, uuid):
        share = self._make_share(uuid)
        return share.billing
