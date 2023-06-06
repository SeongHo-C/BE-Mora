const Generation = require('./model');
// const { CustomError } = require('../../middlewares');
// const { code, message } = require('../../utils');
const { Op } = require('sequelize');

module.exports = {
  async addGeneration(generationInfo) {
    const { name, phase } = generationInfo;
    const generation = await Generation.findOne({
      where: { [Op.and]: [{ name: name }, { phase: phase }] },
    });
    if (generation) {
      // throw new CustomError(code.CONFLICT, message.ALREADY_GENERATION);
      throw new Error('이미 존재하는 기수입니다. 다시 한 번 확인해 주세요.');
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
      // throw new CustomError(code.NOT_FOUND, message.NO_GENERATION);
      throw new Error('찾으시는 기수가 없습니다. 다시 한 번 확인해 주세요.');
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
      // throw new CustomError(code.NOT_FOUND, message.GENERATION_UPDATE_FAIL);
      throw new Error(
        '기수 수정 처리가 실패했습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return updateCount;
  },

  async deleteGeneration(id) {
    const deleteCount = await Generation.destroy({ where: { id: id } });
    if (deleteCount < 1) {
      // throw new CustomError(code.NOT_FOUND, message.GENERATION_DELETE_FAIL);
      throw new Error(
        '기수 삭제 처리가 실패했습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return deleteCount;
  },
};
