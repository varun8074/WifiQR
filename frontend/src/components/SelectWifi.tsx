import { useState } from "react";
import WifiList from "./WifiList";
import NavigationBar from "./NavigationBar";
import WifiDetails from "./WifiDetails";
import GenerateQr from "./GenerateQr";

function SelectWifi() {
  const [selectedItem, setSelectedItem] = useState("");
  const [clickState, setClickState] = useState(false);

  const handleSelectItem = (value: string) => {
    setSelectedItem(value), setClickState(false);
  };
  const handleClick = () => {
    setClickState(true);
  };
  
  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="card border-info mb-3" style={{ width: "40rem" }}>
          <div className="card-body">
            <h1 className="card-title">Wifi List</h1>
            <WifiList onSelectItem={handleSelectItem}></WifiList>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleClick}
            >
              Generate QR Code
            </button>
          </div>
        </div>

        <div className="col">
          <div className="card border-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Please scan the QR</h5>
              {clickState && (
                <GenerateQr wifi_name={selectedItem}></GenerateQr>
              )}
            </div>
            <div className="card-footer bg-transparent border-success">
              {clickState && (
                <WifiDetails wifi_name={selectedItem}></WifiDetails>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectWifi;
