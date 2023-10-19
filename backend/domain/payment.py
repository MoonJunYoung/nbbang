class Payment:
    def __init__(self, id, place, price, pay_member_id, attend_member_ids, meeting_id) -> None:
        self.id = id
        self.place = place
        self.price = price
        self.pay_member_id = pay_member_id
        self.attend_member_ids = attend_member_ids
        self.meeting_id = meeting_id

    def set_split_price(self, split_price):
        self.splict_price = split_price
