import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import fs from "fs"
const router = express.Router();
// Storage config
import { fileURLToPath } from "url";

// manually recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendUploadsPath = path.join(__dirname, "../../StoryTime-Frontend/public/uploads");

// Ensure the directory exists
if (!fs.existsSync(frontendUploadsPath)) {
  fs.mkdirSync(frontendUploadsPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, frontendUploadsPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
/**
 * ✅ Leaderboard (Top Contributors)
 */

router.get("/all", async (req, res) => {
  try {
    console.log("hi");
    const authors = await User.find({}, "name bio profilePicture");
    //console.log(authors);

    res.json(
      authors.map((author) => ({
        _id: author._id,
        name: author.name,
        bio: author.bio || "",
        profileImage: author.profilePicture || "/default.jpg", // fallback image
      }))
    );
  } catch (error) {
    console.error("Error in /all route:", error);
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
});
router.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ contributions: -1 })
      .limit(10)
      .select("name contributions profilePicture");
    res.json(topUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching leaderboard", error: error.message });
  }
});

/**
 * ✅ User Registration
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, googleId, profilePicture } = req.body;

    if (!email || (!password && !googleId)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      googleId,
      profilePicture: profilePicture||"",
    });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

/**
 * ✅ User Login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //console.log("entered userend", user)
    const user1 = await User.find()
    //console.log("entered Bacend", email)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    console.log("toment",token)  
    res.json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

/**
 * ✅ Forgot Password - Generates Reset Token
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour expiration

    await user.save();
    res.json({ message: "Password reset token generated", resetToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating reset token", error: error.message });
  }
});

/**
 * ✅ Reset Password
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
});

/**
 * ✅ Get User Profile (Protected)
 */
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    //console.log( user );
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
});

/**
 * ✅ Update User Profile (Protected)
 */

router.post("/change-pic", upload.single("profilePicture"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  // return public path
  res.json({
    message: "Upload successful",
    filePath: `/uploads/${req.file.filename}`,
  });
});

router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log("guggud:,",user)
    if (!user) return res.status(404).json({ message: "User not found" });
    let token = null;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
      console.log("hey see the contributions",req.body.contributions.title, req.body.contributions.score)

    if (Array.isArray(req.body.contributions)) {
  req.body.contributions.forEach((c) => {
    if (c.title && typeof c.score === 'number') {
      console.log(c.title);
      console.log(c.score)
      user.contributions.push(c);
    }
  });
}

    if (req.body.password) {
      user.password = req.body.password;
      token = generateToken(user._id);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      profilePicture: updatedUser.profilePicture,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }

 
});


export default router;
