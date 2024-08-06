import React, { useState } from 'react';

const FormArticle = ({ onArticleAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await fetch('http://localhost:3000/auth/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setTitle('');
      setContent('');
      setIsSuccess(true);
      setMessage('Artículo añadido con éxito');
      onArticleAdded(result); // Notifica al padre sobre el nuevo artículo
    } catch (error) {
      setMessage(`Error al añadir el artículo. Detalles: ${error.message}`);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Añadir artículo</h2>
      <label htmlFor="title">Título:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="content">Contenido:</label>
      <textarea
        id="content"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Añadir artículo</button>
      {message && <p className={isSuccess ? 'success' : 'error'}>{message}</p>}
    </form>
  );
};

export default FormArticle;
