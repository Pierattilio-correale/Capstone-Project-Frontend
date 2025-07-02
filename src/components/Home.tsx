import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Container className="my-5">
        <Row className="d-flex justify-content-center">
          <Col className="col-12 col-xl-3 ">
            <Row className="align-items-center text-center">
              <Col xs={3}>
                <img src="assets/librobianco.png" width={70} height={70} />
              </Col>
              <Col xs={6} className="pt-xxl-3 px-0 ">
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
            <h2 className="font-personalizzato-titolo text-white ps-xxl-5">
              <i>
                •<i className="coloreJ">J</i>wel<i className="colorep">P</i>aper
                Books•
              </i>
            </h2>
          </Col>
          <Col className="col-4 col-xl-3 ">
            <img
              src="assets/azzurroremovebgpreview.png"
              width={120}
              height={120}
            />
            <img />
          </Col>
        </Row>
      </Container>
      <Container className="p-2 m-0 my-3">
        <Col className="col-3">
          <p className="text-white fs-5">
            Il posto dove le storie diventano realtà! Qui puoi leggere, scrivere
            e condividere racconti che ti faranno emozionare, sognare e
            divertire.
          </p>
        </Col>
      </Container>
      <Container className="">
        <Col className="col-3">
          <p className="text-white text-end fs-5  " style={{ width: "30ch" }}>
            Che tu sia un lettore curioso o un autore, Jewel Paper Book è la
            community perfetta per far brillare la tua passione per i libri
          </p>
        </Col>
      </Container>
      <Container className="p-4 m-0">
        <Col className="col-3">
          <p className="text-white fs-5">Entra, scopri nuove avventure.</p>
          <p className="text-white text-center fs-5">
            Fai sentire la tua voce!
          </p>
        </Col>
      </Container>
    </>
  );
};
export default Home;
