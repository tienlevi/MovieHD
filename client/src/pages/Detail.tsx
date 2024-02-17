import { useState, useEffect } from "react";
import { DetailMovie } from "../api/movie";

function Detail() {
  const [detail, setDetail] = useState<{}>({});

  useEffect(() => {
    const API = async () => {
      const response: any = await DetailMovie();
      console.log(response);
      setDetail(response.data);
    };
    API();
  }, []);
  return (
    <>
      {/* {detail.map((item) => (
        <iframe
          key={item}
          src={item}
          title="a"
          width={300}
          height={300}
        ></iframe>
      ))} */}
    </>
  );
}

export default Detail;
