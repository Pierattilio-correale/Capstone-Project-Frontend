import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

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

const CancellaProfilo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const deleteUser = () => {
    fetch(`http://localhost:8080/users/${params.profileId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }
      })
      .then((data) => {
        console.log(data);
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((err) => {
        console.log("errore nella fetch ", err);
        setSuccess(false);
      });
  };
  return (
    <>
      <Button
        variant="outline-danger"
        className="rounded-pill"
        onClick={handleShow}
      >
        Cancella profilo
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancella il profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success && (
            <div className="alert alert-success text-center m-3" role="alert">
              Profilo cancellato con successo!
            </div>
          )}
          <h4 className="my">Sei sicuro di voler cancellare il profilo?</h4>
          <div className="my-3 text-center">
            <Button
              variant="danger"
              className="rounded-pill"
              onClick={deleteUser}
            >
              Cancella profilo
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CancellaProfilo;
