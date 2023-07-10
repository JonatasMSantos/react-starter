import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fechTasks = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.cypress.io/todos?_limit=10"
      );

      setTasks(data);
    };

    fechTasks();
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  console.log(params);

  return (
    <>
      <div onClick={handleBackClick}>Voltar</div>

      {tasks ? tasks.map((t: Task) => <p key={t.id}>{t.title}</p>) : ""}
    </>
  );
}

export default Tasks;
