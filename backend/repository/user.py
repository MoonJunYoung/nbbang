from backend.domain.user import User
from backend.repository.connector import MysqlSession
from backend.repository.model import UserModel


class UserRepository(MysqlSession):
    def create(self, user: User) -> None:
        user_model = UserModel(
            id=None,
            identifier=user.identifier,
            password=user.password,
        )
        self.session.add(user_model)
        self.session.commit()
        user.id = user_model.id

    def read_by_identifier(self, identifier):
        user_model = self.session.query(UserModel).filter(UserModel.identifier == identifier).first()
        if user_model:
            return User(
                id=user_model.id,
                identifier=user_model.identifier,
                password=user_model.password,
                token=None,
            )
        return False

    def read_by_id(self, id):
        user_model = self.session.query(UserModel).filter(UserModel.id == id).first()
        if user_model:
            return User(
                id=user_model.id,
                identifier=user_model.identifier,
                password=user_model.password,
                token=None,
            )
        return False
