class User:
    def __init__(self, id, name, platform_id, platform, bank, account_number, kakao_id) -> None:
        self.id = id
        self.name = name
        self.platform_id = platform_id
        self.platform = platform
        self.bank = bank
        self.account_number = account_number
        self.kakao_id = kakao_id

    def update_account_number(self, bank, account_number):
        self.bank = bank
        self.account_number = account_number

    def update_kakao_id(self, kakao_id):
        self.kakao_id = kakao_id
