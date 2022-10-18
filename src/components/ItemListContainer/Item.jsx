import { Button, Card, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function Item({ title, price, img, id }) {
  return (
    <Card className="shadow-sm">
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="text-center">
          <Image src={img} style={{ height: "175px" }} />
        </ListGroup.Item>
      </ListGroup>

      <Card.Body>
        <Card.Title
          className="fs-6"
          style={{ color: "#51585e", marginBottom: 0 }}
        >
          {title}
        </Card.Title>
        <div className="d-flex align-items-center justify-content-between">
          <strong>${price}</strong>
          <Button as={Link} to={`/detail/${id}`}>
            Ver mas
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Item;
