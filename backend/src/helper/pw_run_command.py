import subprocess
def pw_run_netsh_command(command):
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        return f"Error: {e.returncode}\n{e.stderr}"
    except Exception as e:
        return f"An error occurred: {e}"