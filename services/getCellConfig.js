const getCellConfig = (blockName) => {
  let config = null;

  const configElement = document.querySelector(`meta[name*="${blockName}-config"]`);

  if (configElement) {
    try {
      const configString = configElement.content;
      const validJSONStr = configString.replace(/({|})/g, '').replace(/(\w+)/g, '"$1"');

      config = JSON.parse(`{${validJSONStr}}`);
    } catch (error) {
      console.error('Error occurred in getBlockConfig => ', error);
    }
  }

  return config;
};

export default getCellConfig;
