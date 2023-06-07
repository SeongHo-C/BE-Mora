const Generation = require('./model');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils');
const { BadRequestClass } = require('../../middlewares');

module.exports = {
  async addGeneration(generationInfo) {
    const { name, phase } = generationInfo;
    const generation = await Generation.findOne({
      where: { [Op.and]: [{ name: name }, { phase: phase }] },
    });
    if (generation) {
      throw new BadRequestClass('이미 존재하는 기수입니다.');
    }

    const createdNewGeneration = await Generation.create(generationInfo);
    return createdNewGeneration;
  },

  async getGeneraions(page, size, keyword) {
    const { limit, offset } = getPagination(page, size);
    let generations;

    if (!keyword || keyword === ':keyword') {
      generations = await Generation.findAndCountAll({
        order: [
          ['name', 'ASC'],
          ['phase', 'ASC'],
        ],
        offset,
        limit,
      });
    } else {
      generations = await Generation.findAndCountAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${keyword}%` } },
            { phase: { [Op.like]: `%${keyword}%` } },
          ],
        },
        order: [
          ['name', 'ASC'],
          ['phase', 'ASC'],
        ],
        offset,
        limit,
      });
    }

    generations = getPagingData(generations, page, limit);

    return generations;
  },

  async setGeneration(id, toUpdate) {
    const { name, phase } = toUpdate;

    const generation = await Generation.findOne({ where: { id: id } });
    if (!generation) {
      throw new BadRequestClass('존재하지 않는 기수입니다.');
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
      throw new BadRequestClass('기수 수정 처리에 실패했습니다.');
    }
    return updateCount;
  },

  async deleteGeneration(id) {
    const generation = await Generation.findOne({ where: { id: id } });
    if (!generation) {
      throw new BadRequestClass('존재하지 않는 기수입니다.');
    }

    const deleteCount = await Generation.destroy({ where: { id: id } });
    if (deleteCount < 1) {
      throw new BadRequestClass('기수 삭제 처리에 실패했습니다.');
    }
    return deleteCount;
  },
};
