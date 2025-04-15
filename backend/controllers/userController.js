import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  // console.log(req.body)

  if (user) {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.city = req.body.city;
    user.state = req.body.state;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();
    // console.log(updatedUser)

    res.status(200).json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.city,
      state: updatedUser.state,
      role: updatedUser.role,
    });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.role == "admin") {
      res.status(400);
      throw new Error("Can not delete admin!");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("No user found!");
  }
});

export const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.city = req.body.city;
    user.state = req.body.state;
    user.role = req.body.role;
    const updatedUser = await user.save();
    res.status(200).json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.city,
      state: updatedUser.state,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export const createUser = asyncHandler(async (req, res) => {
  console.log("Files:", req.files); // Log the files object
  console.log("Body:", req.body); // Log the request body
  const avatar = req.files.avatar ? req.files.avatar[0].filename : "";
  const { firstName, lastName, email, phone, address, city, state, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !password
  ) {
    throw new Error("All fields are mandatory!");
  }
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res
      .status(400)
      .send({ message: "User with given email already exists!" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    password: hashedPassword,
    avatar,
  });
  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(200).json({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      password,
      avatar,
    });
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    createToken(res, user._id);
    res.status(200).json(user);
    return;
  } else res.status(400).send({ message: "Email or Password is invalid" });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "None",
    secure: true,
  });

  res.status(200).json({ message: "Logout successfully!" });
});
