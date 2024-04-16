import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()


host = os.environ.get("DB_HOST")
port = os.environ.get("DB_PORT")
user_name = os.environ.get("DB_USERNAME")
passwd = os.environ.get("DB_PASSWD")
database = os.environ.get("DB_DATABASE")

# engine = create_engine(
#     f"mysql+pymysql://{user_name}:{passwd}@{host}:{port}/{database}"
# )
engine = create_engine("sqlite:///develop.db", echo=True)
SessionLocal = sessionmaker(bind=engine)


def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class MysqlCRUDTemplate:
    pass
