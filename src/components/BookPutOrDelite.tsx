import { useEffect, useState } from "react";
import { Modal, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PatchImgBook from "./PatchImgBook";

const BookPutOrDelite = () => {
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
  const [showModalModificaStoria, setShowModalModificaStoria] = useState(false);
  const handleCloseModificaStoria = () => setShowModalModificaStoria(false);
  const handleShowModificaStoria = () => setShowModalModificaStoria(true);
  const [showConfermaEliminazione, setShowConfermaEliminazione] =
    useState(false);
  const handleCloseConfermaEliminazione = () =>
    setShowConfermaEliminazione(false);
  const handleShowConfermaEliminazione = () =>
    setShowConfermaEliminazione(true);
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [data, setData] = useState<Storia | null>(null);
  const [genere, setGenere] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const listaStorie = () => {
    fetch(`http://localhost:8080/storie/${params.bookId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }
        return response.json();
      })
      .then((storie) => {
        console.log(storie);
        setData(storie);
      })
      .catch((err) => {
        console.log("errore nella fetch ", err);
      });
  };
  useEffect(() => {
    listaStorie();
  }, []);

  const modificaStoria = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { titolo, descrizione, genere, userId: data?.autore.id };
    fetch(`http://localhost:8080/storie/${params.bookId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }
        return response.json();
      })
      .then((putStoria) => {
        console.log(putStoria);
        handleCloseModificaStoria();
        listaStorie();
      })
      .catch((err) => {
        console.log("errore nella fetch ", err);
      });
  };

  const eliminaStoria = () => {
    fetch(`http://localhost:8080/storie/${params.bookId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }

        setShowSuccessAlert(true);
        setTimeout(() => {
          navigate("/ProfileDetails/" + data?.autore.id);
        }, 500);
      })
      .catch((err) => {
        console.log("errore nella fetch ", err);
      });
  };
  return (
    <>
      {showSuccessAlert && (
        <div className="alert alert-success text-center m-3" role="alert">
          Storia eliminata con successo!
        </div>
      )}
      <Container
        className=" min-vh-100 my-3 "
        style={{
          background: "#fcf9f4",
          border: "1px solid #e0dccc",
          borderRadius: "1rem",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Row className="">
          <Col className="col-12 m-0">
            <h2 className="text-center my-3 fontnuovo fs-1">
              Modifica la tua storia!
            </h2>

            <div className=" d-flex flex-column gap-4 justify-content-center">
              <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-between align-items-md-start ">
                <img
                  src={data?.immagineCopertina}
                  width={300}
                  height={300}
                  className="img-fluid "
                />
                <div className="my-2">
                  <button
                    className="btn"
                    onClick={() => {
                      if (!data) return;
                      setTitolo(data.titolo);
                      setDescrizione(data.descrizione);
                      setGenere(data.genere);
                      handleShowModificaStoria();
                    }}
                  >
                    <i className="bi bi-pencil fs-4"></i>
                  </button>
                  <Button
                    variant="danger"
                    onClick={handleShowConfermaEliminazione}
                  >
                    <i className="bi bi-trash3 fs-4"></i>
                  </Button>
                </div>
              </div>

              <div className="flex-grow-1 ">
                <h3 className="text-center fontnuovo fs-2 ">
                  Titolo: "{data?.titolo}"
                </h3>
                <p>
                  <strong>Genere:</strong> {data?.genere}
                </p>
                <p>
                  <strong>Descrizione:</strong> {data?.descrizione}
                </p>
                <div className="my-5">
                  <PatchImgBook />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={showModalModificaStoria} onHide={handleCloseModificaStoria}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica la tua storia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={modificaStoria}>
            <Form.Group className="mb-3">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                value={titolo}
                onChange={(e) => setTitolo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genere</Form.Label>
              <Form.Control
                type="text"
                value={genere}
                onChange={(e) => setGenere(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              className="btn btn-primary rounded-5 pt-1 px-3"
            >
              Salva modifiche
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showConfermaEliminazione}
        onHide={handleCloseConfermaEliminazione}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sei sicuro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            Questa azione eliminerà la storia e tutti i capitoli in modo
            permanente. Vuoi continuare?
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfermaEliminazione}>
            Annulla
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              eliminaStoria();
              handleCloseConfermaEliminazione();
            }}
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default BookPutOrDelite;
