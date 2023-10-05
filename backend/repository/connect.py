from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import os
from dotenv import load_dotenv
from abc import ABC, abstractmethod

load_dotenv()


class MysqlConnector:
    host = os.environ.get("DB_HOST")
    port = os.environ.get("DB_PORT")
    user_name = os.environ.get("DB_USERNAME")
    passwd = os.environ.get("DB_PASSWD")
    database = os.environ.get("DB_DATABASE")
    engine = create_engine(f"mysql+pymysql://{user_name}:{passwd}@{host}:{port}/{database}")
    Session = scoped_session(sessionmaker(bind=engine))


class MysqlSession(MysqlConnector, ABC):
    def __init__(self) -> None:
        self.session = self.Session()

    def close(self):
        self.session.close()


class MysqlCRUDTemplate(MysqlSession):
    def __init__(self, model) -> None:
        self.model = model
        super().__init__()

    @abstractmethod
    def execute(self):
        pass

    def run(self):
        self.execute()
        self.close()


class MysqlCreate(MysqlCRUDTemplate):
    def execute(self):
        self.session.add(self.model)
        self.session.commit()


class MysqlUpdate(MysqlCRUDTemplate):
    def execute(self):
        self.session.commit()


class MysqlDelete(MysqlCRUDTemplate):
    def execute(self):
        self.session.delete(self.model)
        self.session.commit()
