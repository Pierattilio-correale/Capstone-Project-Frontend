import { useState } from "react";
import { Button, Modal, ModalBody, ModalTitle } from "react-bootstrap";

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

interface EliminaCommentoProps {
  commentoId: number;

  fetchCommenti: () => void;
}
const EliminaCommento = ({
  commentoId,

  fetchCommenti,
}: EliminaCommentoProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const deleteCommento = () => {
    fetch(`http://localhost:8080/commenti/${commentoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore invio commento");
      })
      .then(() => {
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
      <Button
        variant="danger"
        className="me-2"
        onClick={() => {
          handleShowModal();
        }}
      >
        <i className="bi bi-trash3"></i>
      </Button>
      <Modal show={showModal} onHide={handleHideModal}>
        {isConfirmed && (
          <div
            className="alert alert-success text-center m-3 alertdisappear"
            role="alert"
          >
            commento modificato con successo!
          </div>
        )}
        <Modal.Header closeButton>
          <Modal.Title className="fs-2">Cancella il tuo commento!</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <div>
            <h4>Sei sicuro di voler cancellare il commento?</h4>
          </div>
          <Button
            variant="danger"
            onClick={() => {
              deleteCommento();
            }}
          >
            Cancella
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};
export default EliminaCommento;
