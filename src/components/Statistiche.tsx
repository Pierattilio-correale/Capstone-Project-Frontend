import { Col, Row, Container } from "react-bootstrap";
import Stat from "./Stat";

const Statistiche = () => {
  return (
    <>
      <Container
        className="min-vh-100"
        style={{
          background: "#fcf9f4",
          border: "1px solid #e0dccc",
          borderRadius: "1rem",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h1 className="text-center fontTikTok mb-5">
          Statistiche <span className="coloreJ">J</span>wel
          <span className="colorep">P</span>aper
        </h1>

        <Row>
          <Col>
            <Stat mode="mie" />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Statistiche;
