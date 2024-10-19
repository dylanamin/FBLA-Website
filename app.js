const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/job-postings', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Job Schema
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    description: String,
    approved: Boolean
});

const Job = mongoose.model('Job', jobSchema);

// Add a job listing (Admin use)
app.post('/submit-job', async (req, res) => {
    const job = new Job({
        title: req.body.title,
        company: req.body.company,
        description: req.body.description,
        approved: false // Initially, not approved
    });
    await job.save();
    res.send('Job submitted for approval!');
});

// Approve or delete job (Admin use)
app.post('/approve-job', async (req, res) => {
    const job = await Job.findById(req.body.jobId);
    if (req.body.action === 'approve') {
        job.approved = true;
        await job.save();
        res.send('Job approved!');
    } else if (req.body.action === 'delete') {
        await job.delete();
        res.send('Job deleted!');
    }
});

// Display approved jobs
app.get('/jobs', async (req, res) => {
    const jobs = await Job.find({ approved: true });
    res.json(jobs);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
