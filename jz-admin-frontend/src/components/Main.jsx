// Main.js
import React, { useState, useEffect } from 'react';
import '../styles/Main.css';
import Article from './Article';
import FormArticle from './FormArticle';

const Main = () => {
  const [articles, setArticles] = useState([]);

  // Función para obtener artículos del servidor
  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/api/articles');
      if (!response.ok) {
        console.log(response);
        throw new Error('Error al obtener los artículos');
      }
      const data = await response.json();
      console.log(data);
      setArticles(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const addArticle = (title, content) => {
    setArticles((prevArticles) => [...prevArticles, { title, content }]);
  };

  return (
    <main className="main">
      <FormArticle addArticle={addArticle} />
      {articles.map((article, i) => (
        <Article key={i} title={article.title} content={article.content} index={i} />
      ))}
    </main>
  );
}

export default Main;
