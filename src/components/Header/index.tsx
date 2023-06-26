import { useSelector } from "react-redux";
import { HeaderItems } from "../../types/menu";
import "./style.css";
import { User } from "../../types/user";

type UserState = {
  currentUser: User | null; // substitua "User" pelo tipo correto do usuário
};

//export function Card({ name, time }: Props) {
export function Header(props: HeaderItems) {
  const { title, onLogin, onLogout } = props;

  const { currentUser } = useSelector(
    (rootReducer: { userReducer: UserState }) => rootReducer.userReducer
  );

  console.log({ currentUser });

  return (
    <>
      <header>
        <p>React</p>
        {currentUser ? (
          <div>
            <strong>{currentUser.name}</strong>
            <span onClick={onLogout}>| Sair</span>
            <img src={currentUser.avatar} alt="Foto de Perfil" />
          </div>
        ) : (
          <div onClick={onLogin}>Login</div>
        )}
      </header>
      <h1>{title}</h1>
    </>
  );
}
