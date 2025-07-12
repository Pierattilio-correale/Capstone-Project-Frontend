import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ModificaProfilo = () => {
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

  const [showModal, setShowModal] = useState(false);
  const { profileId } = useParams<{ profileId: string }>();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [descrizioneUser, setDescrizioneUser] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascita, setDataNascita] = useState("");
  const [password, setPassword] = useState("");

  const putProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      username,
      nome,
      cognome,
      email,
      dataNascita,
      descrizione: descrizioneUser,
      id: profileId,
      password,
    };

    fetch(`http://localhost:8080/user/${profileId}`, {
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
      .then((data) => {
        console.log("Profilo aggiornato:", data);
        handleClose();
      })
      .catch((err) => {
        console.error("Errore nella fetch:", err);
      });
  };

  return (
    <>
      <Button
        variant="outline-primary"
        className="rounded-pill"
        onClick={handleShow}
      >
        Modifica Profilo
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica il tuo profilo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={putProfile}>
            <Form.Group className="mb-3" controlId="descrizioneForm">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={descrizioneUser}
                onChange={(e) => setDescrizioneUser(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn btn-primary rounded-5 pt-1 px-3"
            >
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModificaProfilo;
