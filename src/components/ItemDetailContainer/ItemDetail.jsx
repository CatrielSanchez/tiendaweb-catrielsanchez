import { useContext, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import ItemCount from "./ItemCount";

function ItemDetail({ id, title, stock, price, img, description }) {
  const [hasAddedProductToCart, setHasAddedProductToCart] = useState(false);
  const { addProduct, getProductQuantity } = useContext(CartContext);

  function handleOnAdd(quantity) {
    setHasAddedProductToCart(true);
    addProduct({ id, title, price, quantity, img });
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} lg={6}>
          <Image src={img} alt={title} thumbnail />
        </Col>
        <Col xs={12} lg={6}>
          <h4 className="fs-4" style={{ color: "#212529" }}>
            {title}
          </h4>
          <h5 className="fs-5" style={{ color: "#212529" }}>
            ${price} - {stock} unidades disponibles
          </h5>
          <p style={{ color: "#51585e" }}>{description}</p>
          <div className="d-flex justify-content-center mt-4">
            {hasAddedProductToCart ? (
              <Button as={Link} to="/cart" variant="warning">
                Ver el carrito
              </Button>
            ) : (
              <ItemCount
                initial={getProductQuantity(id)}
                stock={stock}
                onAdd={handleOnAdd}
                className="w-50"
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDetail;
