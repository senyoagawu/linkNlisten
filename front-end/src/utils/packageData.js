export default (data) => {
  const formData = new FormData();
  for (let field in data) {
    formData.append(field, data[field]);
  }
  return formData;
};
