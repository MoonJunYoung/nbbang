from domain.user import User
from repository.connector import MysqlCreate
from repository.model import UserModel


class UserRepository:
    def create(self, user: User) -> None:
        user_model = UserModel(
            id=None,
            identifier=user.identifier,
            password=user.password,
            salt=user.salt,
        )
        MysqlCreate(user_model).run()
