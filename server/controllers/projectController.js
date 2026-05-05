const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Project name is required" });
    }

    const validMembers = await User.find({
      _id: { $in: members || [] },
    });

    const project = await Project.create({
      name,
      description,
      members: validMembers.map((u) => u._id),
      createdBy: req.user.id,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ createdBy: req.user.id }, { members: { $in: [req.user.id] } }],
    })
      .populate("members", "name email")
      .populate("createdBy", "name email");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
