import { useForm } from "react-hook-form";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useCart } from "../../contexts/CartContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Checkout = () => {
  const { cart, getTotalPrice, clear } = useCart();
  const [orderId, setOrderId] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (form) => {
    const order = {
      buyer: {
        ...form,
      },
      total: getTotalPrice(),
      items: cart,
    };

    const db = getFirestore();
    const query = collection(db, "orders");

    return addDoc(query, order).then((resp) => {
      setOrderId(resp.id);
      clear();
    });
  };

  if (isSubmitSuccessful) {
    return (
      <Container className="mt-3 d-flex flex-column justify-content-center align-items-center">
        <h4 className="fs-4" style={{ color: "#212529" }}>
          Orden generada correctamente: {orderId}
        </h4>
        <Button as={Link} to="/" variant="warning">
          Ir a inicio.
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
              isInvalid={errors.name}
            />
            <Form.Control.Feedback type="invalid">
              Este campo es obligatorio
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              isInvalid={errors.lastname}
              {...register("lastname", { required: true })}
            />
            <Form.Control.Feedback type="invalid">
              Este campo es obligatorio
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              isInvalid={errors.email}
              {...register("email", {
                pattern: EMAIL_REGEX,
                required: true,
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.type === "required" && "Este campo es obligatorio"}
              {errors.email?.type === "pattern" && "Formato invalido"}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Numero de tarjeta</Form.Label>
            <Form.Control
              type="number"
              isInvalid={errors.creditCard}
              {...register("creditCard", { required: true })}
            />
            <Form.Control.Feedback type="invalid">
              Este campo es obligatorio
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando informacion ..." : "Confirmar orden"}
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
