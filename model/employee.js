const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const employeeSchema = new Schema({
  firstname :{
    type : String,
    required : true
  },
  lastname :{
    type : String,
    required : true
  },
  address : {
    type :String,
    required : true
  }
  // empId :{
  //   type : Number,
  //   required :true
  // },

})

module.exports = mongoose.model('Employee' , employeeSchema)
