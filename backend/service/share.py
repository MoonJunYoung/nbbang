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

    def _make_share(self, uuid):
        meeting: Meeting = self.meeting_repository.ReadByUUID(uuid).run()
        members = self.member_repository.ReadByMeetingID(meeting.id).run()
        payments = self.payment_repository.ReadByMeetingID(meeting.id).run()
        billing = Billing(meeting=meeting, payments=payments, members=members)
        share = Share(billing)
        return share

    def read_text(self, uuid):
        share = self._make_share(uuid)
        sahre_text = share.create_share_text()
        return sahre_text

    def read_page(self, uuid):
        share = self._make_share(uuid)
        return share
