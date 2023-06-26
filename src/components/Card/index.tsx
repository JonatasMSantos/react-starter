import { Pessoa } from "../../types/pessoa";
import "./style.css";

//export function Card({ name, time }: Props) {
export function Card(props: Pessoa) {
  return (
    <div className="card">
      <strong>{props.name}</strong>
      <small>{props.time}</small>
    </div>
  );
}
