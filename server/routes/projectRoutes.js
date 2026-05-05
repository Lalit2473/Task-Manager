const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

router.post("/", auth, role("admin"), createProject);
router.get("/", auth, getProjects);

module.exports = router;
