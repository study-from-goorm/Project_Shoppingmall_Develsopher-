import React, { useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import ProductCard from './ProductCard.jsx';
import Category from './Category.jsx';

function ProductList() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setDisplayedProducts(data);
      });
  }, []);

  const handleSelectedCategory = (category) => {
    if (category === 'all') {
      setDisplayedProducts(allProducts);
    } else {
      setDisplayedProducts(
        allProducts.filter((product) => product.category === category),
      );
    }
  };

  return (
    <>
      <Header />
      <main className="p-4 space-y-6">
        <h2 className="text-3xl text-center font-semibold">Products</h2>

        <Category handleSelectedCategory={handleSelectedCategory} />
        <p className="text-gray-600">
          showing: <span>{displayedProducts.length}</span> items
        </p>
        {displayedProducts && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default ProductList;
