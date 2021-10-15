const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const EmployeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "please add phone"],
      minlength: 10,
      maxlength: 10,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
    },
    nationalID: {
      type: Number,
      min: 16,
      required: [true, "please add your ID"],
      unique: true,
    },
    code: {
      type: String,
    },
    dob: {
      type: Date,
      required: true,
      required: [true, "please add Date of Birth"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    position: {
      type: String,
      enum: ["manager", "developer", "designer", "tester", "devops"],
    },
    confirmToken: String,
    resetToken: String,
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// helper methods for model

EmployeeSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

EmployeeSchema.methods.generateResetPasswordToken = function () {
  // Generate token for email confirmation
  const token = crypto.randomBytes(20).toString("hex");
  this.resetToken = crypto.createHash("sha256").update(token).digest("hex");
  return token;
};

EmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  if (this.position === "manager") {
    const token = crypto.randomBytes(20).toString("hex");
    this.confirmToken = crypto.createHash("sha256").update(token).digest("hex");
  }

  //   Encrypting password and generating unique code

  this.code = `EMP${crypto.randomInt(0, 10000)}`;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Employee", EmployeeSchema);
