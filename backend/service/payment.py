from backend.domain.calculate import Calculate
from backend.domain.meeting import Meeting
from backend.domain.member import Member
from backend.domain.payment import Payment
from backend.repository.meeting import MeetingRepository
from backend.repository.member import MemberRepository
from backend.repository.payment import PaymentRepository
from backend.service.dto import PaymentDTO, set_DTO


class PaymentService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.payment_repository = PaymentRepository()
        self.memeber_repository = MemberRepository()

    def create(
        self, place, price, pay_member_id, attend_member_ids, meeting_id, user_id
    ):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        payment = Payment(
            id=None,
            place=place,
            price=price,
            pay_member_id=pay_member_id,
            attend_member_ids=attend_member_ids,
            meeting_id=meeting_id,
        )
        self.payment_repository.Create(payment).run()
        return payment

    def update(
        self, id, place, price, pay_member_id, attend_member_ids, meeting_id, user_id
    ):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        payment = Payment(
            id=id,
            place=place,
            price=price,
            pay_member_id=pay_member_id,
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
            pay_member_id=None,
            attend_member_ids=None,
            meeting_id=meeting_id,
        )
        self.payment_repository.Delete(payment).run()

    def read(self, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        payments: list[Payment] = self.payment_repository.ReadByMeetingID(
            meeting.id
        ).run()
        members: list[Member] = self.memeber_repository.ReadByMeetingID(
            meeting.id
        ).run()
        calculate = Calculate(members=members, payments=payments)
        calculate.split_payments()
        payments = calculate.payments

        return set_DTO(PaymentDTO, payments)
