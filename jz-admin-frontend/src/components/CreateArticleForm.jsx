import React, { useState } from 'react';
import './CreateArticleForm.css';

const CreateArticleForm = ({ onCreate, onClose }) => {
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    category: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validación simple
    if (!newArticle.title || !newArticle.content || !newArticle.category) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      await onCreate(newArticle);
      // Limpiar el formulario después de crear
      setNewArticle({ title: '', content: '', category: '' });
      setError(null);
      // Cerrar el modal después de crear
      onClose();
    } catch (error) {
      setError('Error al crear el artículo.');
    }
  };

  return (
    <form className='article-form' onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        name="title"
        value={newArticle.title}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      <textarea
        name="content"
        value={newArticle.content}
        onChange={handleChange}
        placeholder="Contenido"
        required
      />
      <input
        type="text"
        name="category"
        value={newArticle.category}
        onChange={handleChange}
        placeholder="Categoría"
        required
      />
      <button type="submit">Crear Artículo</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
};

export default CreateArticleForm;
