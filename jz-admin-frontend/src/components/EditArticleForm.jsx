import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditArticleForm = ({ article, onClose, onSave }) => {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [category, setCategory] = useState(article.category);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedArticle = {
      ...article,
      title,
      content,
      category,
    };

    try {
      const response = await fetch(`http://localhost:3000/auth/api/articles/${article._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedArticle),
      });

      if (response.ok) {
        const data = await response.json();
        onSave(data);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="edit-article-form">
      <h3>Editar Artículo</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Contenido:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Categoría:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

EditArticleForm.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditArticleForm;
