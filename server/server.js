const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Minimal health check / status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'College Assignment Submission Tracker Backend is running successfully.',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
