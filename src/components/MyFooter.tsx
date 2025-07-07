import { Col, Container, Row } from "react-bootstrap";

const MyFooter = () => {
  return (
    <>
      <Container className="mt-5 pt-5 text-center">
        <Row className=" d-flex justify-content-center">
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                accessibilità <i className="bi bi-universal-access ms-2"></i>
              </a>
            </p>
          </Col>
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                lavora con noi <i className="bi bi-people ms-2"></i>
              </a>
            </p>
          </Col>
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                privacy <i className="bi bi-lock ms-2"></i>
              </a>
            </p>
          </Col>
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                informazioni <i className="bi bi-info-circle ms-2"></i>
              </a>
            </p>
          </Col>
        </Row>
        <Row className=" d-flex justify-content-center">
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                instagram <i className="bi bi-instagram ms-2"></i>
              </a>
            </p>
          </Col>
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                tiktok <i className="bi bi-tiktok ms-2"></i>
              </a>
            </p>
          </Col>
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                facebook <i className="bi bi-facebook ms-2"></i>
              </a>
            </p>
          </Col>
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                telegram <i className="bi bi-telegram ms-2"></i>
              </a>
            </p>
          </Col>
        </Row>
        <Row className=" d-flex justify-content-center">
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                impostazioni <i className="bi bi-gear ms-2"></i>
              </a>
            </p>
          </Col>
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                contattaci <i className="bi bi-chat-heart ms-2"></i>
              </a>
            </p>
          </Col>
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                partner <i className="bi bi-person-workspace ms-2"></i>
              </a>
            </p>
          </Col>
          <Col className="col-12 col-md-2">
            <p>
              <a href="#" className="footeranchor">
                aiuto&supporto <i className="bi bi-person-raised-hand ms-2"></i>
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyFooter;
