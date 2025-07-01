import { Row, Col, Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
function MyNavbar() {
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
            width="30"
            height="30"
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
          <Form className="d-flex ms-auto">
            <Form.Control
              type="text"
              placeholder="Cerca il tuo libro.."
              className="me-2"
            />
            <Button
              type="submit"
              className="buttonanimation"
              style={{
                background: "linear-gradient(90deg, #7f00ff, #00bfff)",
                border: "none",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem", // ~rounded-md
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              Submit
            </Button>
            <div className="mx-2">
              <Button
                className="buttonanimation"
                style={{
                  background: "linear-gradient(90deg, #7f00ff, #00bfff)",
                  border: "none",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                Login
              </Button>
            </div>
            <div className="mx-2">
              <Button
                className="buttonanimation"
                style={{
                  background: "linear-gradient(90deg, #7f00ff, #00bfff)",
                  border: "none",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                Registrazione
              </Button>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
