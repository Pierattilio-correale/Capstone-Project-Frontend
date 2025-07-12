import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CancellaCapitolo from "./CancellaCapitolo";

const ModificaCapitolo = () => {
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

  const navigate = useNavigate();
  const [data, setData] = useState<Storia | null>(null);
  const [dataCapitolo, setDataCapitolo] = useState<Capitoli | null>(null);
  const [titolo, setTitolo] = useState("");
  const [contenuto, setContenuto] = useState("");
  const [numeroCapitolo, setNumeroCapitolo] = useState("");
  const params = useParams();
  const [showConfermaModifica, setShowConfermaModifica] = useState(false);

  const fetchCapitoloDetails = () => {
    fetch(`http://localhost:8080/capitoli/${params.capitoloId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella fetch del capitolo");
        }
        return response.json();
      })
      .then((capitolo: Capitoli) => {
        setDataCapitolo(capitolo);
        setTitolo(capitolo.titolo);
        setContenuto(capitolo.contenuto);
        setNumeroCapitolo(capitolo.numeroCapitolo.toString());
        setData(capitolo.storia);
      })
      .catch((err) => {
        console.error("Errore nel fetch:", err);
      });
  };

  useEffect(() => {
    fetchCapitoloDetails();
  }, []);

  const putCapitolo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      id: dataCapitolo?.id,
      titolo,
      contenuto,
      numeroCapitolo: parseInt(numeroCapitolo),
      storiaId: data?.id,
    };

    fetch(`http://localhost:8080/capitoli/${dataCapitolo?.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella PUT");
        }
        return response.json();
      })
      .then((updatedCapitolo) => {
        console.log("Capitolo aggiornato:", updatedCapitolo);
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
    <Container
      className=" min-vh-100 d-flex flex-column align-items-center pt-5"
      style={{
        background: "#fcf9f4",
        border: "1px solid #e0dccc",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      {showConfermaModifica && (
        <div className="alert alert-success text-center m-3" role="alert">
          Capitolo modificato con successo!
        </div>
      )}
      <Form onSubmit={putCapitolo} className="w-100 px-4">
        <div className="w-50 mx-auto">
          <h2 className="text-center my-3">Modifica il tuo capitolo!</h2>

          <Form.Group className="mb-3">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              required
              value={titolo}
              onChange={(e) => setTitolo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Numero Capitolo</Form.Label>
            <Form.Control
              type="number"
              required
              value={numeroCapitolo}
              onChange={(e) => setNumeroCapitolo(e.target.value)}
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Contenuto</Form.Label>
          <Form.Control
            as="textarea"
            rows={25}
            className="w-100"
            style={{ fontSize: "1.1rem", padding: "1rem" }}
            value={contenuto}
            onChange={(e) => setContenuto(e.target.value)}
          />
        </Form.Group>

        <div className="text-center my-3">
          <Button className="btn btn-primary rounded-5 pt-1 px-4" type="submit">
            Salva
          </Button>
          <CancellaCapitolo />
        </div>
      </Form>
    </Container>
  );
};

export default ModificaCapitolo;
