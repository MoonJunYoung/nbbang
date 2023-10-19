import bcrypt


class User:
    def __init__(self, id, identifier, password) -> None:
        self.id = id
        self.identifier = identifier
        self.password = password

    def password_encryption(self):
        salt = bcrypt.gensalt()
        encrypted = bcrypt.hashpw(self.password.encode("utf-8"), salt)
        self.password = encrypted.decode("utf-8")

    def check_password(self, password):
        return bcrypt.checkpw(password.encode(), self.password.encode())
