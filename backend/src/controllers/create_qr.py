from .get_details import Get_details
from ..helper.create_qr_code import create_qr_code
def Create_qr(wifi_name):
    
    details=Get_details(wifi_name)
    ssid,password,security=details.values()
    # Create a Wi-Fi network configuration string
    wifi_config = f"WIFI:T:{security};S:{ssid};P:{password};;"


    # Create a QR code for the extracted information
    create_qr_code(wifi_config)
    print("QR code saved as wifi_info_qr.png")
    return {"Message":"QR code saved as wifi_info_qr.png"}