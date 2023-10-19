from backend.domain.billing import Billing
from backend.domain.meeting import Meeting
from backend.repository.meeting import MeetingRepository
from backend.repository.member import MemberRepository
from backend.repository.payment import PaymentRepository


class BillingService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.member_repository = MemberRepository()
        self.payment_repository = PaymentRepository()

    def read(self, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        members = self.member_repository.ReadByMeetingID(meeting.id).run()
        payments = self.payment_repository.ReadByMeetingID(meeting.id).run()
        billing = Billing(payments=payments, members=members)
        billing.set_member_result()
        billing.set_paymnet_result()
        return billing.result
