import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Modal,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Alert,
} from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: number;
  nome: string;
  cognome: string;
  username: string;
  email: string;
  dataNascita: string;
  avatar: string;
  role: string;
}

interface JwtPayload {
  sub: string;
  exp?: number;
  iat?: number;
}
interface MyNavbarProps {
  handleCloseLogin: () => void;
  handleCloseRegister: () => void;
  handleShowRegister: () => void;
  handleShowLogin: () => void;
  showLogin: boolean;
  showRegister: boolean;
}

function MyNavbar({
  handleCloseLogin,
  handleCloseRegister,
  handleShowRegister,
  handleShowLogin,
  showLogin,
  showRegister,
}: MyNavbarProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [dataNascita, setDataNascita] = useState("");
  const [data, setData] = useState<User | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded?.sub) {
          setIsLoggedIn(true);
          utenteLoggato();
        }
      } catch (err) {
        console.error("Token non valido:", err);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  }, []);

  const registerPagina = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { nome, cognome, dataNascita, email, username, password };

    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Registrazione fallita");
        return res.json();
      })
      .then((data) => {
        console.log("Registrazione avvenuta:", data);
        handleCloseRegister();
        setIsError(false);
        setIsSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
        setIsSuccess(false);
      });
  };

  const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub;
    } catch (err) {
      console.error("Errore nel decodificare il token:", err);
      return null;
    }
  };

  const utenteLoggato = () => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    fetch(`http://localhost:8080/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore nella fetch");
        return response.json();
      })
      .then((data) => {
        console.log("Dati utente loggato:", data);
        setData(data);
      })
      .catch((err) => {
        console.error("Errore nella richiesta:", err);
      });
  };

  const loginPagina = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { username, password, email };

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore nella fetch");
        return response.text();
      })
      .then((token) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded?.sub) {
          localStorage.setItem("userId", decoded.sub);
        }
        setIsLoggedIn(true);
        handleCloseLogin();
        utenteLoggato();
        navigate("/home");
        setIsError(false);
      })
      .catch((err) => {
        console.error("Errore nella promise:", err);
        setIsError(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setShowUserDropdown(false);
    setData(null);
    navigate("/");
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
  };
  useEffect(() => {
    if (isError || isSuccess) {
      const timer = setTimeout(() => {
        setIsError(false);
        setIsSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError, isSuccess]);

  return (
    <Navbar
      className=" sticky-top"
      expand="lg"
      style={{ background: "linear-gradient(90deg, #7f00ff, #00bfff)" }}
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to={isLoggedIn ? "/home" : "/"}>
          <img
            src="/assets/logojpp.png"
            width={30}
            height={30}
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Brand as={Link} to={isLoggedIn ? "/home" : "/"}>
          JewelPaper Books
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={isLoggedIn ? "/home" : "/"} className="nav-link">
              Home
            </Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Per te" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-block d-lg-flex ms-0 ms-lg-5  ms-xl-auto align-items-center">
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Cerca il tuo libro.."
                className="me-2 my-3 my-lg-0"
              />
              <div>
                <Button className="buttonanimation me-0 my-3 my-lg-0 me-lg-3">
                  <i className="bi bi-search"></i>
                </Button>
              </div>
            </div>

            {!isLoggedIn ? (
              <>
                <div className="d-block d-lg-flex">
                  <Button
                    className="buttonanimation me-2"
                    onClick={handleShowLogin}
                  >
                    Login
                  </Button>
                  <Button
                    className="buttonanimation"
                    onClick={handleShowRegister}
                  >
                    Registrazione
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex">
                  <NavDropdown
                    className="mx-2"
                    title={
                      <img
                        src={data?.avatar}
                        width={40}
                        height={40}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                        alt="User"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleUserDropdown();
                        }}
                      />
                    }
                    id="user-nav-dropdown"
                    show={showUserDropdown}
                    onToggle={() => {}}
                  >
                    <h4 className="mx-2">Ciao, {data?.username}</h4>
                    <Link
                      to={`/ProfileDetails/${data?.id}`}
                      className="dropdown-item"
                    >
                      Mio profilo
                    </Link>
                    <NavDropdown.Item href="#action/3.2">
                      Crea Storia
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Statistiche
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Altro
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Button
                    className="buttonanimation ms-2 ms-lg-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>

      <Modal
        show={showLogin}
        onHide={handleCloseLogin}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Inserisci le tue credenziali per accedere.</h5>
          <Form onSubmit={loginPagina}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="mariorossi22"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {isError && (
              <Alert variant="danger" className="alertdisappear">
                Password, email o username non corretto
              </Alert>
            )}{" "}
            <Button variant="primary" type="submit">
              Accedi
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setIsError(false);
              handleCloseLogin();
            }}
          >
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRegister}
        onHide={handleCloseRegister}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Benvenuto in JewelBook!
            <br />
            Crea il tuo account inserendo le informazioni richieste.
          </h6>
          <Form onSubmit={registerPagina}>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mario"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCognome">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rossi"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDataNascita">
              <Form.Label>Data di nascita</Form.Label>
              <Form.Control
                type="date"
                value={dataNascita}
                onChange={(e) => setDataNascita(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="mariorossi22"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Registrati
            </Button>
            {isError && (
              <Alert variant="danger" className="alertdisappear">
                username o email già presente nel sistema
              </Alert>
            )}{" "}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
      {isSuccess && (
        <Alert variant="success" className="alertdisappear">
          registrazione effettuata con successo
        </Alert>
      )}
    </Navbar>
  );
}

export default MyNavbar;
