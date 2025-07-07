import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FormGroup,
  FormLabel,
  Form,
  Modal,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const tagliaDescrizione = (
  descrizione: string,
  maxLength: number = 200
): string => {
  if (!descrizione) return "";
  if (descrizione.length <= maxLength) return descrizione;

  const fine = descrizione.lastIndexOf(" ", maxLength);
  const taglio =
    fine > 0 ? descrizione.slice(0, fine) : descrizione.slice(0, maxLength);
  return taglio + "...";
};

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleCloseUser = () => setShowModalUser(false);
  const handleShowUser = () => setShowModalUser(true);

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
    dataCreazione: string;
    immagineCopertina: string;
    autore: User;
  }
  const params = useParams();

  const [data, setData] = useState<(User & { storie: Storia[] }) | null>(null);
  const [postStoria, setPostStoria] = useState<{ storie: Storia[] } | null>(
    null
  );
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [descrizioneUser, setDescrizioneUser] = useState("");
  const [genere, setGenere] = useState("");

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

  const CreaStoria = (e: React.FormEvent<HTMLFormElement>) => {
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
        fecthProfile();
      })
      .catch((err) => {
        console.log("errore nella fetch ", err);
      });
  };

  const modificaDescrizione = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { descrizione: descrizioneUser };
    fetch(`http://localhost:8080/users/${params.profileId}/descrizione`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }
        return response.json();
      })
      .then((patchDescrizione) => {
        console.log(patchDescrizione);
        handleCloseUser();
        setDescrizioneUser("");
        fecthProfile();
      })
      .catch((err) => {
        console.log("errore nella fetch ", err);
      });
  };

  return (
    <>
      <Container className="my-4 ">
        <Row className="d-flex justify-content-center">
          <Col className="col-12  ">
            <div className="bg-white shadow-sm mb-4  rounded w-responsive">
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img
                  src={data?.avatar}
                  alt="cover"
                  className="w-100 h-100 object-fit-cover opacity-50"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div
                className="px-4 pt-0 pb-4 position-relative"
                style={{ marginTop: "-50px" }}
              >
                <div className="d-flex align-items-end">
                  <img
                    src={data?.avatar}
                    alt="Profile"
                    className="rounded-circle border border-3 border-white"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="ms-3 mt-3">
                    <h4 className="mb-1">
                      {data?.username}
                      <i className="bi bi-patch-check-fill text-primary"></i>
                    </h4>
                    <p className="text-primary fw-semibold mb-0">
                      {Math.floor(Math.random() * 100) + 20} letture
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  <Button variant="outline-primary" className="rounded-pill">
                    Crea Storia
                  </Button>
                  <Button variant="outline-primary" className="rounded-pill">
                    Migliora profilo
                  </Button>
                  <Button variant="outline-secondary" className="rounded-pill">
                    Altro
                  </Button>
                </div>
                <div className="d-block d-lg-flex  mt-4  gap-3 align-items-start ">
                  <div className="p-2 border rounded bg-light w-100">
                    <h3>Descrizione</h3>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{data?.username}</strong>
                      </div>

                      <div className="d-flex">
                        <button className="btn fs-4" onClick={handleShowUser}>
                          <i className="bi bi-pencil"></i>
                        </button>
                      </div>
                    </div>
                    <div className="text-break">
                      <p>{data?.descrizione}</p>
                    </div>
                  </div>
                  <Modal show={showModalUser} onHide={handleCloseUser}>
                    <Modal.Header closeButton>
                      <Modal.Title>modifica la tua descrizione!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={modificaDescrizione}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Descrizione</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={10}
                            value={descrizioneUser}
                            onChange={(e) => {
                              setDescrizioneUser(e.target.value);
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
                  <div className="p-3 border rounded  my-5 my-lg-0 minima ">
                    <h3 className="mb-3">Le tue Storie</h3>
                    <div
                      className="d-flex justify-content-between mb-5 text-primary align-items-center"
                      onClick={handleShow}
                    >
                      Aggiungi nuova storia
                      <div>
                        <Button
                          variant="link"
                          className="text-dark p-0"
                          onClick={handleShow}
                        >
                          <i className="bi bi-plus-lg fs-3"></i>
                        </Button>
                      </div>
                    </div>
                    <Modal show={showModal} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Aggiungi la tua storia!</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={CreaStoria}>
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
                    {data?.storie?.map((storie) => (
                      <Col className="col-12 my-3" key={storie.id}>
                        <div className="d-flex justify-content-between">
                          <h5 className="d-md-none">{storie.titolo}</h5>
                          <button className="d-md-none btn fs-4 p-0">
                            <i className="bi bi-pencil"></i>
                          </button>
                        </div>

                        <div className="d-block d-md-flex">
                          <img
                            className="img-fluid"
                            src={storie.immagineCopertina}
                            width={100}
                            height={100}
                          />

                          <div className="ms-0 ms-md-3 my-2 my-md-0 d-flex flex-column flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start w-100">
                              <h5 className="d-none d-md-block mb-0">
                                {storie.titolo}
                              </h5>
                              <button className="d-none d-md-block btn fs-4 p-0">
                                <i className="bi bi-pencil"></i>
                              </button>
                            </div>

                            {storie.descrizione ? (
                              <p className="mt-2 mb-1">
                                {tagliaDescrizione(storie.descrizione)}
                              </p>
                            ) : (
                              <div
                                className="mt-2"
                                style={{ minHeight: "1.5rem" }}
                              ></div>
                            )}
                            <div className="mt-auto ">
                              <Button variant="dark">Leggi</Button>{" "}
                              <Button variant="dark">Aggiungi Capitoli</Button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProfileDetails;
