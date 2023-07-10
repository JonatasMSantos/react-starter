import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "../../components/Card/card.component";
import { Header } from "../../components/Header/header.component";
import Modal from "../../components/Modal/modal.component";
import useModal from "../../hooks/useModal";
import LoginService from "../../services/login.api";
import { ProductService } from "../../services/product.api";
import { Product } from "../../types/product";
import "./home.page.styles.css";
import { login, logout } from "../../redux/with-toolkit/user.slice";
import { addProduct } from "../../redux/with-toolkit/cart.slice";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [name, setName] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLoginClick = async () => {
    const loggedUser = await new LoginService().signin();
    dispatch(login(loggedUser));
  };

  const handleLogoutClick = async () => {
    dispatch(logout());
  };

  const handleAddProduct = async () => {
    const newProduct: Product = await new ProductService().newProduct(name);
    setProducts((prevState) => [...prevState, newProduct]);

    dispatch(addProduct(newProduct));
  };

  const handleGoToTask = () => {
    navigate("/tasks");
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

      <p onClick={handleGoToTask}>Tasks</p>

      <input
        type="text"
        placeholder="Digite o nome"
        onChange={(e) => setName(e.target.value)}
      />

      <button className="button-itens" type="button" onClick={handleAddProduct}>
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
