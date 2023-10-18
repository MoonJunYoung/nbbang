from backend.domain.meeting import Meeting
from backend.domain.member import Member
from backend.exceptions import LeaderAlreadyException

from backend.repository.meeting import MeetingRepository
from backend.repository.member import MemberRepository


class MemberService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.member_repository = MemberRepository()

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
            pre_leader_member: Member = self.member_repository.ReadLeaderByMeetingID(member.meeting_id).run()
            pre_leader_member.leader = False
            self.member_repository.Update(pre_leader_member).run()
        self.member_repository.Update(member).run()

    def delete(self, id, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        member = Member(
            id=id,
            name=None,
            leader=None,
            meeting_id=meeting_id,
        )
        self.member_repository.Delete(member).run()

    def read(self, meeting_id, user_id):
        meeting: Meeting = self.meeting_repository.ReadByID(meeting_id).run()
        meeting.is_user_of_meeting(user_id)
        members: list[Member] = self.member_repository.ReadByMeetingID(meeting_id).run()
        return members
