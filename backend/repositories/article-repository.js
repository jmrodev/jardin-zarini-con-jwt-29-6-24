import ArticleSchema from '../models/articleSchema.js'
import crypto from 'crypto'

export default class ArticleRepository {
  static async createArticleRepository(articleData) {
    const id = crypto.randomUUID()
    const article = await ArticleSchema.create({
      _id: id,
      ...articleData,
    }).save()

    console.log(article);
    return await article
  }

  static async getArticlesRepository() {
    try {
      return await ArticleSchema.find()
    }
    catch (error) {
      throw new Error('Error getting articles')
    }
    
  }

  static async getArticleByIdRepository(id) {
    const article = await Article.findOne({ _id: id })
    if (!article) {
      throw new Error('Article not found')
    }
    return article
  }

  static async updateArticleRepository(id, updateData) {
    const article = await ArticleSchema.findOne({ _id: id })

    if (Object.keys(updateData).length === 0) {
      throw new Error('No update data provided')
    }

    Object.assign(article, updateData)
    return await article.save()
  }

  static async deleteArticleRepository(id) {
    const article = await Article.findOne({ _id: id })
    if (!article) {
      throw new Error('Article not found')
    }
    return await article.remove()
  }
}