import datetime
import bcrypt
import jwt
from dotenv import load_dotenv
import os

load_dotenv()
secret_key = os.environ.get("JWT_SECRET_KEY")


class User:
    def __init__(self, id, identifier, password, token) -> None:
        self.id = id
        self.identifier = identifier
        self.password = password
        self.token = token

    def password_encryption(self):
        salt = bcrypt.gensalt()
        encrypted = bcrypt.hashpw(self.password.encode("utf-8"), salt)
        self.password = encrypted.decode("utf-8")

    def check_password(self, password):
        return bcrypt.checkpw(password.encode(), self.password.encode())

    def create_token(self):
        payload = {
            "id": self.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30),
        }
        self.token = jwt.encode(payload, secret_key)

    def get_user_id_by_token(self):
        token_info = jwt.decode(self.token, secret_key, algorithms="HS256")
        self.id = token_info.get("id")
