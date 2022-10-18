import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { getAllProducts } from "../../services/product.service";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getAllProducts(categoryId) //
      .then((products) => {
        setProducts(products);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  return (
    <div>
      <h1>{greeting}</h1>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" className="m-5" />
        </div>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;
