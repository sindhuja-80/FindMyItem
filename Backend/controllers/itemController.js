import Item from "../models/Item.js";

export const addItem = async (req, res) => {
try {
    const { itemName, description, date, location, category, tags, type } = req.body;
    const newItem = new Item({
  itemName,
  description,
  date,
  location,
  category,
  tags: tags ? tags.split(",") : [],
  type,
  image: req.file ? req.file.filename : ""
});
const savedItem = await newItem.save();
res.status(201).json({
  message: "Item added successfully",
  item: savedItem
});


} catch (error) {
res.status(500).json({
message: "Error adding item",
error: error.message
});
}
};

export const getItems = async (req, res) => {
try {

const items = await Item.find().sort({ createdAt: -1 });

res.status(200).json(items);


} catch (error) {

res.status(500).json({
  message: "Error fetching items",
  error: error.message
});


}
};
export const getItemsByCategory = async (req, res) => {
try {


const { category } = req.params;

const items = await Item.find({ category });

res.status(200).json(items);


} catch (error) {


res.status(500).json({
  message: "Error fetching category items",
  error: error.message
});

}
};

export const getItemsByTag = async (req, res) => {
try {


const { tag } = req.params;

const items = await Item.find({
  tags: { $in: [tag] }
});

res.status(200).json(items);

} catch (error) {


res.status(500).json({
  message: "Error fetching tag items",
  error: error.message
});


}
};
export const getItemById = async (req, res) => {
  try {

    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching item",
      error: error.message
    });

  }
};