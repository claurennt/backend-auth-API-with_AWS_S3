const createImageCustomObject = (image) => {
  const [{ location, fieldname }] = image;
  const picObject = { location, fieldname };
  return picObject;
};

export default createImageCustomObject;
