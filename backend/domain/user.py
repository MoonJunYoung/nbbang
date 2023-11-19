import bcrypt

from backend.domain.deposit import Deposit


class User:
    def __init__(
        self,
        id,
        name,
        platform_id=None,
        platform=None,
        identifier=None,
        password=None,
    ) -> None:
        self.id = id
        self.name = name
        self.platform_id = platform_id
        self.platform = platform
        self.identifier = identifier
        self.password = password

    def password_encryption(self):
        salt = bcrypt.gensalt()
        encrypted = bcrypt.hashpw(self.password.encode("utf-8"), salt)
        self.password = encrypted.decode("utf-8")

    def check_password_match(self, password):
        return bcrypt.checkpw(password.encode(), self.password.encode())

    def set_deposit(self, deposit: Deposit):
        self.deposit = deposit
