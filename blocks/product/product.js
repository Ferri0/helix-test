export default async function decorate(block) {
  const productId = window.location.search[window.location.search.length - 1];

  window.product = await fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json());

  const wrapper = document.createElement('div');
  wrapper.style.display = 'grid';

  const gridTemplate = [];

  [...block.children].forEach((row) => {
    const rowGridTemplateValues = [];
    [...row.children].forEach((col) => {
      const formattedTextContent = col.textContent.replace(' ', '').toLowerCase();

      col.style.gridArea = formattedTextContent;
      rowGridTemplateValues.push(formattedTextContent);

      if (formattedTextContent === 'producttitle') {
        col.textContent = `Title: ${window.product.title}`;
      } else if (formattedTextContent === 'productprice') {
        col.textContent = `Price: ${window.product.price}`;
      } else if (formattedTextContent === 'productbrand') {
        col.textContent = `Brand: ${window.product.brand}`;
      } else if (formattedTextContent === 'productdescription') {
        col.textContent = `Description: ${window.product.description}`;
      } else if (formattedTextContent === 'gallery') {
        col.textContent = '';
        col.style.maxWidth = '300px';
        window.product.images.forEach((imageSrc) => {
          const imgEl = document.createElement('img');
          imgEl.src = imageSrc;
          imgEl.style.width = '150px';
          col.append(imgEl);
        });
      }

      wrapper.append(col);
    });
    gridTemplate.push(rowGridTemplateValues);
  });

  let gridTemplateString = '';

  gridTemplate.forEach((rowValues) => {
    const string = rowValues.reduce((acc, val) => `${acc} ${val}`, '');
    const preparedString = `"${string}"`;
    gridTemplateString += preparedString;
  });

  wrapper.style.gridTemplate = gridTemplateString;

  block.innerHTML = '';
  block.append(wrapper);
}
