import bcrypt


class User:
    def __init__(self, id, identifier, password, salt) -> None:
        self.id = id
        self.identifier = identifier
        self.password = password
        self.salt = salt

    def password_encryption(self):
        if not self.salt:
            self.salt = bcrypt.gensalt()
        encrypted = bcrypt.hashpw(self.password.encode("utf-8"), self.salt)
        self.password = encrypted.decode("utf-8")
