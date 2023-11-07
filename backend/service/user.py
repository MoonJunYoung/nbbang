from backend.domain.user import User
from backend.repository.meeting import MeetingRepository
from backend.repository.user import UserRepository


class UserService:
    def __init__(self) -> None:
        self.user_repository = UserRepository()
        self.meeting_repository = MeetingRepository()

    def oauth_login(self, name, platform_id, platform):
        user = User(
            id=None,
            name=name,
            platform_id=platform_id,
            platform=platform,
            account_number=None,
            bank=None,
            kakao_id=None,
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
        return user

    def update(self, user_id, account_number, bank, kakao_id):
        user: User = self.user_repository.ReadByID(user_id).run()
        if bank and account_number:
            user.update_account_number(bank, account_number)
            self.user_repository.UpdateAccountNumber(user).run()
        elif kakao_id:
            user.update_kakao_id(kakao_id)
            self.user_repository.UpdateKakaoID(user).run()
