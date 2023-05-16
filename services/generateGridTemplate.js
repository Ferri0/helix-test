import generateId from './generateId.js';

const generateGridTemplate = (block, componentsMap) => {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'grid';

  const gridTemplate = [];
  const uniqueGridAreas = [];

  const componentInstances = [];

  [...block.children].forEach((row) => {
    const rowGridTemplateValues = [];
    [...row.children].forEach((col) => {
      const componentIdentifier = col.textContent.replace(' ', '').toLowerCase() || generateId(5);

      col.style.gridArea = componentIdentifier;
      rowGridTemplateValues.push(componentIdentifier);

      if (!uniqueGridAreas.find((el) => el === componentIdentifier)) {
        col.id = componentIdentifier;

        const Component = componentsMap[componentIdentifier];

        if (Component) {
          col.textContent = '';
          componentInstances.push(new Component(col));
        }

        wrapper.append(col);
        uniqueGridAreas.push(componentIdentifier);
      }
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

  return componentInstances;
};

export default generateGridTemplate;
