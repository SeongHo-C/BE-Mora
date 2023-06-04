const generationService = require('./service');

const generationController = {
  async addGeneration(req, res) {
    const { name, phase } = req.body;
    const newGeneration = await generationService.addGeneration({
      name,
      phase,
    });
    res.status(201).json(newGeneration);
  },

  async getGenerations(req, res) {
    const { keyword } = req.params;
    const generations = await generationService.getGeneraions(keyword);
    res.status(201).json(generations);
  },

  async setGeneration(req, res) {
    const { id } = req.params;
    const { name, phase } = req.body;
    const toUpdate = {
      ...(name && { name }),
      ...(phase && { phase }),
    };
    const updatedResult = await generationService.setGeneration(id, toUpdate);
    res.status(201).json(updatedResult);
  },
};

module.exports = generationController;
