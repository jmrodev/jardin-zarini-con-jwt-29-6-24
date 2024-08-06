import ArticleSchema from '../models/articleSchema.js'
import crypto from 'crypto'
import { format, parse } from '@formkit/tempo'

export default class ArticleRepository {
  static async createArticleRepository(articleData, author) {
    const id = crypto.randomUUID()
    const date = format(new Date(), "DD-MM-YYYY");
    console.log(date);
    try {
      const article = await ArticleSchema.create({
        _id: id,
        ...articleData,
        date: date,
        author: author || 'Unknown',
      }).save
      console.log('Artículo creado:', article)
      return await article
    } catch (error) {
      console.error('Error al crear artículo:', error)
      throw new Error('Error al crear el artículo')
    }
  }

  static async getArticlesRepository() {
    try {
      return await ArticleSchema.find()
    } catch (error) {
      console.error('Error al obtener artículos:', error)
      throw new Error('Error al obtener los artículos')
    }
  }

  static async getArticleByIdRepository(id) {
    console.log('ID:', id)
    try {
      const article = await ArticleSchema.findOne({ _id: id })
      if (!article) {
        throw new Error('Artículo no encontrado')
      }
      return article
    } catch (error) {
      console.error('Error al obtener artículo:', error)
      throw error
    }
  }
  static async updateArticleRepository(id, updateData) {
    try {
      const article = await ArticleSchema.findOne({ _id: id })
      if (!article) {
        throw new Error('Artículo no encontrado')
      }

      if (Object.keys(updateData).length === 0) {
        throw new Error('No se proporcionaron datos de actualización')
      }

      Object.assign(article, updateData)
      return await article.save()
    } catch (error) {
      console.error('Error al actualizar artículo:', error)
      throw error
    }
  }

  static async deleteArticleRepository(id) {
    console.log('delete ID:', id)
    const article = await this.getArticleByIdRepository(id)
    ArticleSchema.remove({ _id: id })
    return { message: `Article ${article} deleted successfully` }
  }
}
