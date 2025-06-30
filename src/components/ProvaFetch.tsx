import { useEffect, useState } from "react";

const ProvaFetch = () => {
  const [data, setData] = useState([]);
  const baseEndpoint = "http://localhost:8080/storie";
  const fectDellAnno = () => {
    fetch(baseEndpoint, {})
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log("errore nella promis ", err);
      });
  };
  useEffect(() => {
    fectDellAnno();
  }, []);
  return <></>;
};
export default ProvaFetch;
