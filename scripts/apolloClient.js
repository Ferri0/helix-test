const getProductsQuery = (keyword, pageSize = 5) => `{
  products(search: "${keyword}", pageSize: ${pageSize}) {
    total_count
    items {
      name
      sku
      price_range {
        minimum_price {
          regular_price {
            value
            currency
          }
        }
      }
    }
    page_info {
      page_size
      current_page
    }
  }
}`;

const options = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: getProductsQuery('yoga'),
  }),
};

fetch('https://hotel.atwix.dev:30000/graphql', options)
  .then((res) => res.json())
  .then(console.log).catch((error) => console.error(error));
