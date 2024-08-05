// Article.js
import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ title, content, index }) => (
  <article>
    <h2 className="main__title">{title} {index + 1}</h2>
    <p className="main__content">{content} {index + 1}</p>
  </article>
);

Article.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Article;
