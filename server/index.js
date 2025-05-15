const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/lawsphere")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Define schemas
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["lawyer", "client"], default: "client" },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
})

const lawyerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: { type: String, required: true },
  barNumber: { type: String, required: true },
  experience: { type: String },
  education: [{ type: String }],
  barAdmissions: [{ type: String }],
  languages: [{ type: String }],
  about: { type: String },
  areas: [{ type: String }],
  location: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
})

const reviewSchema = new mongoose.Schema({
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String },
  date: { type: Date, default: Date.now },
})

const caseSchema = new mongoose.Schema({
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  caseNumber: { type: String, required: true },
  caseType: { type: String, required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Urgent", "Completed"], default: "Pending" },
  description: { type: String },
  documents: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  outcome: { type: String, enum: ["Successful", "Partially Successful", "Unsuccessful", ""] },
  nextHearing: { type: Date },
  createdAt: { type: Date, default: Date.now },
  closedDate: { type: Date },
})

// Create models
const User = mongoose.model("User", userSchema)
const Lawyer = mongoose.model("Lawyer", lawyerSchema)
const Review = mongoose.model("Review", reviewSchema)
const Case = mongoose.model("Case", caseSchema)

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
      return res.status(401).json({ message: "Authentication required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" })
  }
}

// Routes

// Register a new lawyer
app.post("/api/auth/register/lawyer", async (req, res) => {
  try {
    const { fullName, email, password, specialization, barNumber, phoneNumber } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role: "lawyer",
      phoneNumber,
    })
    await user.save()

    // Create lawyer profile
    const lawyer = new Lawyer({
      userId: user._id,
      specialization,
      barNumber,
      languages: ["English"],
      areas: [specialization],
    })
    await lawyer.save()

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get all lawyers
app.get("/api/lawyers", async (req, res) => {
  try {
    const lawyers = await Lawyer.find().populate("userId", "fullName")

    const formattedLawyers = lawyers.map((lawyer) => ({
      id: lawyer._id,
      name: lawyer.userId.fullName,
      specialization: lawyer.specialization,
      rating: lawyer.rating,
      reviews: lawyer.reviews,
      location: lawyer.location || "Not specified",
      areas: lawyer.areas,
    }))

    res.json(formattedLawyers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get lawyer by ID
app.get("/api/lawyers/:id", async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id).populate("userId", "fullName email phoneNumber")

    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found" })
    }

    const reviews = await Review.find({ lawyerId: lawyer._id })
      .populate("clientId", "fullName")
      .sort({ date: -1 })
      .limit(10)

    const formattedReviews = reviews.map((review) => ({
      id: review._id,
      name: review.clientId.fullName,
      rating: review.rating,
      date: review.date,
      text: review.text,
    }))

    res.json({
      id: lawyer._id,
      name: lawyer.userId.fullName,
      email: lawyer.userId.email,
      phone: lawyer.userId.phoneNumber,
      specialization: lawyer.specialization,
      experience: lawyer.experience,
      education: lawyer.education,
      barAdmissions: lawyer.barAdmissions,
      languages: lawyer.languages,
      about: lawyer.about,
      areas: lawyer.areas,
      location: lawyer.location,
      rating: lawyer.rating,
      reviews: lawyer.reviews,
      testimonials: formattedReviews,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get lawyer dashboard data
app.get("/api/lawyer/dashboard", auth, async (req, res) => {
  try {
    if (req.user.role !== "lawyer") {
      return res.status(403).json({ message: "Access denied" })
    }

    const lawyer = await Lawyer.findOne({ userId: req.user._id })

    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer profile not found" })
    }

    // Get active cases
    const activeCases = await Case.find({
      lawyerId: lawyer._id,
      status: { $ne: "Completed" },
    }).countDocuments()

    // Get total clients
    const totalClients = await Case.find({
      lawyerId: lawyer._id,
    })
      .distinct("clientId")
      .countDocuments()

    // Get upcoming appointments (would be implemented with an appointments model)
    const upcomingAppointments = 0

    // Get success rate
    const completedCases = await Case.find({
      lawyerId: lawyer._id,
      status: "Completed",
    })

    const successfulCases = completedCases.filter(
      (c) => c.outcome === "Successful" || c.outcome === "Partially Successful",
    ).length

    const successRate = completedCases.length > 0 ? Math.round((successfulCases / completedCases.length) * 100) : 0

    res.json({
      totalClients,
      activeCases,
      upcomingAppointments,
      successRate,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Send OTP for phone verification
app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { phoneNumber } = req.body

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" })
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // In a real app, you would send this OTP via SMS using a service like Twilio
    // For demo purposes, we'll just return the OTP

    // Store OTP in database or cache with expiration
    // For demo, we'll just return it

    res.json({
      message: "OTP sent successfully",
      otp, // In production, you would NOT return this
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Verify OTP
app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body

    if (!phoneNumber || !otp) {
      return res.status(400).json({ message: "Phone number and OTP are required" })
    }

    // In a real app, you would verify the OTP against what was stored
    // For demo purposes, we'll accept any 6-digit OTP

    if (otp.length !== 6 || isNaN(otp)) {
      return res.status(400).json({ message: "Invalid OTP format" })
    }

    // Generate a temporary token for this verified phone number
    const token = jwt.sign({ phoneNumber }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "1h" })

    res.json({
      message: "Phone number verified successfully",
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
