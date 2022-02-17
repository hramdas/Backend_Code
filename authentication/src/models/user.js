const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

//Hash before saving password
userSchema.pre("save", function (next) {
  //for create, update
  if (!this.isModified("password")) return next();

  // const hash = bcrypt.hashSync(this.password, 10)
  // this.password = hash
  // return next()

  //-------OR------
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    return next();
  });
});

//Check password while login
userSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, same) {
      if (err) return reject(err);
      return resolve(same);
    });
  });
};

module.exports = mongoose.model("user", userSchema);
