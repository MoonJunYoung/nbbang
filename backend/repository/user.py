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
                platform_id=self.user.platform_id,
                platform=self.user.platform,
            )
            self.session.add(user_model)
            self.session.commit()
            self.user.id = user_model.id

    class ReadByPlatformID(MysqlCRUDTemplate):
        def __init__(self, platform_id, platform) -> None:
            self.platform_id = platform_id
            self.platform = platform
            super().__init__()

        def execute(self):
            user_model = (
                self.session.query(UserModel)
                .filter(UserModel.platform == self.platform)
                .filter(UserModel.platform_id == self.platform_id)
                .first()
            )
            if not user_model:
                return None
            user = User(
                id=user_model.id,
                name=user_model.name,
                platform_id=user_model.platform_id,
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
                platform_id=user_model.platform_id,
                platform=user_model.platform,
            )
            return user
