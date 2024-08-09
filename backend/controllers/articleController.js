import ArticleRepository from '../repositories/article-repository.js';
import validateArticleData from '../validators/articleValidators.js'; // Asegúrate de que la importación sea correcta

// Crear un nuevo artículo
export const createArticleController = async (req, res) => {
  const articleData = req.body;
  // const validationErrors = validateArticleData(articleData);

  // console.log("validationErrors",validationErrors);
  // if (!validationErrors.isValid) {
  //   return res.status(400).json({ error: validationErrors.messages });
  // }

  try {
    const author = req.user.username; // Obtener el autor del usuario autenticado
    const newArticle = await ArticleRepository.createArticleRepository(articleData, author);
    console.log("newArticle",newArticle);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error en createArticleController:', error);
    res.status(500).json({ error: 'Error al crear el artículo' });
  }
};

// Obtener todos los artículos
export const getAllArticlesController = async (req, res) => {
  try {
    const articles = await ArticleRepository.getArticlesRepository();
    res.json(articles);
  } catch (error) {
    console.error('Error en getAllArticlesController:', error);
    res.status(500).json({ error: 'Error al obtener los artículos' });
  }
};

// Obtener un artículo por ID
export const getArticleByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await ArticleRepository.getArticleByIdRepository(id);
    if (!article) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error en getArticleByIdController:', error);
    res.status(500).json({ error: 'Error al obtener el artículo' });
  }
};

// Actualizar un artículo por ID
export const updateArticleController = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedArticle = await ArticleRepository.updateArticleRepository(id, updateData);
    if (!updatedArticle) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }
    res.json(updatedArticle);
  } catch (error) {
    console.error('Error en updateArticleController:', error);
    res.status(500).json({ error: 'Error al actualizar el artículo' });
  }
};

// Eliminar un artículo por ID
export const deleteArticleController = async (req, res) => {
  console.log("deleteArticleController",req.params);
  const { id } = req.params;

  try {
    const deletedArticle = await ArticleRepository.deleteArticleRepository(id);
    if (!deletedArticle) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }
    res.json(deletedArticle)// No content
  } catch (error) {
    console.error('Error en deleteArticleController:', error);
    res.status(500).json({ error: 'Error al eliminar el artículo' });
  }
};