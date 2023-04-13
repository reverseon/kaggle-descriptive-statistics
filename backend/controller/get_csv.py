import re

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import service.get_csv as get_csv_service

router = APIRouter(
    prefix="/csv",
    tags=["csv"],
    responses={404: {"description": "Not found"}},
)


class Item(BaseModel):
    url: str


class InvalidUrlException(Exception):
    pass


@router.post("/")
async def get_csv(item: Item):
    try:
        pattern = r'https://www.kaggle.com/datasets/[\w-]+/[\w-]+'
        if not re.match(pattern, item.url):
            raise InvalidUrlException("Invalid URL")
        path = get_csv_service.get_csv_filename(item.url)
        return FileResponse(
            path,
            media_type='text/csv',
            filename='data.csv'
        )
    except InvalidUrlException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except LookupError as e:
        raise HTTPException(status_code=404, detail="CSV file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
