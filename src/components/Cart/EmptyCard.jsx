import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <Container className="d-flex align-items-center  flex-column">
      <h1 className="mt-5">No hay productos en el carrito</h1>
      <Button as={Link} className="mt-3" to="/" variant="warning">
        Ir al inicio
      </Button>
    </Container>
  );
};

export default EmptyCart;
