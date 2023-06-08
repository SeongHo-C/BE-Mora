const Generation = require('./model');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils');
const {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');

module.exports = {
  async addGeneration(generationInfo) {
    const { name, phase } = generationInfo;
    const generation = await Generation.findOne({
      where: { [Op.and]: [{ name }, { phase }] },
    });
    if (generation) {
      throw new BadRequestException('이미 존재하는 기수입니다.');
    }

    return await Generation.create(generationInfo);
  },

  async getGeneraions(page, size, keyword) {
    const { limit, offset } = getPagination(page, size);
    let generations = await Generation.findAndCountAll({
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
    generations = getPagingData(generations, page, limit);

    return generations;
  },

  async setGeneration(id, toUpdate) {
    const { name, phase } = toUpdate;

    const generation = await Generation.findOne({ where: { id } });
    if (!generation) {
      throw new NotFoundException('존재하지 않는 기수입니다.');
    }

    const updateCount = await Generation.update(
      {
        name,
        phase,
      },
      {
        where: { id },
      }
    );
    if (!updateCount) {
      throw new InternalServerErrorException(
        `${name} 기수 수정 처리에 실패했습니다.`
      );
    }

    return await Generation.findOne({ where: { id } });
  },

  async deleteGeneration(id) {
    const generation = await Generation.findOne({ where: { id } });
    if (!generation) {
      throw new NotFoundException('존재하지 않는 기수입니다.');
    }

    const deleteCount = await Generation.destroy({ where: { id } });
    if (!deleteCount) {
      throw new InternalServerErrorException(
        `${id} 기수 삭제 처리에 실패했습니다.`
      );
    }

    return generation;
  },
};
