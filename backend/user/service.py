from backend.base.exceptions import (
    IdentifierAlreadyException,
    IdentifierNotFoundException,
    PasswordNotMatchException,
)
from backend.meeting.repository import MeetingRepository
from backend.user.domain import User
from backend.user.repository import UserRepository


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
            identifier=identifier,
            password=password,
        )
        user: User = self.user_repository.ReadByIdentifier(in_user.identifier).run()
        if not user:
            raise IdentifierNotFoundException(identifier=identifier)
        if not user.check_password_match(in_user.password):
            raise PasswordNotMatchException(identifier=identifier, password=password)
        return user.id

    def oauth_login(self, name, platform_id, platform):
        user = User(
            id=None,
            name=name,
            platform_id=platform_id,
            platform=platform,
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

    def read(self, user_id):
        user: User = self.user_repository.ReadByID(user_id).run()
        del user.password
        return user
