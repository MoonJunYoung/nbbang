from backend.domain.calculate import Calculate
from backend.domain.meeting import Meeting
from backend.domain.member import Member
from backend.domain.payment import Payment
from backend.exceptions import LeaderAlreadyException, MemberIsLeaderDeleteExcption
from backend.repository.meeting import MeetingRepository
from backend.repository.member import MemberRepository
from backend.repository.payment import PaymentRepository


class MemberDTO:
    def __init__(self, member: Member) -> None:
        self.id = member.id
        self.name = member.name
        self.leader = member.leader
        self.amount = member.amount


class MemberService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.member_repository = MemberRepository()
        self.payment_repository = PaymentRepository()

    def create(self, name, leader, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        member = Member(
            id=None,
            name=name,
            leader=leader,
            meeting_id=meeting_id,
        )
        if member.leader:
            if self.member_repository.ReadLeaderByMeetingID(member.meeting_id).run():
                raise LeaderAlreadyException
        self.member_repository.Create(member).run()
        return member

    def update(self, id, name, leader, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        member = Member(
            id=id,
            name=name,
            leader=leader,
            meeting_id=meeting_id,
        )
        if member.leader:
            pre_leader_member: Member = self.member_repository.ReadLeaderByMeetingID(
                member.meeting_id
            ).run()
            pre_leader_member.leader = False
            self.member_repository.Update(pre_leader_member).run()
        self.member_repository.Update(member).run()

    def delete(self, id, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        member: Member = self.member_repository.ReadByID(id).run()
        member.delete_member_if_not_leader()
        payments: list[Payment] = self.payment_repository.ReadByMeetingID(
            meeting_id
        ).run()
        for payment in payments:
            payment.check_in_member(member)
        self.member_repository.Delete(member).run()

    def read(self, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        members: list[Member] = self.member_repository.ReadByMeetingID(meeting_id).run()
        payments: list[Payment] = self.payment_repository.ReadByMeetingID(
            meeting_id
        ).run()
        if not payments:
            return members

        calculate = Calculate(members=members, payments=payments)
        calculate.split_members()
        members = calculate.members

        result = list()
        for member in members:
            result.append(MemberDTO(member))
        return result
