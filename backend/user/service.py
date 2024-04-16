from user.domain import User
from user.exceptions import IdentifierNotFoundException
from user.repository import UserRepository


class UserService:
    def __init__(self) -> None:
        self.user_repository = UserRepository()

    def sign_up(self, identifier, password, name, db_session):
        user = User(
            id=None,
            name=name,
            identifier=identifier,
            password=password,
        )
        if self.user_repository.read_by_identifier(
            identifier=user.identifier, db_session=db_session
        ):
            user.identifier_is_not_unique()
        user.password_encryption()
        self.user_repository.create(user, db_session=db_session)
        return user.id

    def sign_in(self, identifier, password, db_session):
        user: User = self.user_repository.read_by_identifier(
            identifier, db_session=db_session
        )
        if not user:
            raise IdentifierNotFoundException(identifier=identifier)
        user.check_password_match(password)
        return user.id

    def oauth_login(self, name, platform_id, platform, db_session):
        user = User(
            id=None,
            name=name,
            platform_id=platform_id,
            platform=platform,
            identifier=None,
            password=None,
        )
        existing_user: User = self.user_repository.read_by_platform_id(
            platform_id=user.platform_id,
            platform=user.platform,
            db_session=db_session,
        )
        if existing_user:
            return existing_user.id
        self.user_repository.create(user, db_session=db_session)
        return user.id

    def read(self, user_id, db_session):
        user: User = self.user_repository.read_by_user_id(
            user_id, db_session=db_session
        )
        del user.password
        return user

    def edit_kakao_deposit(self, user_id, kakao_deposit_id, db_session):
        user: User = self.user_repository.read_by_user_id(
            user_id, db_session=db_session
        )
        user.update_kakao_deposit_information(kakao_deposit_id)
        self.user_repository.update_kakao_deposit(user, db_session=db_session)

    def edit_toss_deposit(self, user_id, bank, account_number, db_session):
        user: User = self.user_repository.read_by_user_id(
            user_id, db_session=db_session
        )
        user.update_toss_deposit_information(bank, account_number)
        self.user_repository.update_toss_deposit(user, db_session=db_session)
