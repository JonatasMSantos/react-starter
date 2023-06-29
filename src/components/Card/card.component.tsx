import {
  decreaseProductFromCart,
  increaseProductFromCart,
  removeProductFromCart,
} from "../../redux/cart/cart.reducer";
import { Product } from "../../types/product";
import "./cardstyle.component.css";
import { useDispatch } from "react-redux";

//export function Card({ name, time }: Props) {
export function Card(props: { product: Product }) {
  const { product } = props;

  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeProductFromCart({ name: product.name }));
  };

  const handleIncreaseClick = () => {
    dispatch(increaseProductFromCart({ name: product.name }));
  };

  const handleDecreaseClick = () => {
    dispatch(decreaseProductFromCart({ name: product.name }));
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
