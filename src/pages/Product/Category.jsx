import { useState } from 'react';
import config from '../../config.js';

function Category({ handleSelectedCategory }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const handleCategory = (id) => {
    handleSelectedCategory(id);
    setSelectedCategory(id);
  };
  return (
    <ul className="flex justify-center gap-4">
      {config.productCategory.map((category) => (
        <li key={category.id} className="list-none">
          <button
            className={`px-4 py-2 border border-gray-300 rounded focus:outline-none  ${
              selectedCategory === category.id
                ? 'bg-gray-600 text-white'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleCategory(category.id)}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Category;
