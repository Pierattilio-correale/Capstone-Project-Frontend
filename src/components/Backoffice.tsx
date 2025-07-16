import { Col, Container, ListGroupItem, Row } from "react-bootstrap";
import Stat from "./Stat";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Backoffice = () => {
  const [data, setData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchProfile = () => {
    fetch(`http://localhost:8080/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore nella fetch");
        return response.json();
      })
      .then((data: User[]) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.error("Errore nella richiesta:", err);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const filteredData = data.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container
      className="min-vh-100"
      style={{
        background: "#fcf9f4",
        border: "1px solid #e0dccc",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h1 className="text-center fontTikTok">
        Statistiche Backoffice <span className="coloreJ">J</span>wel
        <span className="colorep">P</span>aper
      </h1>

      <Row className="my-2">
        <Col>
          <h2 className="my-4 fontnuovo fs-1">
            Lista di utenti <span className="coloreJ">J</span>wel
            <span className="colorep">P</span>aper
          </h2>
          <input
            type="text"
            placeholder="Cerca utente..."
            className="form-control mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              background: "#fff",
            }}
          >
            {filteredData.map((user) => (
              <ListGroupItem
                key={user.id}
                className="p-3"
                onClick={() => {
                  navigate("/ProfileDetails/" + user.id);
                }}
              >
                <strong>{user.username}</strong> - {user.email}
              </ListGroupItem>
            ))}
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Stat mode="globali" />
        </Col>
      </Row>
    </Container>
  );
};

export default Backoffice;
