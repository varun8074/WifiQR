from ..helper.pw_run_command import pw_run_netsh_command
from ..helper.extract_ssid_and_key import extract_ssid_and_key

def Get_details(wifi_name):    
# wifi_name = input("Enter the Wi-Fi profile name: ")
    netsh_command = f'netsh wlan show profile name="{wifi_name}" key=clear'
    output1 = pw_run_netsh_command(netsh_command)
    #print(output1)
    
    # Extract and print SSID and Key Content
    result = extract_ssid_and_key(output1)
    #print(result)

    
    #----------------------------------------------------------------------------------------------------------------
    # Define the Wi-Fi network information
    ssid = result[0].strip("""" /" """)
    password = result[1]
    security = result[2]
    return {
    "ssid" : ssid,
    "password" : password,
    "security" : security
    }