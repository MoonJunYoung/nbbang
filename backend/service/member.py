from backend.domain.member import Member
from backend.exception import MeetingUserMismatchException
from backend.repository.meeting import MeetingRepository
from backend.repository.member import MemberRepository


class MemberService:
    def __init__(self) -> None:
        self.meeting_repository = MeetingRepository()
        self.member_repository = MemberRepository()

    def create(self, name, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        member = Member(
            id=None,
            name=name,
            meeting_id=meeting_id,
        )
        self.member_repository.create(member)
        return member

    def update(self, id, name, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        member = Member(
            id=id,
            name=name,
            meeting_id=meeting_id,
        )
        self.member_repository.update(member)

    def delete(self, id, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        member = Member(
            id=id,
            name=None,
            meeting_id=meeting_id,
        )
        self.member_repository.delete(member)

    def read(self, meeting_id, user_id):
        meeting = self.meeting_repository.read_by_id(meeting_id)
        meeting.is_user_of_meeting(user_id)
        members = self.member_repository.read_members_by_meeting_id(meeting_id)
        return members
