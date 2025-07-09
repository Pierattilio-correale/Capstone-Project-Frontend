import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ListaCapitoli from "./ListaCapitoli";

const BookDetails = () => {
  interface Storia {
    id: number;
    titolo: string;
    descrizione: string;
    genere: string;
    dataCreazione: string;
    immagineCopertina: string;
    autore: User;
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
  const params = useParams();
  const [data, setData] = useState<Storia | null>(null);

  const storiaDetails = () => {
    fetch(`http://localhost:8080/storie/${params.bookId}`)
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
        console.log("errore nella fetch", err);
      });
  };
  useEffect(() => {
    storiaDetails();
  }, []);

  return (
    <>
      <Container className="  min-vh-100 my-4 bg-body-tertiary p-0">
        <Row className="d-flex flex-column-reverse flex-md-row">
          <Col className="col-12 col-md-4 p-0">
            <ListaCapitoli />
          </Col>
          <Col className="col-12 col-md-8 p-3">
            <div className="my-4  d-flex justify-content-center ">
              <img
                src={data?.immagineCopertina}
                width={200}
                height={200}
                className="img-fluid mx-auto "
              />
            </div>
            <div className="d-flex flex-column  ">
              <h4 className="mx-auto">Descrizione</h4>
              <p>{data?.descrizione}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookDetails;
