import datetime
import json
import os

import jwt
import requests
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

    def get_user_name_and_platform_id_by_google_oauth(token):
        google_user_data = json.loads(
            requests.get(f"https://www.googleapis.com/oauth2/v1/userinfo?access_token={token}").text
        )
        name = google_user_data.get("name")
        platform_id = google_user_data.get("id")
        return name, platform_id

    def get_user_name_and_platform_id_by_kakao_oauth(token):
        def _get_user_access_token_by_kakao_oauth(token):
            data = {
                "grant_type": "authorization_code",
                "client_id": "3d14355e2c9679326b4c15d249b82bc5",
                "redirect_uri": "https://nbbang.shop/kakao-redirect",
                "code": token,
            }
            kakao_token_data = json.loads(requests.post(url=f"https://kauth.kakao.com/oauth/token", data=data).text)
            access_token = kakao_token_data.get("access_token")
            return access_token

        access_token = _get_user_access_token_by_kakao_oauth(token)
        headers = {"Authorization": f"Bearer {access_token}"}
        kakao_user_data = json.loads(requests.get(url="https://kapi.kakao.com/v2/user/me", headers=headers).text)
        platform_id = kakao_user_data.get("id")
        name = kakao_user_data.get("kakao_account").get("profile").get("nickname")
        return name, platform_id
