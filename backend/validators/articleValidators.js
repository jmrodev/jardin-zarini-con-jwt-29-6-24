export default function ArticleValidation(data) {
    console.log(data);
  const errors = []

  if (!data.title || typeof data.title !== 'string') {
    errors.push('Invalid title: The title is required and must be a string.')
  }
  if (!data.content || typeof data.content !== 'string') {
    errors.push(
      'Invalid content: The content is required and must be a string.'
    )
  }
  if (!data.author || typeof data.author !== 'string') {
    errors.push('Invalid author: The author is required and must be a string.')
  }
  if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.push(
      'Invalid date format: The date is required and must be in the format YYYY-MM-DD.'
    )
  }

  if (errors.length > 0) {
    return { isValid: false, messages: errors }
  }

  return {
    isValid: true,
    message: 'Article validation successful. The article data is valid.',
  }
}
