from fastapi import FastAPI

from backend.presentation.user import UserPresentation


app = FastAPI()

app.include_router(UserPresentation.router)


from fastapi.middleware.cors import CORSMiddleware

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
