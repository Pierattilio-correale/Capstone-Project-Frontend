import { useEffect, useState } from "react";
import { Container, Form, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModificaCommento from "./ModificaCommento";
import EliminaCommento from "./EliminaCommento";

const SezioneCommenti = () => {
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

  const params = useParams();
  const navigate = useNavigate();
  const capitoloId = params.capitoloId;
  const userId = localStorage.getItem("userId");
  const [contenuto, setContenuto] = useState("");
  const [showCommentoInviato, setShowCommentoInviato] = useState(false);
  const [voto, setVoto] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  const [data, setData] = useState<Commenti[]>([]);

  const fetchCommenti = () => {
    fetch(`http://localhost:8080/commenti/capitolo/${capitoloId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("errore nella fetch");
        return response.json();
      })
      .then((data: Commenti[]) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log("errore nella promis ", err);
      });
  };
  useEffect(() => {
    fetchCommenti();
  }, [capitoloId]);

  const inviaCommento = (e: React.FormEvent) => {
    e.preventDefault();
    const nuovoCommento = {
      contenuto,
      voto,
      capitoloId: capitoloId,
      userId: userId,
    };
    fetch("http://localhost:8080/commenti", {
      method: "POST",
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
        setTimeout(
          () => {
            setShowCommentoInviato(true);
          },
          500,
          setShowCommentoInviato(false)
        );

        fetchCommenti();
      })
      .catch((err) => {
        console.error("Errore invio:", err);
      });
  };

  return (
    <>
      <Container
        className="bg-body-tertiary my-3"
        style={{
          background: "#fcf9f4",
          border: "1px solid #e0dccc",
          borderRadius: "1rem",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Form onSubmit={inviaCommento}>
          <h3 className="mb-2">Commenti</h3>
          {showCommentoInviato && (
            <div
              className="alert alert-success text-center m-3 alertdisappear"
              role="alert"
            >
              Commento inviato con successo!
            </div>
          )}
          <div className="d-flex justify-content-between my-3">
            <h5>Dai un voto da 1 a 5 a questo capitolo</h5>
            <Form.Select
              aria-label="Default select example"
              className="w-25 "
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Scrivi un commento..."
              value={contenuto}
              onChange={(e) => setContenuto(e.target.value)}
            />
          </Form.Group>

          <Button className="mb-4 buttonanimation" type="submit">
            Invia commento!
          </Button>
        </Form>
      </Container>
      <Container
        className="bg-body-tertiary"
        style={{
          background: "#fcf9f4",
          border: "1px solid #e0dccc",
          borderRadius: "1rem",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
          minHeight: "50vh",
        }}
      >
        <h3 className="text-center ">Lista Commenti </h3>
        {data.map((commento) => (
          <div key={commento.id} className="border p-3 my-2 rounded">
            <div className="d-flex justify-content-between">
              <div>
                <img
                  src={commento.autore.avatar}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                />

                <strong className="ms-3">{commento.autore.username}</strong>
              </div>{" "}
              <div className="d-flex align-items-center">
                {Number(userId) === commento.autore.id && (
                  <>
                    <ModificaCommento
                      commentoId={commento.id}
                      capitoloId={commento.capitolo.id}
                      fetchCommenti={fetchCommenti}
                      commento={commento}
                    />
                    <EliminaCommento
                      commentoId={commento.id}
                      fetchCommenti={fetchCommenti}
                    />
                  </>
                )}

                <Dropdown>
                  <Dropdown.Toggle variant="secondary">
                    <i className="bi bi-three-dots-vertical"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to={`/ProfileDetails/${commento.autore.id}`}
                    >
                      Visualizza profilo
                    </Dropdown.Item>
                    <Dropdown.Item>Segnala commento</Dropdown.Item>
                    <Dropdown.Item>Blocca utente</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="mt-2">
              ha votato <strong>{commento.voto}/5 ☆</strong>
              <p className="mt-2">{commento.contenuto}</p>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};
export default SezioneCommenti;
