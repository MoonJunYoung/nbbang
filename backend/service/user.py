from backend.domain.user import User
from backend.repository.meeting import MeetingRepository
from backend.repository.user import UserRepository


class UserService:
    def __init__(self) -> None:
        self.user_repository = UserRepository()
        self.meeting_repository = MeetingRepository()

    def google_login(self, name, email):
        user = User(
            id=None,
            name=name,
            email=email,
        )
        existing_user: User = self.user_repository.ReadByEamil(email=user.email).run()
        if existing_user:
            return existing_user.id
        self.user_repository.Create(user).run()
        return user.id

    def read(self, user_id):
        user: User = self.user_repository.ReadByID(user_id).run()
        return user
