const Application = require("../models/Application");

exports.addApplication = async (req, res) => {
  try {
    const newApp = new Application({
      ...req.body,
      userId: req.user.id
    });

    await newApp.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user.id });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedApp);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ msg: "Application deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};



// 📊 Get dashboard stats
exports.getStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔎 Filter by status
exports.filterByStatus = async (req, res) => {
  try {
    const data = await Application.find({
      userId: req.user.id,
      status: req.params.status
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Search by company name
exports.searchApplications = async (req, res) => {
  try {
    const data = await Application.find({
      userId: req.user.id,
      companyName: { $regex: req.params.keyword, $options: "i" }
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

