export const validation = (products) => {
  let errors = {};

  if (!products.name || !products.name.trim()) {
    errors.name = "Product name is required";
  }

  if (!products.description || !products.description.trim()) {
    errors.description = "Description is required";
  }

  if (!products.price) {
    errors.price = "Price is required";
  }

  return errors;
};
