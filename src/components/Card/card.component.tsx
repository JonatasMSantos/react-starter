import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProduct,
} from "../../redux/with-toolkit/cart.slice";
import { Product } from "../../types/product";
import "./cardstyle.component.css";
import { useDispatch } from "react-redux";

import { CgClose } from "react-icons/cg";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

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
      <div className="title">
        {product.name} Qt| : {product.quantity} | Price: {product.price}
      </div>
      <div className="buttons-section">
        <button className="action-item" onClick={handleRemoveClick}>
          <CgClose />
        </button>
        <button className="action-item" onClick={handleDecreaseClick}>
          <AiOutlineMinus />
        </button>
        <button className="action-item" onClick={handleIncreaseClick}>
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}
