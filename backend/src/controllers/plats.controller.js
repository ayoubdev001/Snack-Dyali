import Plat from "../models/plat.model.js";

// GET /api/plats
export const getAllPlats = async (req, res, next) => {
  try {
    const plats = await Plat.findAll();

    res.status(200).json(plats);
  } catch (error) {
    next(error);
  }
};

// GET /api/plats/:id
export const getPlatById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const plat = await Plat.findByPk(id);

   if (!plat) {
  const error = new Error("Plat not found");
  error.status = 404;

  return next(error);
}

    res.status(200).json(plat);
  } catch (error) {
    next(error);
  }
};

// POST /api/plats
export const createPlat = async (req, res, next) => {
  try {
    const plat = await Plat.create(req.body);

    res.status(201).json(plat);
  } catch (error) {
    next(error);
  }
};

// PUT /api/plats/:id
export const updatePlat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const plat = await Plat.findByPk(id);

   if (!plat) {
  const error = new Error("Plat not found");
  error.status = 404;

  return next(error);
}

    await plat.update(req.body);

    res.status(200).json(plat);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/plats/:id
export const deletePlat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const plat = await Plat.findByPk(id);

 if (!plat) {
  const error = new Error("Plat not found");
  error.status = 404;

  return next(error);
}

    await plat.destroy();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};