import bcrypt


class User:
    def __init__(self, id, identifier, password, salt) -> None:
        self.id = id
        self.identifier = identifier
        self.password = password
        self.salt = salt
