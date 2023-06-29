import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProduct,
} from "../../redux/with-toolkit/cart.slice";
import { Product } from "../../types/product";
import "./cardstyle.component.css";
import { useDispatch } from "react-redux";

//export function Card({ name, time }: Props) {
export function Card(props: { product: Product }) {
  const { product } = props;

  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeProduct({ name: product.name }));
  };

  const handleIncreaseClick = () => {
    dispatch(increaseProductQuantity({ name: product.name }));
  };

  const handleDecreaseClick = () => {
    dispatch(decreaseProductQuantity({ name: product.name }));
  };

  return (
    <div className="card">
      <strong>
        {product.name} Qt| : {product.quantity} | Price: {product.price}
      </strong>
      <small>
        <span className="action-item" onClick={handleRemoveClick}>
          🗑️
        </span>
        <span className="action-item" onClick={handleDecreaseClick}>
          ➖
        </span>
        <span className="action-item" onClick={handleIncreaseClick}>
          ➕
        </span>
      </small>
    </div>
  );
}
