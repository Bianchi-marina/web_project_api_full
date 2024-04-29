const User = require('../models/user');

module.exports = async (req, res, next) => {
  if (req.params.id.length !== 24) {
    return res.status(404).json({ message: 'não encontrou o id' })
  }
  const { id } = req.params;
  const transformer = String(id);

  const userfind = await User.findById({_id:transformer});
  if (!userfind) {
    return res.status(404).json({ message: 'não encontrou o id' })
  }
  next();
};