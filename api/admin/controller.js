const adminService = require('./service');

module.exports = {
  async addAdmin(req, res) {
    const { name, email, password } = req.body;
    res
      .status(201)
      .json(await adminService.addAdmin({ name, email, password }));
  },

  async getAdminToken(req, res) {
    const { email, password } = req.body;
    res.status(200).json(await adminService.getAdminToken({ email, password }));
  },

  async getAdmins(req, res) {
    const { page, size, keyword } = req.query;
    res.status(200).json(await adminService.getAdmins(page, size, keyword));
  },

  async setAdmin(req, res) {
    const { email } = req.params;
    const { name, password } = req.body;
    const toUpdate = {
      ...(name && { name }),
      ...(password && { password }),
    };

    res.status(200).json(await adminService.setAdmin(email, toUpdate));
  },

  async deleteAdmin(req, res) {
    const { email } = req.params;
    res.status(200).json(await adminService.deleteAdmin(email));
  },
};
