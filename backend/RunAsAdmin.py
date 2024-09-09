import subprocess
import re  # Import the regular expressions module
import qrcode
from PIL import Image
from qrcode.constants import ERROR_CORRECT_L

def run_command(command):
    try:
        result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output = result.stdout.decode('utf-8')
        return output
    except subprocess.CalledProcessError as e:
        return f"Error: {e.returncode}\n{e.stderr.decode('utf-8')}"

def pw_run_netsh_command(command):
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        return f"Error: {e.returncode}\n{e.stderr}"
    except Exception as e:
        return f"An error occurred: {e}"

# Function to extract SSID and key content from netsh output
def extract_ssid_and_key(output):
    lines = output.split('\n')  # Split the output into lines

    ssid = None
    key_content = None
    authentication = None

    for line in lines:
        line = line.strip()  # Remove leading/trailing whitespace
        if line.startswith("SSID name"):
            ssid = line.split(":")[1].strip()
        elif line.startswith("Key Content"):
            key_content = line.split(":")[1].strip()
        elif line.startswith("Authentication"):
            authentication = line.split(":")[1].strip()

    if ssid is not None and key_content is not None and authentication is not None:
        return ssid,key_content,authentication
    else:
        return "SSID, Key Content, or Authentication not found in the output."
def create_qr_code(text):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(text)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save("wifi_info_qr.png")
    return img



if __name__ == "__main__":
    command = """netsh wlan show profile | findstr /C:"All User" """
    
    output= run_command(command)
    output = output.split(" All User Profile     : ")
    wifi_list=[]
    for i in output:
        print(i.rstrip("\r\n   "))
    # print(output)
    
    wifi_name = input("Enter the Wi-Fi profile name: ")
    netsh_command = f'netsh wlan show profile name="{wifi_name}" key=clear'
    output1 = pw_run_netsh_command(netsh_command)
    #print(output1)
    
    # Extract and print SSID and Key Content
    result = extract_ssid_and_key(output1)
    #print(result)

    
    #----------------------------------------------------------------------------------------------------------------
    # Define the Wi-Fi network information
    ssid = result[0]
    password = result[1]
    security = result[2]
    print(ssid)



    # Create a Wi-Fi network configuration string
    wifi_config = f"WIFI:T:{security};S:{ssid};P:{password};;"


    # Create a QR code for the extracted information
    qr=create_qr_code(wifi_config)
    qr.show()
    print("QR code saved as wifi_info_qr.png")


    #----------------------------------------------------------------------------------------------------------------