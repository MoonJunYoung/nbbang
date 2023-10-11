from backend.domain.user import User
from backend.exception import IdentifierAlreadyException, IdentifierNotFoundException, PasswordNotMatchException
from backend.repository.meeting import MeetingRepository
from backend.repository.user import UserRepository


class UserService:
    def __init__(self) -> None:
        self.user_repository = UserRepository()
        self.meeting_repository = MeetingRepository()

    def sign_up(self, identifier, password):
        user = User(
            id=None,
            identifier=identifier,
            password=password,
        )
        if self.user_repository.read_by_identifier(identifier=user.identifier):
            raise IdentifierAlreadyException(identifier=identifier)
        user.password_encryption()
        self.user_repository.create(user=user)
        return user.id

    def sign_in(self, identifier, password):
        in_user = User(
            id=None,
            identifier=identifier,
            password=password,
        )
        user = self.user_repository.read_by_identifier(in_user.identifier)
        if not user:
            raise IdentifierNotFoundException(identifier=identifier)
        if not user.check_password(in_user.password):
            raise PasswordNotMatchException(identifier=identifier, password=password)
        return user.id

    def read(self, user_id):
        user = self.user_repository.read_by_id(user_id)
        del user.password
        return user
