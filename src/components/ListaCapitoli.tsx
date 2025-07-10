import { useEffect, useState } from "react";
import {
  Col,
  Container,
  ListGroupItem,
  Row,
  ListGroup,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

interface Capitoli {
  id: number;
  titolo: string;
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

const ListaCapitoli = () => {
  const navigate = useNavigate();
  const params = useParams();
  const loggedUserId = localStorage.getItem("userId");
  const isOwner = loggedUserId === params.profileId;

  const [data, setData] = useState<Storia | null>(null);

  const listaCapitoli = () => {
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
    listaCapitoli();
  }, []);

  return (
    <>
      <Container className="m-0 ">
        <Row>
          <Col>
            <h4 className="text-center my-3 fs-3">
              {isOwner ? "i tuoi capitoli" : "i suoi capitoli"}
            </h4>
            {isOwner && (
              <>
                <div className="d-flex justify-content-between align-items-center my-2">
                  <a
                    onClick={() => {
                      navigate(
                        "/BookDetails/" + data?.id + "/CapitoliDetails/Creation"
                      );
                    }}
                    className="ms-2 mb-0 text-primary border-0 text-decoration-none fs-4"
                  >
                    AGGIUNGI CAPITOLI
                  </a>
                  <Button
                    variant="dark"
                    onClick={() => {
                      navigate(
                        "/BookDetails/" + data?.id + "/CapitoliDetails/Creation"
                      );
                    }}
                  >
                    +
                  </Button>
                </div>
              </>
            )}

            <ListGroup>
              {data?.capitoli
                .sort((a, b) => a.numeroCapitolo - b.numeroCapitolo)
                .map((capitolo) => (
                  <div className="d-flex" key={capitolo.id}>
                    <ListGroupItem
                      className="w-100"
                      onClick={() => {
                        navigate("/CapitoloDetails/" + capitolo.id);
                      }}
                    >
                      <strong>
                        {capitolo.numeroCapitolo}. {capitolo.titolo}
                      </strong>
                      <br />
                    </ListGroupItem>
                    <button
                      className="btn fs-4 p-0 mx-2"
                      onClick={() => {
                        navigate(
                          "/ProfileDetails/" +
                            params.profileId +
                            "/BookDetails/" +
                            params.bookId +
                            "/ModificaCapitolo/" +
                            capitolo.id
                        );
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ListaCapitoli;
