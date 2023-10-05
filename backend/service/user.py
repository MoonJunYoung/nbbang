from backend.domain.user import User
from backend.exception import IdentifierAlreadyException
from backend.repository.user import UserRepository


class UserService:
    def __init__(self) -> None:
        self.user_repository = UserRepository()

    def sign_up(self, identifier, password):
        user = User(
            id=None,
            identifier=identifier,
            password=password,
            salt=None,
        )
        if self.user_repository.check_duplicate_identifier(user=user):
            raise IdentifierAlreadyException(identifier=user.identifier)
        user.password_encryption()
        self.user_repository.create(user=user)
