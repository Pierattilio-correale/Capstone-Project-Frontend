import { useState } from "react";
import { FormGroup, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const PatchImgBook = () => {
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

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const params = useParams();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageUpload = () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage);
    setUploading(true);

    fetch(`http://localhost:8080/storie/${params.bookId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella richiesta");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Immagine di copertina aggiornata :", data);
        setUploading(false);
        setSelectedImage(null);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Errore nel caricamento immagine:", err);
        setUploading(false);
      });
  };
  return (
    <>
      <div className="mt-3 w-25">
        <Form.Group controlId="formFile" className="mb-2">
          <Form.Label>
            <strong>Carica una nuova immagine profilo</strong>
          </Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </Form.Group>
        <Button
          variant="outline-primary"
          className="rounded-pill"
          onClick={handleImageUpload}
          disabled={uploading || !selectedImage}
        >
          {uploading ? "Caricamento..." : "Carica"}
        </Button>
      </div>
    </>
  );
};
export default PatchImgBook;
