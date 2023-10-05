from backend.domain.user import User
from backend.repository.connector import MysqlCreate, MysqlSession
from backend.repository.model import UserModel


class UserRepository(MysqlSession):
    def create(self, user: User) -> None:
        user_model = UserModel(
            id=None,
            identifier=user.identifier,
            password=user.password,
            salt=user.salt,
        )
        MysqlCreate(user_model).run()

    def check_duplicate_identifier(self, user: User):
        user_model = self.session.query(UserModel).filter(UserModel.identifier == user.identifier).first()
        if user_model:
            return True
        return False
