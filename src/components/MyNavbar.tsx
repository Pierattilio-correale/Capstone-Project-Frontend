import React, { useState } from "react";
import {
  Form,
  Button,
  Modal,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

function MyNavbar() {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // NUOVO: stato per dropdown show
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const loginPagina = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      username,
      password,
      email,
    };

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((token) => {
        console.log("Token ricevuto:", token);
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setShowLogin(false);
      })
      .catch((err) => {
        console.error("Errore nella promise:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowUserDropdown(false); // chiudo dropdown logout
  };

  // toggle dropdown al click immagine
  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
  };

  return (
    <Navbar
      expand="lg"
      style={{ background: "linear-gradient(90deg, #7f00ff, #00bfff)" }}
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/assets/logojpp.png"
            width={30}
            height={30}
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Brand href="#home">JewelPaper Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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

          <Form className="d-flex ms-5 ms-xl-auto align-items-center">
            <Form.Control
              type="text"
              placeholder="Cerca il tuo libro.."
              className="me-2"
            />

            <Button className="buttonanimation me-3">Submit</Button>

            {!isLoggedIn ? (
              <>
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
              </>
            ) : (
              <>
                <NavDropdown
                  className="mx-2"
                  title={
                    <img
                      src="/assets/logojpp.png"
                      width={40}
                      height={40}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleUserDropdown();
                      }}
                      alt="User"
                    />
                  }
                  id="user-nav-dropdown"
                  show={showUserDropdown}
                  onToggle={() => {}}
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <Button className="buttonanimation" onClick={handleLogout}>
                  Logout
                </Button>
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
            <Button variant="primary" type="submit">
              Accedi
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
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
          Crea il tuo account inserendo le informazioni richieste.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Chiudi
          </Button>
          <Button variant="primary">Registrati</Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default MyNavbar;
