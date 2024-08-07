import React, { useEffect, useState } from 'react';
import EditArticleForm from './EditArticleForm.jsx';
import CreateArticleForm from './CreateArticleForm.jsx';
import './ArticlesList.css';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allowChanges, setAllowChanges] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch('http://localhost:3000/auth/api/articles', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al obtener los artículos');
        }

        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticles();
  }, []);

  const handleCreate = async (article) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }

      const response = await fetch('http://localhost:3000/auth/api/articles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear el artículo');
      }

      const newArticle = await response.json();
      setArticles((prevArticles) => [...prevArticles, newArticle]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }

      const response = await fetch(`http://localhost:3000/auth/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el artículo');
      }

      setArticles((prevArticles) => prevArticles.filter(article => article._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const openModal = (article) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category === selectedCategory)
    : articles;

  return (
    <div>
      <h2>Lista de Artículos</h2>
      {error && <p className="error">{error}</p>}
      
      <div>
        <label htmlFor="categorySelect">Filtrar por Categoría:</label>
        <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todos</option>
          {[...new Set(articles.map(article => article.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>
          Permitir cambios:
          <input
            type="checkbox"
            checked={allowChanges}
            onChange={() => setAllowChanges(!allowChanges)}
          />
        </label>
      </div>

      <CreateArticleForm onCreate={handleCreate} />

      <div className="articles-list">
        {filteredArticles.length === 0 ? (
          <p>No hay artículos disponibles.</p>
        ) : (
          filteredArticles.map((article) => (
            <div key={article._id} className="article-card">
              <h3>{article.title}</h3>
              <p><strong>Contenido:</strong> {article.content || 'Contenido no disponible'}</p>
              <p><strong>Categoría:</strong> {article.category || 'Categoría no disponible'}</p>
              <p><strong>Fecha:</strong> {article.date}</p>
              <p><strong>Autor:</strong> {article.author}</p>
              {allowChanges && (
                <div className="article-actions">
                  <button onClick={() => openModal(article)}>Editar</button>
                  <button onClick={() => handleDelete(article._id)}>Eliminar</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && editingArticle && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditArticleForm
              article={editingArticle}
              onClose={closeModal}
              onSave={(updatedArticle) => {
                setArticles(articles.map(article =>
                  article._id === updatedArticle._id ? updatedArticle : article
                ));
                closeModal();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
