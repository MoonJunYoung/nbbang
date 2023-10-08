import datetime

import jwt
from dotenv import load_dotenv
import os

from backend.domain.user import User

load_dotenv()
secret_key = os.environ.get("JWT_SECRET_KEY")


class Token:
    def create_token_by_user_id(user_id):
        payload = {
            "id": user_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30),
        }
        token = jwt.encode(payload, secret_key)
        return token

    def get_user_id_by_token(token):
        token_info = jwt.decode(token, secret_key, algorithms="HS256")
        user_id = token_info.get("id")
        return user_id
