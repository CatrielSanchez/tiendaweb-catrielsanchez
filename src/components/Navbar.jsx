import { Container, Nav, Navbar as BNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartWidget from "./Cart/CartWidget";

function Navbar() {
  const { getCartQuantity } = useCart();

  return (
    <>
      <BNavbar bg="dark" variant="dark">
        <Container>
          <BNavbar.Brand as={Link} to="/">
            Tienda Funko
          </BNavbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/category/marvel">
              Marvel
            </Nav.Link>
            <Nav.Link as={Link} to="/category/simpsons">
              Simpsons
            </Nav.Link>
            <Nav.Link as={Link} to="/category/dbz">
              Dragon Ball
            </Nav.Link>
          </Nav>
          {getCartQuantity() && <CartWidget />}
        </Container>
      </BNavbar>
    </>
  );
}

export default Navbar;
