import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRespository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  const categoryAlreadyExists = categoriesRepository.findByName(name);
  if (categoryAlreadyExists) {
    return response
      .status(400)
      .json({ message: "Category exists in database!" })
      .send(400);
  }
  categoriesRepository.create({ name, description });
  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all).send();
});

export { categoriesRoutes };
