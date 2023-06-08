const generationService = require('./service');

module.exports = {
  async addGeneration(req, res) {
    const { name, phase } = req.body;
    res.status(201).json(
      await generationService.addGeneration({
        name,
        phase,
      })
    );
  },

  async getGenerations(req, res) {
    const { page, size, keyword } = req.query;
    res
      .status(200)
      .json(await generationService.getGeneraions(page, size, keyword));
  },

  async setGeneration(req, res) {
    const { id } = req.params;
    const { name, phase } = req.body;
    const toUpdate = {
      ...(name && { name }),
      ...(phase && { phase }),
    };
    res.status(200).json(await generationService.setGeneration(id, toUpdate));
  },

  async deleteGeneration(req, res) {
    const { id } = req.params;
    res.status(200).json(await generationService.deleteGeneration(id));
  },
};
