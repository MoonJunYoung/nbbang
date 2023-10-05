from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class UserModel(Base):
    __tablename__ = "user"
    id = Column("id", Integer, primary_key=True)
    identifier = Column(String)
    password = Column(String)
    salt = Column(String)

    def __init__(self, id, identifier, password, salt):
        self.id = id
        self.identifier = identifier
        self.password = password
        self.salt = salt
