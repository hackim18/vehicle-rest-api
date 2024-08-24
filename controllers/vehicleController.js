const { Pricelist, VehicleBrand, VehicleModel, VehicleType, VehicleYear } = require("../models");
const { Op } = require("sequelize");

class vehicleController {
  static async getAllBrands(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
      const offset = parseInt(req.query.offset) || 0;
      const { brand_id, brand_name } = req.query;

      const options = {
        include: [
          {
            model: VehicleType,
            as: "types",
            attributes: ["name"],
            include: [
              {
                model: VehicleModel,
                as: "models",
                attributes: ["name"],
                include: [
                  {
                    model: Pricelist,
                    as: "pricelists",
                    attributes: ["code", "price"],
                    include: [
                      {
                        model: VehicleYear,
                        as: "year",
                        attributes: ["year"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        attributes: ["name"],
        limit,
        offset,
      };

      if (brand_id) options.where = { id: brand_id };

      if (brand_name) {
        options.where = {
          ...options.where,
          name: {
            [Op.iLike]: `%${brand_name}%`,
          },
        };
      }

      const { count, rows: brands } = await VehicleBrand.findAndCountAll(options);

      res.status(200).json({ metadata: { total: count, limit: limit, offset: offset }, data: brands });
    } catch (error) {
      next(error);
    }
  }
  static async createBrand(req, res, next) {
    const { name } = req.body;
    try {
      if (!name) throw { name: "ValidationError", message: "Brand name is required" };

      const newBrand = await VehicleBrand.create({ name });
      res.status(201).json(newBrand);
    } catch (error) {
      next(error);
    }
  }
  static async getBrandsById(req, res, next) {
    const brandId = req.params.id;
    try {
      const brand = await VehicleBrand.findByPk(brandId, {
        include: [
          {
            model: VehicleType,
            as: "types",
            attributes: ["name"],
            include: [
              {
                model: VehicleModel,
                as: "models",
                attributes: ["name"],
                include: [
                  {
                    model: Pricelist,
                    as: "pricelists",
                    attributes: ["code", "price"],
                    include: [
                      {
                        model: VehicleYear,
                        as: "year",
                        attributes: ["year"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        attributes: ["name"],
      });

      if (!brand) throw { name: "NotFoundError", message: "Brand not found" };

      res.json(brand);
    } catch (error) {
      next(error);
    }
  }
  static async getAllTypes(req, res, next) {
    try {
      const { brand_id, brand_name } = req.query;
      const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
      const offset = parseInt(req.query.offset) || 0;

      const options = {
        include: [
          {
            model: VehicleBrand,
            as: "brand",
            attributes: ["name"],
          },
          {
            model: VehicleModel,
            as: "models",
            attributes: ["name"],
            include: [
              {
                model: Pricelist,
                as: "pricelists",
                attributes: ["code", "price"],
                include: [
                  {
                    model: VehicleYear,
                    as: "year",
                    attributes: ["year"],
                  },
                ],
              },
            ],
          },
        ],
        attributes: ["name"],
        limit,
        offset,
      };

      if (brand_id) options.where = { brand_id: brand_id };

      if (brand_name) {
        options.include.push({
          model: VehicleBrand,
          as: "brand",
          where: {
            name: {
              [Op.iLike]: `%${brand_name}%`,
            },
          },
          attributes: [],
        });
      }

      const types = await VehicleType.findAndCountAll(options);

      res.status(200).json({ metadata: { total: types.count, limit: limit, offset: offset }, data: types.rows });
    } catch (error) {
      next(error);
    }
  }
  static async updateBrands(req, res, next) {
    const brandId = req.params.id;
    const { name } = req.body;
    try {
      if (!name) throw { name: "ValidationError", message: "Brand name is required" };

      const brand = await VehicleBrand.findByPk(brandId);
      if (!brand) throw { name: "NotFoundError", message: "Brand not found" };

      await brand.update(name);

      res.json(brand);
    } catch (error) {
      next(error);
    }
  }
  static async deleteBrands(req, res, next) {
    const brandId = req.params.id;
    try {
      const brand = await VehicleBrand.findByPk(brandId);
      if (!brand) throw { name: "NotFoundError", message: "Brand not found" };

      await brand.destroy();
      res.json({ message: "Brand deleted" });
    } catch (error) {
      next(error);
    }
  }
  static async getTypesById(req, res, next) {
    const typeId = req.params.id;
    try {
      const type = await VehicleType.findByPk(typeId, {
        include: [
          {
            model: VehicleBrand,
            as: "brand",
            attributes: ["name"],
          },
          {
            model: VehicleModel,
            as: "models",
            attributes: ["name"],
            include: [
              {
                model: Pricelist,
                as: "pricelists",
                attributes: ["code", "price"],
                include: [
                  {
                    model: VehicleYear,
                    as: "year",
                    attributes: ["year"],
                  },
                ],
              },
            ],
          },
        ],
        attributes: ["name"],
      });

      if (!type) throw { name: "NotFoundError", message: "Type not found" };

      res.json(type);
    } catch (error) {
      next(error);
    }
  }
  static async createType(req, res, next) {
    const { name, brand_id } = req.body;
    try {
      if (!name || !brand_id) throw { name: "ValidationError", message: "Name and brand_id are required" };

      const brand = await VehicleBrand.findByPk(brand_id);
      if (!brand) throw { name: "NotFoundError", message: "Brand not found" };

      const newType = await VehicleType.create({ name, brand_id });
      res.status(201).json(newType);
    } catch (error) {
      next(error);
    }
  }
  static async updateTypes(req, res, next) {
    const typeId = req.params.id;
    const { name, brand_id } = req.body;
    try {
      if (!name || !brand_id) throw { name: "ValidationError", message: "Name and brand_id are required" };

      const brand = await VehicleBrand.findByPk(brand_id);
      if (!brand) throw { name: "NotFoundError", message: "Brand not found" };

      const type = await VehicleType.findByPk(typeId);
      if (!type) throw { name: "NotFoundError", message: "Type not found" };

      await type.update({ name, brand_id });
      res.json(type);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTypes(req, res, next) {
    const typeId = req.params.id;
    try {
      const type = await VehicleType.findByPk(typeId);
      if (!type) throw { name: "NotFoundError", message: "Type not found" };

      await type.destroy();
      res.json({ message: "Type deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = vehicleController;
