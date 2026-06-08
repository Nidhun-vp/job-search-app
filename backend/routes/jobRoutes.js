const express = require("express");

const Job = require("../models/Job");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE JOB
router.post("/", authMiddleware, async (req, res) => {

  try {

    const newJob = await Job.create({
      ...req.body,
      employer: req.user.id
    });

    res.status(201).json(newJob);

  } catch (err) {

    res.status(500).json(err);

  }

});


// GET ALL JOBS
router.get("/", async (req, res) => {

  try {

    const jobs = await Job.find();

    res.json(jobs);

  } catch (err) {

    res.status(500).json(err);

  }

});


// UPDATE JOB
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedJob);

  } catch (err) {

    res.status(500).json(err);

  }

});


// DELETE JOB
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    await Job.findByIdAndDelete(req.params.id);

    res.json("Job Deleted");

  } catch (err) {

    res.status(500).json(err);

  }

});

module.exports = router;