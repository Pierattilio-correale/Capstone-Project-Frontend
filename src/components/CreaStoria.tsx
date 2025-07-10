import { useEffect, useState } from "react";
import { Form, Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const CreaStoria = () => {
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
  interface Storia {
    id: number;
    titolo: string;
    descrizione: string;
    genere: string;
    dataCreazione: string;
    immagineCopertina: string;
    autore: User;
  }

  const params = useParams();
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [genere, setGenere] = useState("");
  const [data, setData] = useState<(User & { storie: Storia[] }) | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const navigate = useNavigate();
  const fecthProfile = () => {
    fetch(`http://localhost:8080/users/${params.profileId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore nella fetch");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.error("Errore nella richiesta:", err);
      });
  };
  useEffect(() => {
    if (params.profileId) {
      fecthProfile();
    }
  }, [params.profileId]);

  const CreaStoriaFetch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { titolo, descrizione, genere, userId: data?.id };
    fetch(`http://localhost:8080/storie`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }
        return response.json();
      })
      .then((postStoria) => {
        console.log(postStoria);
        handleClose();
        setTitolo("");
        setDescrizione("");
        setGenere("");
        setTimeout(() => {
          fecthProfile();
          navigate("/ProfileDetails/" + data?.id);
        }, 500);
        setShowSuccess(true);
      })
      .catch((err) => {
        console.log("errore nella fetch ", err);
      });
  };

  return (
    <>
      <Container className="bg-body-tertiary min-vh-100  pt-5">
        <Row className="d-flex justify-content-between">
          {showSuccess && (
            <div className="alert alert-success" role="alert">
              Storia creata con successo!
            </div>
          )}
          <Col>
            <div className="d-block d-md-flex justify-content-between">
              <h2 className="mx-auto">Aggiungi nuova storia!</h2>

              <div className="d-flex  pe-3">
                <Button
                  variant="primary"
                  className="d-flex align-items-center gap-2"
                  onClick={handleShow}
                >
                  <i className="bi bi-plus-lg"></i> Aggiungi nuova storia
                </Button>
              </div>
            </div>
          </Col>
          <Col className="col-12 my-5">
            <h3 className="fontnuovo fs-2">
              Crea la storia dei tuoi sogni e mostrala alla community
            </h3>
            <img
              src={data?.avatar}
              width={300}
              height={300}
              className="img-fluid"
            />
          </Col>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Aggiungi la tua storia!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={CreaStoriaFetch}>
                <Form.Group className="mb-3">
                  <Form.Label>Titolo</Form.Label>
                  <Form.Control
                    type="text"
                    value={titolo}
                    onChange={(e) => {
                      setTitolo(e.target.value);
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Genere</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Romance"
                    value={genere}
                    onChange={(e) => {
                      setGenere(e.target.value);
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    value={descrizione}
                    onChange={(e) => {
                      setDescrizione(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button
                  className="btn btn-primary rounded-5 pt-1 px-3"
                  type="submit"
                >
                  Save
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </Row>
      </Container>
    </>
  );
};
export default CreaStoria;
