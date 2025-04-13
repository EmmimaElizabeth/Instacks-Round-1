const express = require('express');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/forms', formRoutes);

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
