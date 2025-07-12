import { useState } from "react";
import { Button, Modal, FormControl, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const CancellaCapitolo = () => {
  interface Capitoli {
    id: number;
    titolo: string;
    descrizione: string;
    contenuto: string;
    numeroCapitolo: number;
    storia: Storia;
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

  const [showModalCancellaCapitolo, setShowModalCancellaCapitolo] =
    useState(false);
  const handleCloseCancellaCapitolo = () => setShowModalCancellaCapitolo(false);
  const handleShowCancellaCapitolo = () => setShowModalCancellaCapitolo(true);
  const [showConfermaModifica, setShowConfermaModifica] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const deleteCapitolo = () => {
    fetch(`http://localhost:8080/capitoli/${params.capitoloId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nell DELETE");
        }
      })
      .then((deleteCapitolo) => {
        console.log("Capitolo cancellato:", deleteCapitolo);
        setTimeout(() => {
          navigate(
            "/Profile/" + params.profileId + "/BookDetails/" + params.bookId
          );
        }, 500);

        setShowConfermaModifica(true);
      })
      .catch((err) => {
        console.error("Errore nella PUT:", err);
      });
  };

  return (
    <>
      <Button
        className="btn btn-danger rounded-5 pt-1 px-4"
        type="button"
        onClick={handleShowCancellaCapitolo}
      >
        Cancella Capitolo
      </Button>
      <Modal
        show={showModalCancellaCapitolo}
        onHide={handleCloseCancellaCapitolo}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancella la tua storia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showConfermaModifica && (
            <div className="alert alert-success text-center m-3" role="alert">
              Capitolo cancellato con successo!
            </div>
          )}
          <h4>Sei sicuro di voler cancellare il capitolo?</h4>
          <Button
            onClick={deleteCapitolo}
            className="btn btn-primary rounded-5 pt-1 px-3"
            variant="danger"
          >
            cancella il capitolo
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CancellaCapitolo;
