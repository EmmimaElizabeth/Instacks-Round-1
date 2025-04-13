const express = require('express');
const router = express.Router();
const db = require('../db');

// Save form
router.post('/', (req, res) => {
  const { title, fields } = req.body;

  db.query('INSERT INTO forms (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const formId = result.insertId;

    const fieldValues = fields.map(f => [formId, f.label, f.type, JSON.stringify(f.options)]);

    db.query('INSERT INTO fields (form_id, label, type, options) VALUES ?', [fieldValues], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      res.json({ id: formId });
    });
  });
});

// Get form by ID
router.get('/:id', (req, res) => {
  const formId = req.params.id;

  db.query('SELECT * FROM forms WHERE id = ?', [formId], (err, formResult) => {
    if (err || formResult.length === 0) return res.status(404).json({ message: 'Form not found' });

    db.query('SELECT * FROM fields WHERE form_id = ?', [formId], (err2, fieldResults) => {
      if (err2) return res.status(500).json({ error: err2.message });

      res.json({
        id: formResult[0].id,
        title: formResult[0].title,
        fields: fieldResults.map(f => ({
          label: f.label,
          type: f.type,
          options: JSON.parse(f.options)
        }))
      });
    });
  });
});

module.exports = router;
