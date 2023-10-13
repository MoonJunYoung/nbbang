from backend.domain.payment import Payment
from backend.repository.meeting import MeetingRepository
from backend.repository.payment import PaymentRepository


class PaymentService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.payment_repository = PaymentRepository()

    def create(self, place, price, attend_member_ids, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        payment = Payment(
            id=None,
            place=place,
            price=price,
            attend_member_ids=attend_member_ids,
            meeting_id=meeting_id,
        )
        self.payment_repository.create(payment)
        return payment

    def update(self, id, place, price, attend_member_ids, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        payment = Payment(
            id=id,
            place=place,
            price=price,
            attend_member_ids=attend_member_ids,
            meeting_id=meeting_id,
        )
        self.payment_repository.update(payment)

    def delete(self, id, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        payment = Payment(
            id=id,
            place=None,
            price=None,
            attend_member_ids=None,
            meeting_id=meeting_id,
        )
        self.payment_repository.delete(payment)

    def read(self, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        payments: list[Payment] = self.payment_repository.read_payments_by_meeting_id(meeting_id)
        return payments
