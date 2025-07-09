import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeLogged = () => {
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
    immagineCopertina: string;
    autore: User;
  }
  const [data, setData] = useState<Storia[]>([]);
  const navigate = useNavigate();
  const fetchStorieIniziali = () => {
    fetch("http://localhost:8080/storie")
      .then((response) => {
        if (!response.ok) throw new Error("errore nella fetch");
        return response.json();
      })
      .then((data: Storia[]) => {
        console.log(data);
        setData(data);
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
      <Container className="my-5">
        <h2 className="text-white">Per te!</h2>
        <Row className="g-1">
          {data?.slice(0, 6).map((storia) => (
            <Col
              className="col-lg-3 col-md-4 col-sm-6 col-xl-2  "
              key={storia.id}
            >
              <Card className="d-flex flex-column h-100">
                <Card.Img
                  variant="top"
                  src={storia.immagineCopertina}
                  alt={storia.titolo}
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
                    onClick={() => navigate("/BookDetails/" + storia?.id)}
                  >
                    Leggi!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="my-5">
        <h2 className="text-white">Novità del momento</h2>
        <Row className="g-1">
          {data?.slice(6, 12).map((storia) => (
            <Col
              className="col-lg-3 col-md-4 col-sm-6 col-xl-2  "
              key={storia.id}
            >
              <Card className="d-flex flex-column h-100">
                <Card.Img
                  variant="top"
                  src={storia.immagineCopertina}
                  alt={storia.titolo}
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
                    onClick={() => navigate("/BookDetails/" + storia?.id)}
                  >
                    Leggi!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="my-5">
        <h2 className="text-white">Romance</h2>
        <Row className="g-1">
          {data?.slice(12, 18).map((storia) => (
            <Col
              className="col-lg-3 col-md-4 col-sm-6 col-xl-2  "
              key={storia.id}
            >
              <Card className="d-flex flex-column h-100">
                <Card.Img
                  variant="top"
                  src={storia.immagineCopertina}
                  alt={storia.titolo}
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
                    onClick={() => navigate("/BookDetails/" + storia?.id)}
                  >
                    Leggi!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-5 ">
        <Row>
          <Col className=" text-white text-center d-block d-lg-flex align-items-center">
            <img
              src="assets/librocopeuff.png"
              className="img-fluid me-5"
              alt="Libro"
            />
            <div className="d-flex flex-column">
              <h3>
                Se vuoi anche tu raggiungere i tuoi sogni e creare una storia
                emozionante clicca qui!
              </h3>
              <div>
                <Button className="buttonanimation fs-4">Crea Storia!</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HomeLogged;
