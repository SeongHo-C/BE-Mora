const adminUserService = require('./service');

module.exports = {
  async addUser(req, res) {
    const { name, email, password } = req.body;
    res
      .status(201)
      .json(await adminUserService.addUser({ name, email, password }));
  },

  async getUsers(req, res) {
    const { page, size, keyword } = req.query;
    res.status(200).json(await adminUserService.getUsers(page, size, keyword));
  },

  async setUser(req, res) {
    const { email } = req.params;
    const { name, password } = req.body;
    const toUpdate = {
      ...(name && { name }),
      ...(password && { password }),
    };

    res.status(200).json(await adminUserService.setUser(email, toUpdate));
  },

  async deleteUser(req, res) {
    const { email } = req.params;
    res.status(200).json(await adminUserService.deleteUser(email));
  },
};
