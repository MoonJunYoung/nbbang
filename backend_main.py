from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.presentation.deposit import DepositPresentation
from backend.presentation.member import MemberPresentation
from backend.presentation.metting import MeetingPresentation
from backend.presentation.payment import PaymentPresentation
from backend.presentation.share import SharePresentation
from backend.presentation.user import UserPresentation

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Location"],
)


@app.get("/", status_code=200)
def haelth_check():
    return "haelth_check"


app.include_router(UserPresentation.router)
app.include_router(MeetingPresentation.router)
app.include_router(MemberPresentation.router)
app.include_router(PaymentPresentation.router)

app.include_router(DepositPresentation.user_router)
app.include_router(DepositPresentation.meeting_router)
app.include_router(SharePresentation.create_router)
app.include_router(SharePresentation.read_router)
