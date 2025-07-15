import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Categorie = () => {
  const navigate = useNavigate();
  const horror = "Horror";
  const fantasy = "Fantasy";
  const thriller = "Thriller";
  const romance = "Romance";
  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col xs={12} sm={6} md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src="/assets/moon.jpg"
              style={{ height: "180px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>Romance</Card.Title>
              <Card.Text>
                Immergiti in storie d'amore piene di emozioni e passione.
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/Categorie/" + romance);
                }}
              >
                Scopri Romance
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src="/assets/casa.jpg"
              style={{ height: "180px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>Thriller</Card.Title>
              <Card.Text>
                Suspense, colpi di scena e misteri che tengono incollati.
              </Card.Text>
              <Button
                variant="danger"
                onClick={() => {
                  navigate("/Categorie/" + thriller);
                }}
              >
                Vai ai Thriller
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src="/assets/castello.jpg"
              style={{ height: "180px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>Fantasy</Card.Title>
              <Card.Text>
                Mondi magici, eroi leggendari e creature straordinarie.
              </Card.Text>
              <Button
                variant="success"
                onClick={() => {
                  navigate("/Categorie/" + fantasy);
                }}
              >
                Entra nel Fantasy
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src="/assets/chiesa.jpg"
              style={{ height: "180px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>Horror</Card.Title>
              <Card.Text>
                Storie da brividi, oscure e terrificanti. Sei pronto?
              </Card.Text>
              <Button
                variant="dark"
                onClick={() => {
                  navigate("/Categorie/" + horror);
                }}
              >
                Vai all'Horror
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Categorie;
