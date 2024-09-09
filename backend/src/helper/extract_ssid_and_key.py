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