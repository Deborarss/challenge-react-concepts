import React, { useEffect, useState, useCallback } from 'react';

import "./styles.css";

import api from 'services/api';

const App = () => {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  const handleAddSubmit = useCallback(async () => {
    const response = await api.post('repositories', {
        title: 'Learn Typescript',
        url: "none",
        techs: "Typescript",
      });

      const repository = response.data;
      setRepositories([...repositories, repository]);
  }, [repositories]);

  const handleRemoveRepository = useCallback(async id => {
    await api.delete(`repositories/${id}`, {})  
    
    setRepositories(repositories.filter(repository => repository.id !== id ));
    
  }, [repositories]);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>)} 
      </ul>
      <button onClick={handleAddSubmit}>Adicionar</button>
    </div>
  )
}

export default App;