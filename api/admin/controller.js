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
};

module.exports = adminController;
