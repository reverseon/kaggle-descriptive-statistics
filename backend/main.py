from fastapi import FastAPI
from controller.get_csv import router as get_csv_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


@app.get("/")
async def root():
    return {
        "status": "ok",
    }

app.include_router(get_csv_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

