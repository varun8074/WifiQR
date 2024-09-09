import { useEffect, useState } from "react";
import axios from "axios";


interface prop {
  wifi_name: string;
}

function GenerateQr({ wifi_name }: prop) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/QR/create_qr/${wifi_name}`)
      .then(() => {
        setLoading(false);
        setImageUrl(`Qr_Image/wifi_info_qr.png?${new Date().getTime()}`); // Update image URL with timestamp
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []); // Add wifi_name as a dependency to re-fetch data when it changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <img src={imageUrl} className="img-thumbnail" alt="couldn't fetch" />
    </div>
  );
}

export default GenerateQr;
