import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";

// Define the type for the data
type Data = {
  [key: string]: string[];
};

interface prop {
  onSelectItem: (value: string) => void;
}

function WifiList({ onSelectItem }: prop) {
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/QR/wifi_list/")
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

  //   return (
  //     <>
  //       {
  //         <div>
  //           <ul className="list-group">
  //             {Object.entries(data).map(([key, values]) => (
  //               <li className="list-group-item" key={key}>
  //                 <ul>
  //                   {values.map((value, index) => (
  //                     <li
  //                       className={
  //                         selectedIndex === index
  //                           ? "list-group-item active"
  //                           : "list-group-item"
  //                       }
  //                       key={value}
  //                       onClick={() => {
  //                         setSelectedIndex(index);
  //                         onSelectItem(value);
  //                       }}
  //                     >
  //                       {value}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       }
  //     </>
  //   );

  return (
    <>
    <ul className="list-group">
      {data.wifi_list.map((items,index) => (
        <li
          className={
            selectedIndex === index
              ? "list-group-item active"
              : "list-group-item"
          }
          key={items}
          onClick={() => {
            setSelectedIndex(index);
            onSelectItem(items);
          }}
        >
          {items}
        </li>
      ))}
    </ul>

    </>
  );
  
}

export default WifiList;
