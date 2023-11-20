function ProductCard({ product }) {
  return (
    <div
      key={product.id}
      className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform	 hover:-translate-y-6"
    >
      <img
        className="w-full h-48 object-contain object-center"
        src={product.image}
        alt={product.title}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        <p className="text-gray-500 my-1">${product.price}</p>
        <button className="mt-2 py-2 w-full bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
