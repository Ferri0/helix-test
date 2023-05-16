class Price {
  wrapperEl = null;

  skeletonEl = null;

  minHeight = '50px';

  constructor(block) {
    this.wrapperEl = block;
    this.wrapperEl.style.minHeight = this.minHeight;

    const skeleton = document.createElement('div');
    skeleton.innerHTML = '<div style="position: relative"><div style="position: relative; background-color: red; width: 100%; height: 50px"><h3 style="margin: 0">Loading...</h3></div></div>';
    skeleton.style.display = 'none';
    this.skeletonEl = skeleton;

    this.wrapperEl.appendChild(skeleton);
  }

  showSkeleton() {
    this.skeletonEl.style.display = 'block';
  }

  hideSkeleton() {
    this.skeletonEl.style.display = 'none';
  }

  hydrate(data) {
    this.wrapperEl.textContent = data.price;
  }
}

export default Price;
