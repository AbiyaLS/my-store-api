const sampleProducts = [
  {
    id: 1,
    name: "Apple",
    price: 100,
  },
  { id: 2, name: "Orange", price: 200 },
];

export async function addProduct(req, res) {
  try {
    const userId = req.userId;
    const { name, price } = req.body;

    // creating a new product and saving it to db
    const product = await Product.create({ name, price, userId });
    res.status(201).json({ product });
  } catch (error) {}
}

export async function getProducts(req, res) {
  console.log("req.myUserId", req.myUserId);

  try {
    // fetching products from db of user id  myUserId
    res.status(200).json({ products: sampleProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
