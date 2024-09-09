from fastapi import APIRouter
from ..controllers.wifi_list import Wifi_list
from ..controllers.get_details import Get_details
from ..controllers.create_qr import Create_qr

router = APIRouter()

@router.get("/wifi_list/")
async def wifi_list():
    return Wifi_list()

@router.get("/get_details/{wifi_name}")
async def get_details(wifi_name: str):
    print(wifi_name)
    return Get_details(wifi_name)

@router.get("/create_qr/{wifi_name}")
async def create_qr(wifi_name: str):
    print(wifi_name)
    return Create_qr(wifi_name)