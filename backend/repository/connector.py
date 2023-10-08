from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import os
from dotenv import load_dotenv


load_dotenv()


class MysqlConnector:
    host = os.environ.get("DB_HOST")
    port = os.environ.get("DB_PORT")
    user_name = os.environ.get("DB_USERNAME")
    passwd = os.environ.get("DB_PASSWD")
    database = os.environ.get("DB_DATABASE")
    engine = create_engine(f"mysql+pymysql://{user_name}:{passwd}@{host}:{port}/{database}")
    Session = scoped_session(sessionmaker(bind=engine))


class MysqlSession(MysqlConnector):
    def __init__(self) -> None:
        self.session = self.Session()

    def __del__(self):
        self.session.close()
