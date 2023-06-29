import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "../../components/Card/card.component";
import { Header } from "../../components/Header/header.component";
import Modal from "../../components/Modal/modal.component";
import useModal from "../../hooks/useModal";
import { loginUser, logoutUser } from "../../redux/user/user.reducer";
import LoginService from "../../services/login.api";
import { ProductService } from "../../services/product.api";
import { Product } from "../../types/product";
import "./home.page.styles.css";
import { addProductToCart } from "../../redux/cart/cart.reducer";

export function Home() {
  const [name, setName] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useDispatch();

  const handleLoginClick = async () => {
    const loggedUser = await new LoginService().signin();
    dispatch(loginUser(loggedUser));
  };

  const handleLogoutClick = async () => {
    dispatch(logoutUser());
  };

  const handleAddProduct = async () => {
    const newProduct: Product = await new ProductService().newProduct(name);
    setProducts((prevState) => [...prevState, newProduct]);

    dispatch(addProductToCart(newProduct));
  };

  const { isOpen, toggle } = useModal();

  return (
    <div className="container">
      <Header
        className="header-title"
        title="Produtos"
        onLogout={handleLogoutClick}
        onLogin={handleLoginClick}
        handleCartClick={toggle}
      ></Header>

      <input
        type="text"
        placeholder="Digite o nome"
        onChange={(e) => setName(e.target.value)}
      />

      <button type="button" onClick={handleAddProduct}>
        Adicionar
      </button>

      <hr />

      <Modal isOpen={isOpen} toggle={toggle}>
        <h1>Produtos</h1>
      </Modal>

      {products ? (
        <div className="history">
          <h4>Histórico</h4>
          {products.map((p: Product) => (
            <Card key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}