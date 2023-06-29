import { useSelector } from "react-redux";
import { ReactNode } from "react";
import "./modal.style.component.css";

import { Card } from "../Card/card.component";
import {
  CartState,
  selectProductsTotalPrice,
} from "../../redux/with-toolkit/cart.slice";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  const { products } = useSelector(
    (rootReducer: { cartReducer: CartState }) => rootReducer.cartReducer
  );

  const productsTotalPrice: number = useSelector(selectProductsTotalPrice);

  console.log("AQUI", products);

  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <div className="children-value">
              {props.children}
              <hr />
            </div>

            {products ? (
              products.map((p) => <Card key={p.id} product={p} />)
            ) : (
              <></>
            )}

            <hr />
            <p>Total: {productsTotalPrice}</p>
          </div>
        </div>
      )}
    </>
  );
}
