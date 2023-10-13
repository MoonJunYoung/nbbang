class Payment:
    def __init__(self, id, place, price, attend_member_ids, meeting_id) -> None:
        self.id = id
        self.place = place
        self.price = price
        self.attend_member_ids = attend_member_ids
        self.meeting_id = meeting_id
