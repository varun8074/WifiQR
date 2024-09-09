from ..helper.run_command import run_command

def Wifi_list():
    command = """netsh wlan show profile | findstr /C:"All User" """
    output = run_command(command)
    output = output.split(" All User Profile     : ")
    wifi_list=[]
    for i in output:
        temp=i.rstrip("\r\n   ")
        wifi_list.append(temp)

    print(output)
    return {"wifi_list": wifi_list}