from backend.domain.member import Member
from backend.repository.connector import MysqlSession
from backend.repository.model import LeaderModel, MemberModel


class MemberRepository(MysqlSession):
    def create(self, member: Member):
        member_model = MemberModel(
            id=None,
            name=member.name,
            meeting_id=member.meeting_id,
        )
        self.session.add(member_model)
        self.session.commit()
        member.id = member_model.id

    def update(self, member: Member):
        member_model = self.session.query(MemberModel).filter(MemberModel.id == member.id).first()
        member_model.name = member.name
        self.session.commit()

    def delete(self, member: Member):
        member_model = self.session.query(MemberModel).filter(MemberModel.id == member.id).first()
        self.session.delete(member_model)
        self.session.commit()

    def read_members_by_meeting_id(self, meeting_id):
        members = list()
        member_models = self.session.query(MemberModel).filter(MemberModel.meeting_id == meeting_id).all()
        for member_model in member_models:
            member = Member(
                id=member_model.id,
                name=member_model.name,
                leader=False,
                meeting_id=member_model.meeting_id,
            )
            members.append(member)
        return members

    def create_leader_member(self, member: Member):
        leader_model = LeaderModel(
            id=None,
            meeting_id=member.meeting_id,
            member_id=member.id,
        )
        self.session.add(leader_model)
        self.session.commit()

    def update_leader_member(self, member: Member):
        leader_model = self.session.query(LeaderModel).filter(LeaderModel.meeting_id == member.meeting_id).first()
        leader_model.member_id = member.id
        self.session.commit()

    def read_leader_member_by_meeting_id(self, meeting_id):
        leader_model = self.session.query(LeaderModel).filter(LeaderModel.meeting_id == meeting_id).first()
        if not leader_model:
            return False
        member_model = self.session.query(MemberModel).filter(MemberModel.id == leader_model.member_id).first()
        member = Member(
            id=member_model.id,
            name=member_model.name,
            leader=True,
            meeting_id=member_model.meeting_id,
        )
        return member
