const express = require('express');
const mongoose = require('mongoose');
const Job = require('./models/job'); // Job model

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/job-listings', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/jobs', async (req, res) => {
  const approvedJobs = await Job.find({ approved: true });
  res.json(approvedJobs);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Job', jobSchema);

app.put('/api/jobs/:id/approve', async (req, res) => {
  const job = await Job.findById(req.params.id);
  job.approved = true;
  await job.save();
  res.send('Job approved');
});

app.delete('/api/jobs/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.send('Job deleted');
});
