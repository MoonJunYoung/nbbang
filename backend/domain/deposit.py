import os
from urllib.parse import urlparse

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from dotenv import load_dotenv

load_dotenv()
secret_key = bytes(os.environ.get("ENCRYPT_KEY"), "UTF-8")


def aes_encrypt(plaintext):
    cipher = AES.new(secret_key, AES.MODE_ECB)
    ciphertext = cipher.encrypt(pad(plaintext.encode("utf-8"), AES.block_size))
    return ciphertext


def aes_decrypt(ciphertext):
    cipher = AES.new(secret_key, AES.MODE_ECB)
    decrypted_data = unpad(cipher.decrypt(ciphertext), AES.block_size)
    return decrypted_data.decode("utf-8")


class Deposit:
    def __init__(self, bank=None, account_number=None, kakao_deposit_id=None) -> None:
        self.bank = bank
        self.account_number = account_number
        self.kakao_deposit_id = kakao_deposit_id
        if isinstance(self.account_number, str) and isinstance(self.bank, str):
            self._encrypt_account_number_data()
        elif isinstance(self.account_number, bytes) and isinstance(self.bank, bytes):
            self._dncrypt_account_number_data()

    def _encrypt_account_number_data(self):
        self.account_number = aes_encrypt(self.account_number)
        self.bank = aes_encrypt(self.bank)

    def _dncrypt_account_number_data(self):
        self.account_number = aes_decrypt(self.account_number)
        self.bank = aes_decrypt(self.bank)

    def update_bank_account(self, bank, account_number):
        self.bank = bank
        self.account_number = account_number
        if isinstance(self.account_number, str) and isinstance(self.bank, str):
            self._encrypt_account_number_data()
        elif isinstance(self.account_number, bytes) and isinstance(self.bank, bytes):
            self._dncrypt_account_number_data()

    def update_kakao_deposit_id(self, kakao_deposit_id):
        self.kakao_deposit_id = kakao_deposit_id
