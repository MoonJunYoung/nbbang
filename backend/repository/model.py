from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class UserModel(Base):
    __tablename__ = "user"
    id = Column("id", Integer, primary_key=True)
    identifier = Column(String)
    password = Column(String)

    def __init__(self, id, identifier, password):
        self.id = id
        self.identifier = identifier
        self.password = password


class MeetingModel(Base):
    __tablename__ = "meeting"
    id = Column("id", Integer, primary_key=True)
    name = Column(String)
    date = Column(String)
    user_id = Column(Integer)

    def __init__(self, id, name, date, user_id):
        self.id = id
        self.name = name
        self.date = date
        self.user_id = user_id
