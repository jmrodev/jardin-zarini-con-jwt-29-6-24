import React, { useEffect, useState } from 'react';
import EditArticleForm from './EditArticleForm.jsx'; // Asegúrate de tener un componente de formulario similar para los artículos
import './ArticlesList.css'; // Importa el CSS para el modal

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la selección de categoría
  const [allowChanges, setAllowChanges] = useState(false); // Estado para permitir cambios

  useEffect(() => {
    const fetchArticles = async () => {
      console.log('Iniciando la solicitud de artículos...');

      try {
        const token = localStorage.getItem('authToken'); // Obtén el token de localStorage

        if (!token) {
          console.error('No se encontró el token de autenticación');
          return;
        }

        const response = await fetch('http://localhost:3000/auth/api/articles', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera Authorization
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        console.log('Respuesta recibida:', response);

        if (response.ok) {
          console.log('Artículos obtenidos correctamente');
          const data = await response.json();
          console.log('Datos de artículos:', data);
          setArticles(data);
        } else {
          const errorData = await response.json();
          console.error('Error en la respuesta:', errorData);
          setError(errorData.error || 'Error al obtener los artículos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setError('Error al obtener los artículos');
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    console.log('Eliminando artículo con id:', id);

    try {
      const token = localStorage.getItem('authToken'); // Obtén el token de localStorage

      if (!token) {
        console.error('No se encontró el token de autenticación');
        return;
      }

      const response = await fetch(`http://localhost:3000/auth/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera Authorization
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      console.log('Respuesta de eliminación:', response);

      if (response.ok) {
        console.log('Artículo eliminado con éxito');
        setArticles(articles.filter(article => article._id !== id));
      } else {
        const errorData = await response.json();
        console.error('Error al eliminar:', errorData);
        setError(errorData.error || 'Error al eliminar el artículo');
      }
    } catch (error) {
      console.error('Error en la solicitud de eliminación:', error);
      setError('Error al eliminar el artículo');
    }
  };

  const openModal = (article) => {
    console.log('Abriendo modal para artículo:', article);
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Cerrando modal');
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleCategoryChange = (event) => {
    console.log('Categoría seleccionada:', event.target.value);
    setSelectedCategory(event.target.value);
  };

  // Filtrar artículos por categoría seleccionada
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

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Contenido</th>
            <th>Categoría</th>
            {allowChanges && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((article) => (
            <tr key={article._id}>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.category}</td>
              {allowChanges && (
                <td>
                  <button onClick={() => openModal(article)}>Editar</button>
                  <button onClick={() => handleDelete(article._id)}>Eliminar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

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
