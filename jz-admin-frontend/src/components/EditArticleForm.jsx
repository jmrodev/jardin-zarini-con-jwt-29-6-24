import React, { useState, useEffect } from 'react';

const EditArticleForm = ({ article, onClose, onSave }) => {
  const [editedArticle, setEditedArticle] = useState(article);

  useEffect(() => {
    setEditedArticle(article);
  }, [article]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await fetch(`http://localhost:3000/auth/api/articles/${editedArticle._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedArticle),
        credentials: 'include'
      });

      onSave(editedArticle);
    } catch (error) {
      console.error('Error al actualizar el artículo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={editedArticle.title}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      <textarea
        name="content"
        value={editedArticle.content}
        onChange={handleChange}
        placeholder="Contenido"
        required
      />
      <input
        type="text"
        name="category"
        value={editedArticle.category}
        onChange={handleChange}
        placeholder="Categoría"
        required
      />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
};

export default EditArticleForm;
