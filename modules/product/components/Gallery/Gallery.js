class Gallery {
  wrapperEl = null;

  skeletonEl = null;

  minHeight = '300px';

  constructor(block) {
    this.wrapperEl = block;
    this.wrapperEl.style.minHeight = this.minHeight;

    const skeleton = document.createElement('div');
    skeleton.innerHTML = '<div style="position: relative"><div style="position: relative; background-color: red; width: 100%; height: 300px"><h3 style="margin: 0">Loading...</h3></div></div>';
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
    const imagesWrapper = document.createElement('div');
    imagesWrapper.style.margin = '0 50px 30px';
    imagesWrapper.style.display = 'flex';
    imagesWrapper.style.flexDirection = 'row';
    imagesWrapper.style.maxWidth = '750px';
    imagesWrapper.style.overflow = 'hidden';

    data.images.forEach((imageSrc) => {
      const imgEl = document.createElement('img');
      imgEl.src = imageSrc;
      imgEl.style.width = '250px';
      imagesWrapper.append(imgEl);
    });

    this.wrapperEl.append(imagesWrapper);
  }
}

export default Gallery;
