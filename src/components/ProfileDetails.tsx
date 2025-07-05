import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FormGroup,
  FormLabel,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProfileDetails = () => {
  interface User {
    id: number;
    nome: string;
    cognome: string;
    username: string;
    email: string;
    dataNascita: string;
    avatar: string;
  }
  const params = useParams();
  console.log(params);
  const [data, setData] = useState<any>(null);

  const fecthProfile = () => {
    fetch(`http://localhost:8080/users/${params.profileId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore nella fetch");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.error("Errore nella richiesta:", err);
      });
  };
  useEffect(() => {
    if (params.profileId) {
      fecthProfile();
    }
  }, [params.profileId]);

  return (
    <>
      <Container className="my-4">
        <Row className="d-flex justify-content-center">
          <Col className="col-11">
            <div className="bg-white shadow-sm mb-4  rounded w-responsive">
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img
                  src={data?.avatar}
                  alt="cover"
                  className="w-100 h-100 object-fit-cover opacity-50"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div
                className="px-4 pt-0 pb-4 position-relative"
                style={{ marginTop: "-50px" }}
              >
                <div className="d-flex align-items-end">
                  <img
                    src={data?.avatar}
                    alt="Profile"
                    className="rounded-circle border border-3 border-white"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="ms-3 mt-3">
                    <h4 className="mb-1">
                      {data?.username}
                      <i className="bi bi-patch-check-fill text-primary"></i>
                    </h4>
                    <p className="text-primary fw-semibold mb-0">
                      {Math.floor(Math.random() * 100) + 20} letture
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  <Button variant="outline-primary" className="rounded-pill">
                    Crea Storia
                  </Button>
                  <Button variant="outline-primary" className="rounded-pill">
                    Migliora profilo
                  </Button>
                  <Button variant="outline-secondary" className="rounded-pill">
                    Altro
                  </Button>
                </div>
                <div className="d-flex mt-4 flex-wrap gap-3 ">
                  <div className="flex-grow-1 flex-basis-0 p-2 border rounded bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{data?.username}</strong>
                      </div>

                      <div className="d-flex">
                        <button className="btn fs-4">
                          <i className="bi bi-pencil"></i>
                        </button>
                      </div>
                    </div>
                    <div>ciao</div>
                  </div>

                  <div className="flex-grow-1 flex-basis-0 p-3 border rounded bg-light ">
                    <p className="mb-1 small"></p>
                    <a href="#" className="text-primary small"></a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProfileDetails;
