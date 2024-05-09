from fastapi import APIRouter, Depends, HTTPException

from ..dependencies import get_token_header

router = APIRouter(
    prefix="/headlines",
    tags=["headlines"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


fake_headlines_db = {"plumbus": {"name": "Plumbus"}, "gun": {"name": "Portal Gun"}}


@router.get(
        "/",
        tags=["custom"],
        responses={403: {"description": "Operation forbidden"}})
async def read_headlines():
    return fake_headlines_db
