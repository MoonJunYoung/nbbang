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

    def create(self, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        members = self.member_repository.ReadByMeetingID(meeting.id).run()
        payments = self.payment_repository.ReadByMeetingID(meeting.id).run()
        if not members or not payments:
            result = Billing(meeting=None, payments=None, members=None).result
            del result["total_amount"]
            return result
        billing = Billing(meeting=meeting, payments=payments, members=members)
        billing.create()
        result = billing.result
        del result["total_amount"]
        return result

    def share(self, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        members = self.member_repository.ReadByMeetingID(meeting.id).run()
        payments = self.payment_repository.ReadByMeetingID(meeting.id).run()
        if not members or not payments:
            return None
        billing = Billing(meeting=meeting, payments=payments, members=members)
        billing.create()
        print("====", billing.create_share_text(), "====")
        return billing.create_share_text()
