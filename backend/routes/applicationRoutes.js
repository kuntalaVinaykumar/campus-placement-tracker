const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const protect = require("../middleware/authMiddleware");


const {
  addApplication,
  getApplications,
  updateApplication,
  deleteApplication,
  getStats,
  filterByStatus,
  searchApplications
} = require("../controllers/applicationController");

router.post("/", auth, addApplication);
router.get("/", auth, getApplications);
router.put("/:id", auth, updateApplication);
router.delete("/:id", auth, deleteApplication);
router.get("/stats", protect, getStats);
router.get("/status/:status", protect, filterByStatus);
router.get("/search/:keyword", protect, searchApplications);



module.exports = router;
