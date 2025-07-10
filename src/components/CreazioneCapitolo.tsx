import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const CreazioneCapitolo = () => {
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
  const [titolo, setTitolo] = useState("");
  const [contenuto, setContenuto] = useState("");
  const [numeroCapitolo, setNumeroCapitolo] = useState("");
  const params = useParams();

  const postCapitolo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { titolo, contenuto, numeroCapitolo, storiaId: params.bookId };
    fetch(`http://localhost:8080/capitoli`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("errore nella promis");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        navigate("/BookDetails/" + params.bookId);
      })
      .catch((err) => {
        console.log("errore nella fetch ", err);
      });
  };
  const storiaDetails = () => {
    fetch(`http://localhost:8080/storie/${params.bookId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("errore nella promis");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log("errore nella fetch", err);
      });
  };
  useEffect(() => {
    storiaDetails();
  }, []);

  return (
    <>
      <Container className="bg-body-tertiary min-vh-100 d-flex flex-column align-items-center pt-5">
        <Form onSubmit={postCapitolo} className="w-100 px-4">
          <div className="w-50 mx-auto">
            <div className="text-center">
              <img
                src={data?.immagineCopertina}
                width={200}
                height={200}
                className="img-fluid"
              />
            </div>
            <h2 className="text-center my-3">Crea il tuo capitolo!</h2>
            <h4 className="text-center">per {data?.titolo}</h4>
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
                placeholder="1"
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
            <Button
              className="btn btn-primary rounded-5 pt-1 px-4"
              type="submit"
            >
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};
export default CreazioneCapitolo;
