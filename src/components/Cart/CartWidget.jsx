import { Container, Row, Col } from "react-bootstrap";
import { BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const CartWidget = () => {
  const { getCartQuantity } = useCart();

  return (
    <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
      <Container>
        <Row className="align-items-center">
          <Col>
            <BsCartFill size="1.5em" />
          </Col>
          <Col>{getCartQuantity()}</Col>
        </Row>
      </Container>
    </Link>
  );
};

export default CartWidget;
