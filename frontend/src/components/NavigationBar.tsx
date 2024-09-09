import { useState } from "react";
import SelectWifi from "./SelectWifi";
import "../App.css";
const NavigationBar = () => {
  const [isChecked, setIsChecked] = useState(false);

  // Handle changes to the checkbox state
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="src\assets\router-fill.svg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            WIFI QR
          </a>

          <div className="form-check form-switch">
            <input
              className="form-check-input hidden-checkbox"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />

            <label htmlFor="flexSwitchCheckDefault">
              <img
                src={
                  isChecked ? "src/assets/wifi.svg" : "src/assets/wifi-off.svg"
                }
                alt="Toggle WiFi"
                width="30"
                height="24"
                className="d-inline-block align-text-top"
              />
            </label>
          </div>
        </div>
      </nav>
      {isChecked ? <SelectWifi></SelectWifi> : <h1>enable wifi</h1>}
    </>
  );
};

export default NavigationBar;
