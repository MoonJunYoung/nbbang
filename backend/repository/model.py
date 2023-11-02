from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class UserModel(Base):
    __tablename__ = "user"
    id = Column("id", Integer, primary_key=True)
    name = Column(String)
    email = Column(String)

    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email


class MeetingModel(Base):
    __tablename__ = "meeting"
    id = Column("id", Integer, primary_key=True)
    name = Column(String)
    date = Column(String)
    user_id = Column(Integer)
    uuid = Column(String)

    def __init__(self, id, name, date, user_id, uuid):
        self.id = id
        self.name = name
        self.date = date
        self.user_id = user_id
        self.uuid = uuid


class MemberModel(Base):
    __tablename__ = "member"
    id = Column("id", Integer, primary_key=True)
    name = Column(String)
    leader = Column(Boolean)
    meeting_id = Column(Integer)

    def __init__(self, id, name, leader, meeting_id):
        self.id = id
        self.name = name
        self.leader = leader
        self.meeting_id = meeting_id


class PaymentModel(Base):
    __tablename__ = "payment"
    id = Column("id", Integer, primary_key=True)
    place = Column(String)
    price = Column(Integer)
    pay_member_id = Column(Integer)
    attend_member_ids = Column(String)
    meeting_id = Column(Integer)

    def __init__(self, id, place, price, pay_member_id, attend_member_ids, meeting_id):
        self.id = id
        self.place = place
        self.price = price
        self.pay_member_id = pay_member_id
        self.attend_member_ids = attend_member_ids
        self.meeting_id = meeting_id
