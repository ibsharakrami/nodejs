// const data = {
//     employees: require('../model/employees.json'),
//     setEmployees: function (data) { this.employees = data }
// }

const Employee = require("../model/employee");

const getAllEmployees = async (req, res) => {
  const employee = await Employee.find();
  if (!employee) return res.status(204).json({ message: "No Employee found" });
  res.json(employee);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname || !req?.body?.address) {
    return res
      .status(400)
      .json({ message: "First and Last names are required" });
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req, res) => {
 if(!req?.body?.id) {
  return res.status(400).json({'message':'ID parameter id required'})
 }
 const employee = await Employee.findOne({_id : req.body.id}).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  if (req.body.address) employee.address = req.body.address;

  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if(!req?.body?.id) {
    return res.status(400).json({'message':'ID parameter id required'})
   }
   const employee = await Employee.findOne({_id : req.body.id}).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
 const result = await Employee.deleteOne({_id: req.body.id});
  res.json(result);
};

const getEmployee = async (req, res) => {
  if(!req?.params?.id) {
    return res.status(400).json({'message':'Employee ID required'})
   }
   const employee = await Employee.findOne({_id : req.params.id}).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
