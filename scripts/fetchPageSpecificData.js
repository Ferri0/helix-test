const fetchPageSpecificData = async () => {
  if (window.location.pathname === '/product') {
    const productId = window.location.search[window.location.search.length - 1];

    window.product = await fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json());
  }
};

export default fetchPageSpecificData;
