from backend.domain.user import User
from backend.repository.connector import MysqlCRUDTemplate
from backend.repository.model import UserModel


class UserRepository:
    class Create(MysqlCRUDTemplate):
        def __init__(self, user: User) -> None:
            self.user = user
            super().__init__()

        def execute(self):
            user_model = UserModel(
                id=None,
                name=self.user.name,
                email=self.user.email,
                platform=self.user.platform,
            )
            self.session.add(user_model)
            self.session.commit()
            self.user.id = user_model.id

    class ReadByEamilAndPlatform(MysqlCRUDTemplate):
        def __init__(self, email, platform) -> None:
            self.email = email
            self.platform = platform
            super().__init__()

        def execute(self):
            user_model = (
                self.session.query(UserModel)
                .filter(UserModel.platform == self.platform)
                .filter(UserModel.email == self.email)
                .first()
            )
            if not user_model:
                return None
            user = User(
                id=user_model.id,
                name=user_model.name,
                email=user_model.email,
                platform=user_model.platform,
            )
            return user

    class ReadByID(MysqlCRUDTemplate):
        def __init__(self, id) -> None:
            self.id = id
            super().__init__()

        def execute(self):
            user_model = self.session.query(UserModel).filter(UserModel.id == self.id).first()
            if not user_model:
                return None
            user = User(
                id=user_model.id,
                name=user_model.name,
                email=user_model.email,
                platform=user_model.platform,
            )
            return user
