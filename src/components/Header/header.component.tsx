import { useSelector } from "react-redux";
import "./header.style.component.css";
import { UserState } from "../../redux/user/user.reducer";
import { User } from "../../types/user";
import {
  selectProductsCount,
  selectProductsTotalPrice,
} from "../../redux/cart/cart.reducer";

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

  // const { products } = useSelector(
  //   (rootReducer: { cartReducer: CartState }) => rootReducer.cartReducer
  // );

  // const productsCount = useMemo(() => {
  //   return products.reduce((acc, curr) => acc + curr.quantity, 0);
  // }, [products]);

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
