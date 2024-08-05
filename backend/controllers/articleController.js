import ArticleRepository from '../repositories/article-repository.js';
import ArticleValidation from '../validators/articleValidators.js';

// Crear un nuevo artículo
export const createArticleController = async (req, res) => {
  const articleData = req.body;
  const validationErrors = ArticleValidation.validateArticleData(articleData);
  
  if (!validationErrors.isValid) {
    return res.status(400).json({ error: validationErrors.messages });
  }

  try {
    const newArticle = await ArticleRepository.createArticleRepository(articleData);
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
  const { articleId } = req.params;

  try {
    const article = await ArticleRepository.getArticleByIdRepository(articleId);
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
  const { articleId } = req.params;
  const updateData = req.body;

  try {
    const updatedArticle = await ArticleRepository.updateArticleRepository(articleId, updateData);
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
  const { articleId } = req.params;

  try {
    const deletedArticle = await ArticleRepository.deleteArticleRepository(articleId);
    if (!deletedArticle) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }
    res.status(204).end(); // No content
  } catch (error) {
    console.error('Error en deleteArticleController:', error);
    res.status(500).json({ error: 'Error al eliminar el artículo' });
  }
};
