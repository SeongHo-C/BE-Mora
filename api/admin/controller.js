const adminService = require('./service');

module.exports = {
  async addAdmin(req, res) {
    const { name, email, password } = req.body;
    const newAdmin = await adminService.addAdmin({ name, email, password });
    res.status(201).json(newAdmin);
  },

  async getAdminToken(req, res) {
    const { email, password } = req.body;
    const loginResult = await adminService.getAdminToken({ email, password });
    res.status(200).json(loginResult);
  },

  async getAdmins(req, res) {
    const { keyword } = req.params;
    const { page, size } = req.query;
    const admins = await adminService.getAdmins(page, size, keyword);
    res.status(200).json(admins);
  },

  async setAdmin(req, res) {
    const { email } = req.params;
    const { name, password } = req.body;
    const toUpdate = {
      ...(name && { name }),
      ...(password && { password }),
    };

    const updatedResult = await adminService.setAdmin(email, toUpdate);
    res.status(200).json(updatedResult);
  },

  async deleteAdmin(req, res) {
    const { email } = req.params;
    const deletedResult = await adminService.deleteAdmin(email);
    res.status(200).json(deletedResult);
  },
};
