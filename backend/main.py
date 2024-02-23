from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from meeting.presentation import MeetingPresentation
from member.presentation import MemberPresentation
from payment.presentation import PaymentPresentation
from user.presentation import UserPresentation

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
