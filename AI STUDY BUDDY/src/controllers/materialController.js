const Material = require('../models/Material');

exports.uploadMaterial = async (req, res) => {
  try {
    const { title, subject, content } = req.body;
    const material = await Material.create({
      userId: req.user.id,
      title,
      subject,
      content,
    });
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyMaterials = async (req, res) => {
  const materials = await Material.find({ userId: req.user.id });
  res.json(materials);
};