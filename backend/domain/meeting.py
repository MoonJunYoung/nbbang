import datetime
import os
import uuid
from urllib.parse import urlparse

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from dotenv import load_dotenv

from backend.exceptions import MeetingUserMismatchException

load_dotenv()
secret_key = bytes(os.environ.get("ENCRYPT_KEY"), "UTF-8")


class Meeting:
    def __init__(self, id, name, date, user_id, uuid, account_number, bank, kakao_id) -> None:
        self.id = id
        self.name = name
        self.date = date
        self.user_id = user_id
        self.uuid = uuid
        self.account_number = account_number
        self.bank = bank
        self.kakao_id = kakao_id
        if isinstance(self.account_number, str) and isinstance(self.bank, str):
            self._encrypt_account_number_data()
        elif isinstance(self.account_number, bytes) and isinstance(self.bank, bytes):
            self._dncrypt_account_number_data()

    def set_template(self):
        self.name = "모임명을 설정해주세요"
        self.date = datetime.date.isoformat(datetime.date.today())

    def is_user_of_meeting(self, user_id):
        if not self.user_id == user_id:
            raise MeetingUserMismatchException(user_id, self.id)

    def set_uuid(self):
        self.uuid = uuid.uuid4()

    def _encrypt_account_number_data(self):
        self.account_number = self.__aes_encrypt(secret_key, self.account_number)
        self.bank = self.__aes_encrypt(secret_key, self.bank)

    def _dncrypt_account_number_data(self):
        self.account_number = self.__aes_decrypt(secret_key, self.account_number)
        self.bank = self.__aes_decrypt(secret_key, self.bank)

    def __aes_encrypt(self, key, plaintext):
        cipher = AES.new(key, AES.MODE_ECB)
        ciphertext = cipher.encrypt(pad(plaintext.encode("utf-8"), AES.block_size))
        return ciphertext

    def __aes_decrypt(self, key, ciphertext):
        cipher = AES.new(key, AES.MODE_ECB)
        decrypted_data = unpad(cipher.decrypt(ciphertext), AES.block_size)
        return decrypted_data.decode("utf-8")

    def _extract_kakao_id(self):
        path = urlparse(self.kakao_id).path
        kakao_id = path.split("/")[1]
        self.kakao_id = kakao_id
