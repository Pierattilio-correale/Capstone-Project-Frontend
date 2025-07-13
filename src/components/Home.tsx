import { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  handleCloseLogin: () => void;
  handleCloseRegister: () => void;
  handleShowRegister: () => void;
  handleShowLogin: () => void;
}
const Home = ({
  handleCloseLogin,
  handleCloseRegister,
  handleShowRegister,
  handleShowLogin,
}: HomeProps) => {
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
        <Row className="d-flex justify-content-center">
          <Col className="col-12 col-xl-3 ">
            <Row className="align-items-center text-center">
              <Col xs={3}>
                <img src="assets/librobianco.png" width={70} height={70} />
              </Col>
              <Col xs={6} className="pt-xxl-3 px-0">
                <h5 className="pt-xl-4 pt-xxl-0 fw-bold">Benvenuto su </h5>
                <h5 className="text-white">
                  <i className="coloreJ">J</i>
                  <i className="colorep fw-bold">P</i>B
                </h5>
              </Col>
              <Col xs={3}>
                <img
                  src="assets/librobianco.png"
                  className="gira"
                  width={70}
                  height={70}
                />
              </Col>
            </Row>
          </Col>
          <Col className="col-12 col-xl-5 ">
            <h2 className="font-personalizzato-titolo text-white ms-5 ms-xxl-0   text-center">
              <i>
                •<i className="coloreJ">J</i>ewel<i className="colorep">P</i>
                aper Books•
              </i>
            </h2>
          </Col>
          <Col className="col-4 col-xl-3 "></Col>
        </Row>
      </Container>
      <Container className="p-1 my-2">
        <Row className="">
          <Col className="col-12 mb-5 pb-5 pb-lg-0 mb-lg-0 col-lg-3">
            <p className="text-white fs-5 mb-5 appari fw-bold">
              Il posto dove le storie diventano realtà! Qui puoi leggere,
              scrivere e condividere racconti che ti faranno emozionare, sognare
              e divertire.
            </p>
          </Col>
          <Col className="col-lg-6 text-center">
            <img
              src="assets/logojpp.png"
              width={220}
              height={220}
              className="neon-border apparidalvuoto"
            />
          </Col>
          <Col className="d-flex justify-content-center align-items-center col-md-6 col-lg-3">
            <img
              src="assets/azzurroremovebgpreview.png"
              width={150}
              height={150}
              className="d-block d-lg-none"
            />
            <div
              className="d-none d-xl-block"
              style={{ position: "relative", width: "380px", height: "200px" }}
            >
              <img
                src="assets/quadratibianchi.png"
                alt="sfondo"
                className="appariright"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  opacity: 0.3,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "45%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  textAlign: "center",
                  zIndex: 2,
                  padding: "0 10px",
                }}
              >
                <p className="colorep fw-bold m-xl-0 m-xxl-1 ">
                  Inizia il tuo viaggio letterario oggi.
                </p>
                <p className="fw-bold">
                  Unisciti a JPB e trasforma le tue idee in storie
                  indimenticabili.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="">
        <Row>
          <Col className=" col-12 col-lg-3  d-flex flex-row-reverse flex-lg-row">
            <p
              className="text-white text-end fs-5  ps-lg-0 mb-1 apparileft fw-bold "
              style={{ width: "30ch" }}
            >
              Che tu sia un lettore curioso o un autore, Jewel Paper Book è la
              community perfetta per far brillare la tua passione per i libri
            </p>
          </Col>
          <Col className="d-flex flex-row-reverse">
            <img
              src="assets/azzurroremovebgpreview.png"
              width={150}
              height={150}
              className="d-none d-lg-block apparidalvuoto"
            />
          </Col>
        </Row>
      </Container>
      <Container className="m-0 mt-3 mt-md-1 mt-lg-0">
        <Col className="col-12 col-md-3 apparidalvuoto">
          <p className="text-white fs-5 fw-bold">
            Entra, scopri nuove avventure.
          </p>
          <p className="text-white text-center fs-5 fw-bold">
            Fai sentire la tua voce!
          </p>
        </Col>
      </Container>
      <Container className="my-5">
        <h2 className="text-white fontnuovo fs-1">I migliori JewelPaper!</h2>
        <Row className="g-3">
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
                  onClick={() => {
                    navigate(
                      "/Profile/" +
                        storia.autore.id +
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
                          storia.autore.id +
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
      <Container className="text-center">
        <h2 className="text-white fontTikTok">
          Vuoi iniziare anche tu a scrivere storie e realizzare i tuoi sogni?
        </h2>
        <Button className="buttonanimation me-2 fs-4" onClick={handleShowLogin}>
          Login
        </Button>
        <Button className="buttonanimation fs-4" onClick={handleShowRegister}>
          Registrazione
        </Button>
      </Container>
    </>
  );
};
export default Home;
