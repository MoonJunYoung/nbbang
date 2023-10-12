class Member:
    def __init__(self, id, name, leader, meeting_id) -> None:
        self.id = id
        self.name = name
        self.leader = leader
        self.meeting_id = meeting_id

    def set_leader(self, leader_member):
        if self.id == leader_member.id:
            self.leader = True
