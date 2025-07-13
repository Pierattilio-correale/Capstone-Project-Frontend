import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SezioneCommenti from "./SezioneCommenti";

const CapitoloDetails = () => {
  interface Capitoli {
    id: number;
    titolo: string;
    contenuto: string;
    numeroCapitolo: number;
    storia: Storia;
  }
  interface Storia {
    id: number;
    titolo: string;
    descrizione: string;
    genere: string;
    dataCreazione: string;
    immagineCopertina: string;
    autore: User;
    capitoli: Capitoli[];
  }
  interface User {
    id: number;
    nome: string;
    cognome: string;
    username: string;
    email: string;
    dataNascita: string;
    avatar: string;
    descrizione: string;
  }
  const [data, setData] = useState<Capitoli | null>(null);
  const params = useParams();

  const contenutoCapitolo = () => {
    fetch(`http://localhost:8080/capitoli/${params.capitoloId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("errore nella promis");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log("errore nella fetch ", err);
      });
  };
  useEffect(() => {
    contenutoCapitolo();
  }, []);
  return (
    <>
      <Container
        className=" min-vh-100 my-3 "
        style={{
          background: "#fcf9f4",
          border: "1px solid #e0dccc",
          borderRadius: "1rem",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Row>
          <h2 className="text-center my-3">{data?.titolo}</h2>
          <Col className="col-2 invisible">ciao</Col>
          <Col className="col-8">
            <p className="fs-5 ">{data?.contenuto}</p>
          </Col>
          <Col className="col-2 invisible">ciao</Col>
        </Row>
      </Container>
      <SezioneCommenti />
    </>
  );
};
export default CapitoloDetails;
