from backend.domain.member import Member
from backend.repository.connector import MysqlSession
from backend.repository.model import MemberModel


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
                meeting_id=member_model.meeting_id,
            )
            members.append(member)
        return members
