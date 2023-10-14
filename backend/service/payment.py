from backend.domain.meeting import Meeting
from backend.domain.payment import Payment
from backend.repository.meeting import MeetingRepository
from backend.repository.payment import PaymentRepository


class PaymentService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.payment_repository = PaymentRepository()

    def create(self, place, price, attend_member_ids, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        payment = Payment(
            id=None,
            place=place,
            price=price,
            attend_member_ids=attend_member_ids,
            meeting_id=meeting_id,
        )
        self.payment_repository.Create(payment).run()
        return payment

    def update(self, id, place, price, attend_member_ids, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        payment = Payment(
            id=id,
            place=place,
            price=price,
            attend_member_ids=attend_member_ids,
            meeting_id=meeting_id,
        )
        self.payment_repository.Update(payment).run()

    def delete(self, id, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        payment = Payment(
            id=id,
            place=None,
            price=None,
            attend_member_ids=None,
            meeting_id=meeting_id,
        )
        self.payment_repository.Delete(payment).run()

    def read(self, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        payments: list[Payment] = self.payment_repository.ReadByMeetingID(meeting_id).run()
        return payments
