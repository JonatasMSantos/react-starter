import { useSelector } from "react-redux";
import "./header.style.component.css";

import { User } from "../../types/user";
import {
  selectProductsCount,
  selectProductsTotalPrice,
} from "../../redux/with-toolkit/cart.slice";
import { UserState } from "../../redux/with-toolkit/user.slice";

export type HeaderItems = {
  className?: string;
  title: string;
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  handleCartClick: () => void;
};

//export function Card({ name, time }: Props) {
export function Header(props: HeaderItems) {
  const { title, onLogin, onLogout, handleCartClick, className } = props;

  const { currentUser } = useSelector(
    (rootReducer: { userReducer: UserState }) => rootReducer.userReducer
  );

  const productsCount = useSelector(selectProductsCount);
  const productsTotalPrice = useSelector(selectProductsTotalPrice);

  return (
    <>
      <header>
        {currentUser ? (
          <div>
            <strong>{currentUser.name}</strong>
            <span onClick={onLogout}>| Sair</span>
            <img src={currentUser.avatar} alt="Foto de Perfil" />
          </div>
        ) : (
          <div onClick={onLogin}>Login</div>
        )}
        <p onClick={handleCartClick}>
          Cart ({productsCount}) | Total: {productsTotalPrice}
        </p>
      </header>
      <h1 className={className}>{title}</h1>
    </>
  );
}
