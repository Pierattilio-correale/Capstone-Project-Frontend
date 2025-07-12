import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ModificaProfilo = ({
  profileId,
  onUpdate,
}: {
  profileId: string;
  onUpdate: () => void;
}) => {
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

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascita, setDataNascita] = useState("");
  const [data, setData] = useState<(User & { storie: Storia[] }) | null>(null);

  const fecthProfile = () => {
    fetch(`http://localhost:8080/users/${profileId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore nella fetch");
        return response.json();
      })
      .then((data) => {
        setData(data);
        setUsername(data.username || "");
        setEmail(data.email || "");
        setDataNascita(data.dataNascita || "");
      })
      .catch((err) => {
        console.error("Errore nella richiesta:", err);
      });
  };

  useEffect(() => {
    if (profileId) {
      fecthProfile();
    }
  }, [profileId]);

  const patchBaseUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      username,
      email,
      dataNascita,
    };

    fetch(`http://localhost:8080/users/${profileId}/base`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
        onUpdate();
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
          <Modal.Title>Modifica il tuo profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={patchBaseUser}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data di nascita</Form.Label>
              <Form.Control
                type="date"
                value={dataNascita}
                onChange={(e) => setDataNascita(e.target.value)}
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
