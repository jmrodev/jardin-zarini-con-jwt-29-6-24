import React, { useEffect, useState } from 'react';

const ChildrenList = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch('/mis-hijos');
        const data = await response.json();
        if (response.ok) {
          setChildren(data);
        } else {
          console.error('Failed to fetch children');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchChildren();
  }, []);

  return (
    <div>
      <h2>Mis Hijos</h2>
      <ul>
        {children.map((child) => (
          <li key={child.id}>{child.name} - {child.classRoom}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChildrenList;
