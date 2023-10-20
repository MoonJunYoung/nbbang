from backend.domain.member import Member
from backend.repository.connector import MysqlCRUDTemplate
from backend.repository.model import MemberModel


class MemberRepository:
    class Create(MysqlCRUDTemplate):
        def __init__(self, member: Member) -> None:
            self.member = member
            super().__init__()

        def execute(self):
            member_model = MemberModel(
                id=None,
                name=self.member.name,
                leader=self.member.leader,
                meeting_id=self.member.meeting_id,
            )
            self.session.add(member_model)
            self.session.commit()
            self.member.id = member_model.id

    class Update(MysqlCRUDTemplate):
        def __init__(self, member: Member) -> None:
            self.member = member
            super().__init__()

        def execute(self):
            member_model = self.session.query(MemberModel).filter(MemberModel.id == self.member.id).first()
            member_model.name = self.member.name
            member_model.leader = self.member.leader
            self.session.commit()

    class Delete(MysqlCRUDTemplate):
        def __init__(self, member: Member) -> None:
            self.member = member
            super().__init__()

        def execute(self):
            member_model = self.session.query(MemberModel).filter(MemberModel.id == self.member.id).first()
            self.session.delete(member_model)
            self.session.commit()

    class ReadByMeetingID(MysqlCRUDTemplate):
        def __init__(self, meeting_id) -> None:
            self.meeting_id = meeting_id
            super().__init__()

        def execute(self):
            members = list()
            member_models = self.session.query(MemberModel).filter(MemberModel.meeting_id == self.meeting_id).all()
            if not member_models:
                return None
            for member_model in member_models:
                member = Member(
                    id=member_model.id,
                    name=member_model.name,
                    leader=member_model.leader,
                    meeting_id=member_model.meeting_id,
                )
                members.append(member)
            return members

    class ReadLeaderByMeetingID(MysqlCRUDTemplate):
        def __init__(self, meeting_id) -> None:
            self.meeting_id = meeting_id
            super().__init__()

        def execute(self):
            member_model = (
                self.session.query(MemberModel)
                .filter(MemberModel.meeting_id == self.meeting_id)
                .filter(MemberModel.leader == True)
                .first()
            )
            if not member_model:
                return None
            member = Member(
                id=member_model.id,
                name=member_model.name,
                leader=member_model.leader,
                meeting_id=member_model.meeting_id,
            )
            return member

    class DeleteByMeetingID(MysqlCRUDTemplate):
        def __init__(self, meeting_id) -> None:
            self.meeting_id = meeting_id
            super().__init__()

        def execute(self):
            self.session.query(MemberModel).filter(MemberModel.meeting_id == self.meeting_id).delete()
            self.session.commit()
