from backend.domain.user import User
from backend.exception import IdentifierAlreadyException, IdentifierNotFoundException, PasswordNotMatchException
from backend.repository.user import UserRepository


class UserService:
    def __init__(self) -> None:
        self.user_repository = UserRepository()

    def sign_up(self, identifier, password):
        user = User(
            id=None,
            identifier=identifier,
            password=password,
            token=None,
        )
        if self.user_repository.read_by_identifier(identifier=user.identifier):
            raise IdentifierAlreadyException(identifier=identifier)
        user.password_encryption()
        self.user_repository.create(user=user)

    def sign_in(self, identifier, password):
        db_user = self.user_repository.read_by_identifier(identifier)
        user = User(
            id=None,
            identifier=identifier,
            password=password,
            token=None,
        )
        if not db_user:
            raise IdentifierNotFoundException(identifier=identifier)
        if not db_user.check_password(user.password):
            raise PasswordNotMatchException(identifier=identifier, password=password)
        db_user.create_token()
        return db_user.token
