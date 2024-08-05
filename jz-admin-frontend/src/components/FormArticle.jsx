// // FormArticle.js
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// const FormArticle = ({ addArticle }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Realizar la solicitud POST
//     try {
//       const response = await fetch('http://localhost:3000/auth/articles', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title, content }),
//       });

//       if (!response.ok) {
//         throw new Error('Error al añadir el artículo');
//       }

//       const newArticle = await response.json();
//       addArticle(newArticle.title, newArticle.content);
//       setTitle('');
//       setContent('');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form">
//       <input
//         type="text"
//         placeholder="Título"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Contenido"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         required
//       />
//       <button type="submit">Añadir Artículo</button>
//     </form>
//   );
// };

// FormArticle.propTypes = {
//   addArticle: PropTypes.func.isRequired,
// };

// export default FormArticle;
import React, { useState } from 'react';

const FormArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Artículo añadido:', result);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error al añadir el artículo:', error);
      alert('Error al añadir el artículo. Verifica la consola para más detalles.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Contenido:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Añadir Artículo</button>
    </form>
  );
};

export default FormArticle;
