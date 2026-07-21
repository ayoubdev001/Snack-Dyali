const validatePlat = (req, res, next) => {
  const { nom, prix, categorie, disponible } = req.body;


  if (!nom || nom.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Name is required.",
    });
  }


  if (prix === undefined || isNaN(prix) || Number(prix) < 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be a number greater than or equal to 0.",
    });
  }

  if (!categorie || categorie.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Category is required.",
    });
  }


  if (
    disponible !== undefined &&
    typeof disponible !== "boolean"
  ) {
    return res.status(400).json({
      success: false,
      message: "Disponible must be true or false.",
    });
  }

  next();
};

export default validatePlat;