const Generation = require('./model');
const { CustomError } = require('../../middlewares');
const { code, message } = require('../../utils');
const { Op } = require('sequelize');

const generationService = {
  async addGeneration(generationInfo) {
    const { name, phase } = generationInfo;
    const generation = await Generation.findOne({
      where: { [Op.and]: [{ name: name }, { phase: phase }] },
    });
    if (generation) {
      throw new CustomError(code.CONFLICT, message.ALREADY_GENERATION);
    }

    const createdNewGeneration = await Generation.create(generationInfo);
    return createdNewGeneration;
  },

  async getGeneraions(keyword) {
    const generations = await Generation.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
          { phase: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });
    return generations;
  },

  async setGeneration(id, toUpdate) {
    const { name, phase } = toUpdate;
    const generation = await Generation.findOne({ where: { id: id } });
    if (!generation) {
      throw new CustomError(code.NOT_FOUND, message.NO_GENERATION);
    }

    const updateCount = Generation.update(
      {
        name: name,
        phase: phase,
      },
      {
        where: { id: id },
      }
    );
    if (updateCount < 1) {
      throw new CustomError(code.NOT_FOUND, message.GENERATION_UPDATE_FAIL);
    }
    return updateCount;
  },
};

module.exports = generationService;
