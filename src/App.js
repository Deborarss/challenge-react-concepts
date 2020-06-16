import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      console.log(res);
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: "Backend com NodeJS",
      url: "someURl",
      techs: "NodeJS"
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`, {});

    setRepositories(repositories.filter(repository => repository.id !== id ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id} >{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button> </li>) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
