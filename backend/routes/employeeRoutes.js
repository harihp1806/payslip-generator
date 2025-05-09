const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Existing routes (Create, Get, Update, etc.)
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

router.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ error: 'Not found' });
  res.json(employee);
});

router.put('/:id', async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!employee) return res.status(404).json({ error: 'Not found' });
  res.json(employee);
});

// ✅ Bulk Upload Route
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post('/bulk-upload', upload.single('file'), async (req, res) => {
  const employees = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      employees.push({
        name: row.name,
        employeeId: row.employeeId,
        designation: row.designation,
        uan: row.uan,
        pan: row.pan,
        pfNumber: row.pfNumber,
        bankAccountNumber: row.bankAccountNumber,
        ifscCode: row.ifscCode,
        email: row.email,
        phone: row.phone,
        joiningdate: row.joiningdate,
        department: row.department,
      });
    })
    .on('end', async () => {
      try {
        await Employee.insertMany(employees, { ordered: false });
        res.status(201).json({ message: 'Employees uploaded successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Bulk upload failed', details: err.message });
      }
    });
});

module.exports = router;
