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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
        console.error('Error al obtener los artículos:', error);
        setError(error.message);
      }
    };

    fetchArticles();
  }, []);

  const handleCreate = async (article) => {
    console.log('Creando artículo:', article);

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
      console.error('Error al crear el artículo:', error);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    console.log('Eliminando artículo con id:', id);

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
      console.error('Error al eliminar el artículo:', error);
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
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
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

  <button onClick={openCreateModal}>Crear Nuevo Artículo</button>

  <div className="articles-list">
    {filteredArticles.map((article) => (
      <div key={article._id} className="article-card">
        <h3>{article.title}</h3>
        <p>{article.content}</p>
        <p><strong>Categoría:</strong> {article.category}</p>
        {allowChanges && (
          <div className="article-actions">
            <button onClick={() => openModal(article)}>Editar</button>
            <button onClick={() => handleDelete(article._id)}>Eliminar</button>
          </div>
        )}
      </div>
    ))}
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

  {isCreateModalOpen && (
    <div className="modal-overlay">
      <div className="modal-content">
        <CreateArticleForm
          onCreate={(newArticle) => {
            handleCreate(newArticle);
            closeCreateModal();
          }}
          onClose={closeCreateModal}
        />
      </div>
    </div>
  )}
</div>

  );
};

export default ArticlesList;
