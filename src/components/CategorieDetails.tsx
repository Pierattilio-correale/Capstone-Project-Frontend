import { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const CategoirieDetails = () => {
  interface User {
    id: number;
    nome: string;
    cognome: string;
    username: string;
    email: string;
    dataNascita: string;
    avatar: string;
  }

  interface Storia {
    id: number;
    titolo: string;
    descrizione: string;
    dataCreazione: string;
    genere: string;
    immagineCopertina: string;
    autore: User;
  }
  const params = useParams();
  console.log(params);
  const [data, setData] = useState<Storia[]>([]);
  const navigate = useNavigate();

  const fetchStorieIniziali = () => {
    fetch("http://localhost:8080/storie")
      .then((response) => {
        if (!response.ok) throw new Error("errore nella fetch");
        return response.json();
      })
      .then((data: Storia[]) => {
        const filtered = data.filter(
          (storia) => storia.genere === params.Categorie
        );
        setData(filtered);
      })
      .catch((err) => {
        console.log("errore nella promis ", err);
      });
  };
  useEffect(() => {
    fetchStorieIniziali();
  }, []);
  return (
    <>
      <Container>
        <h3 className="text-white fontnuovo fs-1 my-4">
          Ecco i migliori {params.Categorie}!
        </h3>
        <Row>
          {data.map((storia) => (
            <Col
              key={storia.id}
              className="col-lg-3 col-md-4 col-sm-6 col-xl-2"
            >
              <Card className="d-flex flex-column h-100">
                <Card.Img
                  variant="top"
                  src={storia.immagineCopertina}
                  alt={storia.titolo}
                  onClick={() => {
                    navigate(
                      "/Profile/" +
                        storia?.autore.id +
                        "/BookDetails/" +
                        storia.id
                    );
                  }}
                />
                <Card.Body
                  className="d-flex flex-column  text-white"
                  style={{
                    background: "linear-gradient(90deg, #7f00ff, #00bfff)",
                  }}
                >
                  <Card.Title>{storia.titolo}</Card.Title>
                  <Card.Text
                    className="flex-grow-1"
                    onClick={() =>
                      navigate("/ProfileDetails/" + storia?.autore.id)
                    }
                  >
                    {storia.autore.username}
                  </Card.Text>
                  <Button
                    variant="dark"
                    onClick={() =>
                      navigate(
                        "/Profile/" +
                          storia?.autore.id +
                          "/BookDetails/" +
                          storia.id
                      )
                    }
                  >
                    Leggi!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
export default CategoirieDetails;
