from backend.domain.user import User
from backend.exceptions import (
    IdentifierAlreadyException,
    IdentifierNotFoundException,
    PasswordNotMatchException,
)
from backend.repository.meeting import MeetingRepository
from backend.repository.user import UserRepository


class UserService:
    def __init__(self) -> None:
        self.user_repository = UserRepository()
        self.meeting_repository = MeetingRepository()

    def sign_up(self, identifier, password, name):
        user = User(
            id=None,
            name=name,
            platform_id=None,
            platform=None,
            account_number=None,
            bank=None,
            kakao_id=None,
            identifier=identifier,
            password=password,
        )
        if self.user_repository.ReadByIdentifier(identifier=user.identifier).run():
            raise IdentifierAlreadyException(identifier=identifier)
        user.password_encryption()
        self.user_repository.Create(user).run()
        return user.id

    def sign_in(self, identifier, password):
        in_user = User(
            id=None,
            name=None,
            platform_id=None,
            platform=None,
            account_number=None,
            bank=None,
            kakao_id=None,
            identifier=identifier,
            password=password,
        )
        user: User = self.user_repository.ReadByIdentifier(in_user.identifier).run()
        if not user:
            raise IdentifierNotFoundException(identifier=identifier)
        if not user.check_password_match(in_user.password):
            raise PasswordNotMatchException(identifier=identifier, password=password)
        return user.id

    def read(self, user_id):
        user: User = self.user_repository.ReadByID(user_id).run()
        del user.password
        return user

    def oauth_login(self, name, platform_id, platform):
        user = User(
            id=None,
            name=name,
            platform_id=platform_id,
            platform=platform,
            account_number=None,
            bank=None,
            kakao_id=None,
            identifier=None,
            password=None,
        )
        existing_user: User = self.user_repository.ReadByPlatformID(
            platform_id=user.platform_id,
            platform=user.platform,
        ).run()
        if existing_user:
            return existing_user.id
        self.user_repository.Create(user).run()
        return user.id

    def update(self, user_id, account_number, bank, kakao_id):
        user: User = self.user_repository.ReadByID(user_id).run()
        if bank and account_number:
            user.update_account_number(bank, account_number)
            self.user_repository.UpdateAccountNumber(user).run()
        elif kakao_id:
            user.update_kakao_id(kakao_id)
            self.user_repository.UpdateKakaoID(user).run()
