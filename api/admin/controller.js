const adminService = require('./service');

const adminController = {
  async addAdmin(req, res) {
    const { name, email, password } = req.body;
    const newAdmin = await adminService.addAdmin({ name, email, password });
    res.status(201).json(newAdmin);
  },

  async getAdminToken(req, res) {
    const { email, password } = req.body;
    const loginResult = await adminService.getAdminToken({ email, password });
    res.status(201).json(loginResult);
  },

  async getAdmin(req, res) {
    const admin = await adminService.getAdmin(req.currentId);
    res.status(201).json(admin);
  },

  async getAdmins(req, res) {
    const { adminInfo } = req.params;
    const admins = await adminService.getAdmins(adminInfo);
    res.status(201).json(admins);
  },

  async setAdmin(req, res) {
    const { email } = req.params;
    const { name, password } = req.body;
    const toUpdate = {
      ...(name && { name }),
      ...(password && { password }),
    };

    const admin = await adminService.setAdmin(email, toUpdate);
    res.status(201).json(admin);
  },

  async deleteAdmin(req, res) {
    const { email } = req.params;
    const deletedResult = await adminService.deleteAdmin(email);
    res.status(201).json(deletedResult);
  },
};

module.exports = adminController;
