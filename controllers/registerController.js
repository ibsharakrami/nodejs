const User = require("../model/user");
const Profile = require('../model/profile');
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    // Check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict

    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Create a new user
    const newUser = await User.create({
      username: user,
      password: hashedPwd,
    });

    // Create a new profile and associate it with the user's ID
    const newProfile = await Profile.create({
      userId: newUser._id, // Assign the user's ID to the profile
      phoneNumber: "", // You can set default values for phone number and address
      address: "",
    });

    console.log(`User ${user} and profile created successfully.`);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };



// const User = require("../model/user");
// const Profile = require('../model/profile');

// const bcrypt = require("bcrypt");

// const handleNewUser = async (req, res) => {
//   const { user, pwd } = req.body;
//   if (!user || !pwd)
//     return res
//       .status(400)
//       .json({ message: "Username and password are required." });
//   // check for duplicate usernames in the db
//   const duplicate = await User.findOne({ username: user }).exec();
//   if (duplicate) return res.sendStatus(409); //Conflict
//   try {
//     //encrypt the password
//     const hashedPwd = await bcrypt.hash(pwd, 10);
//     //store the new user
//     const result = await User.create({
//       username: user,

//       password: hashedPwd,
//     });
//     // await Profile.create({
//     //   userId: newUser._id, // Assign the user's ID to the profile
//     //   phoneNumber: "", // You can set default values for phone number and address
//     //   address: "",
//     // });
//     console.log(result);
//     res.status(201).json({ success: `New user ${user} created!` });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { handleNewUser };
