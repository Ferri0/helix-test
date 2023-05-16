// import getCellConfig from '../../services/getCellConfig.js';
import Product from '../../modules/product/Product.js';

export default async function decorate(block) {
  const productModule = new Product(block);

  productModule.showSkeletons();
  productModule.fetchData().then(() => {
    productModule.hydrateComponents();
    productModule.hideSkeletons();
  });
}
