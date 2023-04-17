export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.style.background = 'red';
    row.classList.add('multi-column-row');
  });
}
