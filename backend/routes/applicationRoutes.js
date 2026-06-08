const express = require("express");

const Application = require("../models/Application");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// APPLY JOB
router.post("/:jobId", authMiddleware, async (req, res) => {

  try {

    const existing = await Application.findOne({
      candidate: req.user.id,
      job: req.params.jobId
    });

    if (existing) {
      return res.status(400).json("Already Applied");
    }

    const application = await Application.create({
      candidate: req.user.id,
      job: req.params.jobId
    });

    res.status(201).json(application);

  } catch (err) {

    res.status(500).json(err);

  }

});


// GET MY APPLICATIONS
router.get("/my", authMiddleware, async (req, res) => {

  try {

    const applications = await Application.find({
      candidate: req.user.id
    }).populate("job");

    res.json(applications);

  } catch (err) {

    res.status(500).json(err);

  }

});


// UPDATE APPLICATION STATUS
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      { new: true }
    );

    res.json(updatedApplication);

  } catch (err) {

    res.status(500).json(err);

  }

});

module.exports = router;