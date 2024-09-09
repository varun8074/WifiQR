import { useEffect, useState } from "react";
import axios from "axios";

// Define the type for the data
type Data = {
  [key: string]: string[];
};

interface prop {
  wifi_name: string;
}

function WifiDetails({ wifi_name }: prop) {

  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/QR/get_details/${wifi_name}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {
        <div>
          <p>Wifi name: {data.ssid}</p>
          <p>Password: {data.password}</p>
          <p>Security: {data.security}</p>
        </div>
      }
    </>
  );
}

export default WifiDetails;
