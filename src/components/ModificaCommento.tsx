import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface Capitoli {
  id: number;
  titolo: string;
  contenuto: string;
  numeroCapitolo: number;
  storia: Storia;
}

interface Commenti {
  id: number;
  contenuto: string;
  voto: number;
  autore: User;
  capitolo: Capitoli;
}

interface Storia {
  id: number;
  titolo: string;
  descrizione: string;
  genere: string;
  dataCreazione: string;
  immagineCopertina: string;
  autore: User;
  capitoli: Capitoli[];
}

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

interface ModificaCommentoProps {
  commentoId: number;
  capitoloId: number;
  commento: Commenti;
  fetchCommenti: () => void;
}

const ModificaCommento = ({
  commentoId,
  capitoloId,
  commento,
  fetchCommenti,
}: ModificaCommentoProps) => {
  const userId = localStorage.getItem("userId");

  const [voto, setVoto] = useState(1);
  const [contenuto, setContenuto] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (commento) {
      setContenuto(commento.contenuto);
      setVoto(commento.voto);
    }
  }, [commento]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const putCommento = (e: React.FormEvent) => {
    e.preventDefault();

    if (contenuto.trim() === "") {
      alert("Il contenuto del commento non può essere vuoto.");
      return;
    }

    const nuovoCommento = {
      contenuto,
      voto,
      capitoloId,
      userId,
    };

    fetch(`http://localhost:8080/commenti/${commentoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(nuovoCommento),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore invio commento");
        return response.json();
      })
      .then(() => {
        setContenuto("");
        setVoto(1);
        setIsConfirmed(true);
        setTimeout(() => {
          setIsConfirmed(false);
        }, 500);

        setTimeout(() => {
          handleHideModal();
          fetchCommenti();
        }, 500);
      })
      .catch((err) => {
        console.error("Errore invio:", err);
      });
  };

  return (
    <>
      <button className="me-1 fs-3 btn" onClick={handleShowModal}>
        <i className="bi bi-pencil"></i>
      </button>

      <Modal show={showModal} onHide={handleHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica il tuo commento</Modal.Title>
        </Modal.Header>
        {isConfirmed && (
          <div
            className="alert alert-success text-center m-3 alertdisappear"
            role="alert"
          >
            commento modificato con successo!
          </div>
        )}
        <Form onSubmit={putCommento} className="mx-3">
          <div className="d-flex justify-content-between my-3">
            <h5>Dai un voto da 1 a 5</h5>
            <Form.Select
              aria-label="Seleziona un voto"
              className="w-25"
              value={voto}
              onChange={(e) => setVoto(Number(e.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </div>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Scrivi un commento..."
              value={contenuto}
              onChange={(e) => setContenuto(e.target.value)}
            />
          </Form.Group>

          <Button className="mb-4 buttonanimation" type="submit">
            Salva modifiche
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ModificaCommento;
