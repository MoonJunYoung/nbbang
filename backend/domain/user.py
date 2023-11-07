import os

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from dotenv import load_dotenv

load_dotenv()
secret_key = bytes(os.environ.get("ENCRYPT_KEY"), "UTF-8")


class User:
    def __init__(self, id, name, platform_id, platform, bank, account_number, kakao_id) -> None:
        self.id = id
        self.name = name
        self.platform_id = platform_id
        self.platform = platform
        self.bank = bank
        self.account_number = account_number
        self.kakao_id = kakao_id
        if isinstance(self.account_number, str) and isinstance(self.bank, str):
            self._encrypt_account_number_data()
        elif isinstance(self.account_number, bytes) and isinstance(self.bank, bytes):
            self._dncrypt_account_number_data()

    def update_account_number(self, bank, account_number):
        self.bank = bank
        self.account_number = account_number
        self._encrypt_account_number_data()

    def update_kakao_id(self, kakao_id):
        self.kakao_id = kakao_id

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
