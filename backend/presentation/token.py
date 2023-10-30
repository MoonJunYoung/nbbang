import datetime
import os

import jwt
from dotenv import load_dotenv

from backend.exceptions import InvalidTokenException, MissingTokenException

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
        if not token:
            raise MissingTokenException
        try:
            token_info = jwt.decode(token, secret_key, algorithms="HS256")
        except jwt.exceptions.DecodeError:
            raise InvalidTokenException
        token_user_id = token_info.get("id")
        return token_user_id

    def get_user_name_and_email_by_google_Oauth(token):
        paylode = jwt.decode(token, algorithms=["RS256"], options={"verify_signature": False})
        return paylode["name"], paylode["email"]
