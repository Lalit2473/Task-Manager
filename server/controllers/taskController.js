const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");

const isMember = (project, userId) => {
  return (
    project.createdBy.toString() === userId ||
    project.members.some((m) => m.toString() === userId)
  );
};

exports.createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ msg: "Title and projectId required" });
    }

    const project = await Project.findById(projectId);

    if (!project || !isMember(project, req.user.id)) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    if (assignedTo) {
      const user = await User.findById(assignedTo);

      if (!user) {
        return res.status(400).json({ msg: "Assigned user not found" });
      }

      const isValid =
        project.createdBy.toString() === assignedTo ||
        project.members.some((m) => m.toString() === assignedTo);

      if (!isValid) {
        return res.status(400).json({ msg: "User not in project" });
      }
    }

    const task = await Task.create(req.body);

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project || !isMember(project, req.user.id)) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const tasks = await Task.find({
      projectId: req.params.projectId,
    }).populate("assignedTo", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("projectId");

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const project = task.projectId;

    if (!isMember(project, req.user.id)) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    if (req.body.assignedTo) {
      const user = await User.findById(req.body.assignedTo);

      if (!user) {
        return res.status(400).json({ msg: "Assigned user not found" });
      }

      const isValid =
        project.createdBy.toString() === req.body.assignedTo ||
        project.members.some((m) => m.toString() === req.body.assignedTo);

      if (!isValid) {
        return res.status(400).json({ msg: "User not in project" });
      }
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
