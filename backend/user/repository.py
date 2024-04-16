from base.database_connector import MysqlConnector, MysqlCRUDTemplate
from base.database_model import UserModel
from sqlalchemy.orm import Session
from user.domain import User


class UserRepository(MysqlConnector):
    def create(self, user: User, db_session: Session):
        user_model = UserModel(
            id=None,
            name=user.name,
            platform_id=user.platform_id,
            platform=user.platform,
            account_number=None,
            bank=None,
            kakao_deposit_id=None,
            identifier=user.identifier,
            password=user.password,
        )
        db_session.add(user_model)
        db_session.commit()
        user.id = user_model.id

    # class Create(MysqlCRUDTemplate):
    #     def __init__(self, user: User) -> None:
    #         self.user = user
    #         super().__init__()

    #     def execute(self):
    #         user_model = UserModel(
    #             id=None,
    #             name=self.user.name,
    #             platform_id=self.user.platform_id,
    #             platform=self.user.platform,
    #             account_number=None,
    #             bank=None,
    #             kakao_deposit_id=None,
    #             identifier=self.user.identifier,
    #             password=self.user.password,
    #         )
    #         self.session.add(user_model)
    #         self.session.commit()
    #         self.user.id = user_model.id

    def read_by_identifier(self, identifier, db_session: Session):
        user_model = (
            db_session.query(UserModel)
            .filter(UserModel.identifier == identifier)
            .first()
        )
        if not user_model:
            return None
        user = User(
            id=user_model.id,
            name=user_model.name,
            platform_id=user_model.platform_id,
            platform=user_model.platform,
            identifier=user_model.identifier,
            password=user_model.password,
        )
        return user

    # class ReadByIdentifier(MysqlCRUDTemplate):
    #     def __init__(self, identifier) -> None:
    #         self.identifier = identifier
    #         super().__init__()

    #     def execute(self):
    #         user_model = (
    #             self.session.query(UserModel)
    #             .filter(UserModel.identifier == self.identifier)
    #             .first()
    #         )
    #         if not user_model:
    #             return None
    #         user = User(
    #             id=user_model.id,
    #             name=user_model.name,
    #             platform_id=user_model.platform_id,
    #             platform=user_model.platform,
    #             identifier=user_model.identifier,
    #             password=user_model.password,
    #         )
    #         return user

    def read_by_platform_id(self, platform, platform_id, db_session: Session):
        user_model = (
            db_session.query(UserModel)
            .filter(UserModel.platform == platform)
            .filter(UserModel.platform_id == platform_id)
            .first()
        )
        if not user_model:
            return None
        user = User(
            id=user_model.id,
            name=user_model.name,
            platform_id=user_model.platform_id,
            platform=user_model.platform,
            identifier=user_model.identifier,
            password=user_model.password,
        )
        return user

    # class ReadByPlatformID(MysqlCRUDTemplate):
    #     def __init__(self, platform_id, platform) -> None:
    #         self.platform_id = platform_id
    #         self.platform = platform
    #         super().__init__()

    #     def execute(self):
    #         user_model = (
    #             self.session.query(UserModel)
    #             .filter(UserModel.platform == self.platform)
    #             .filter(UserModel.platform_id == self.platform_id)
    #             .first()
    #         )
    #         if not user_model:
    #             return None
    #         user = User(
    #             id=user_model.id,
    #             name=user_model.name,
    #             platform_id=user_model.platform_id,
    #             platform=user_model.platform,
    #             identifier=user_model.identifier,
    #             password=user_model.password,
    #         )
    #         return user

    def read_by_user_id(self, user_id, db_session: Session):
        user_model = db_session.query(UserModel).filter(UserModel.id == user_id).first()
        if not user_model:
            return None
        user = User(
            id=user_model.id,
            name=user_model.name,
            platform_id=user_model.platform_id,
            platform=user_model.platform,
            identifier=user_model.identifier,
            password=user_model.password,
            bank=user_model.bank,
            account_number=user_model.account_number,
            kakao_deposit_id=user_model.kakao_deposit_id,
        )
        return user

    # class ReadByID(MysqlCRUDTemplate):
    #     def __init__(self, id) -> None:
    #         self.id = id
    #         super().__init__()

    #     def execute(self):
    #         user_model = (
    #             self.session.query(UserModel).filter(UserModel.id == self.id).first()
    #         )
    #         if not user_model:
    #             return None
    #         user = User(
    #             id=user_model.id,
    #             name=user_model.name,
    #             platform_id=user_model.platform_id,
    #             platform=user_model.platform,
    #             identifier=user_model.identifier,
    #             password=user_model.password,
    #             bank=user_model.bank,
    #             account_number=user_model.account_number,
    #             kakao_deposit_id=user_model.kakao_deposit_id,
    #         )
    #         return user

    def update_toss_deposit(self, user: User, db_session: Session):
        user_model = db_session.query(UserModel).filter(UserModel.id == user.id).first()
        user_model.bank = user.toss_deposit_information.bank
        user_model.account_number = user.toss_deposit_information.account_number
        db_session.commit()

    # class UpdateTossDeposit(MysqlCRUDTemplate):
    #     def __init__(self, user: User) -> None:
    #         self.user = user
    #         super().__init__()

    #     def execute(self):
    #         user_model = (
    #             self.session.query(UserModel)
    #             .filter(UserModel.id == self.user.id)
    #             .first()
    #         )
    #         user_model.bank = self.user.toss_deposit_information.bank
    #         user_model.account_number = (
    #             self.user.toss_deposit_information.account_number
    #         )
    #         self.session.commit()

    def update_kakao_deposit(self, user: User, db_session: Session):
        user_model = db_session.query(UserModel).filter(UserModel.id == user.id).first()
        user_model.kakao_deposit_id = user.kakao_deposit_information.kakao_deposit_id
        db_session.commit()

    # class UpdateKakaoDeposit(MysqlCRUDTemplate):
    #     def __init__(self, user: User) -> None:
    #         self.user = user
    #         super().__init__()

    #     def execute(self):
    #         user_model = (
    #             self.session.query(UserModel)
    #             .filter(UserModel.id == self.user.id)
    #             .first()
    #         )
    #         user_model.kakao_deposit_id = (
    #             self.user.kakao_deposit_information.kakao_deposit_id
    #         )
    #         self.session.commit()
