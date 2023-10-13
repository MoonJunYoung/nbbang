from backend.domain.member import Member
from backend.exception import LeaderAlreadyExcetion, MeetingUserMismatchException
from backend.repository.meeting import MeetingRepository
from backend.repository.member import MemberRepository


class MemberDTO:
    def execute(member: Member):
        result = dict()
        result["member_id"] = member.id


class MemberService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.member_repository = MemberRepository()

    def create(self, name, leader, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        member = Member(
            id=None,
            name=name,
            leader=leader,
            meeting_id=meeting_id,
        )
        if member.leader:
            if self.member_repository.read_leader_member_by_meeting_id(member.meeting_id):
                raise LeaderAlreadyExcetion
            self.member_repository.create_leader_member(member)
        self.member_repository.create(member)
        return member

    def update(self, id, name, leader, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        member = Member(
            id=id,
            name=name,
            leader=leader,
            meeting_id=meeting_id,
        )
        if member.leader:
            self.member_repository.update_leader_member(member)
        self.member_repository.update(member)

    def delete(self, id, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        member = Member(
            id=id,
            name=None,
            leader=None,
            meeting_id=meeting_id,
        )
        self.member_repository.delete(member)

    def read(self, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        members: list[Member] = self.member_repository.read_members_by_meeting_id(meeting_id)
        leader_member = self.member_repository.read_leader_member_by_meeting_id(meeting_id)
        if not leader_member:
            return members
        for member in members:
            member.set_leader(leader_member)
        return members
