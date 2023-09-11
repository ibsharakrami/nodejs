const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phoneNumber: { type: String },
  address: { type: String },
});
console.log("POOO+===>",profileSchema);
module.exports = mongoose.model('Profile', profileSchema);


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema ;

// const profileSchema = new Schema({
//   firstname :{
//     type : String,
//     required : true
//   },
//   lastname :{
//     type : String,
//     required : true
//   },
//   address : {
//     type :String,
//     required : true
//   }
//   // empId :{
//   //   type : Number,
//   //   required :true
//   // },

// })

// module.exports = mongoose.model('Profile', profileSchema);
