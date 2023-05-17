import generateGridTemplate from '../../services/generateGridTemplate.js';

import Gallery from './components/Gallery/Gallery.js';
import ProductTitle from './components/ProductTitle/ProductTitle.js';
import Brand from './components/Brand/Brand.js';
import Price from './components/Price/Price.js';
import Description from './components/Description/Description.js';

class Product {
  componentsMap = {
    gallery: Gallery,
    producttitle: ProductTitle,
    productbrand: Brand,
    productprice: Price,
    productdescription: Description,
  };

  componentInstances = [];

  data = null;

  productId = null;

  constructor(block) {
    this.componentInstances = generateGridTemplate(block, this.componentsMap);
    this.productId = window.location.search[window.location.search.length - 1];
  }

  showSkeletons() {
    this.componentInstances.forEach((Component) => Component.showSkeleton());
  }

  hideSkeletons() {
    this.componentInstances.forEach((Component) => Component.hideSkeleton());
  }

  async fetchData() {
    this.data = await fetch(`https://dummyjson.com/products/${this.productId}`)
      .then((res) => res.json());

    // GraphQL version
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

    const data = await fetch('https://mage-demo.atwix.dev/graphql', options)
      .then((res) => res.json()).catch((error) => console.log(error));

    console.log(data);
  }

  hydrateComponents() {
    this.componentInstances.forEach((Component) => Component.hydrate(this.data));
  }
}

export default Product;
