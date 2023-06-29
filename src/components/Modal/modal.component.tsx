import { useSelector } from "react-redux";
import { ReactNode } from "react";
import "./modal.style.component.css";
import { CartState } from "../../redux/cart/cart.reducer";
import { Card } from "../Card/card.component";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  const { products } = useSelector(
    (rootReducer: { cartReducer: CartState }) => rootReducer.cartReducer
  );

  console.log(products);

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
          </div>
        </div>
      )}
    </>
  );
}
