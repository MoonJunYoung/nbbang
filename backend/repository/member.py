from backend.domain.member import Member
from backend.repository.connector import MysqlCRUDTemplate, MysqlSession
from backend.repository.model import LeaderModel, MemberModel


class MemberRepository:
    class Create(MysqlCRUDTemplate):
        def __init__(self, member: Member) -> None:
            self.member = member
            super().__init__()

        def execute(self):
            member_model = MemberModel(
                id=None,
                name=self.member.name,
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
            for member_model in member_models:
                member = Member(
                    id=member_model.id,
                    name=member_model.name,
                )
                members.append(member)
            return members

    class CreateLeader(MysqlCRUDTemplate):
        def __init__(self, member: Member) -> None:
            self.member = member
            super().__init__()

        def execute(self):
            leader_model = LeaderModel(
                id=None,
                meeting_id=self.member.meeting_id,
                member_id=self.member.id,
            )
            self.session.add(leader_model)
            self.session.commit()

    class UpdateLeader(MysqlCRUDTemplate):
        def __init__(self, member: Member) -> None:
            self.member = member
            super().__init__()

        def execute(self):
            leader_model = (
                self.session.query(LeaderModel).filter(LeaderModel.meeting_id == self.member.meeting_id).first()
            )
            leader_model.member_id = self.member.id
            self.session.commit()

    class ReadLeaderByMeetingID(MysqlCRUDTemplate):
        def __init__(self, meeting_id) -> None:
            self.meeting_id = meeting_id
            super().__init__()

        def execute(self):
            leader_model = self.session.query(LeaderModel).filter(LeaderModel.meeting_id == self.meeting_id).first()
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
