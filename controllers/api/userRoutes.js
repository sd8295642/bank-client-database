const router = require("express").Router();
// Import the User model from the models folder
const { User } = require("../../models");
const speakeasy = require("speakeasy");
const bcrypt = require("bcrypt");
const qrcode = require("qrcode");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate a unique secret key for the user
    const secret = speakeasy.generateSecret({ length: 20 });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // Save the user's data, including the secret key, in the database
    const userData = await User.create({
      email,
      password,
      secret: secret.base32,
    });

    // Generate a QR code for the user's authenticator app
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) {
        return res.status(500).send("Error generating QR code");
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json({
          user: userData,
          qrCode: data_url,
          message:
            "Registration successful. Scan the QR code with your authenticator app.",
        });
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password, token } = req.body;

    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      console.log("User not found for email:", email);
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    console.log("Stored Hashed Password:", userData.password);

    const validPassword = await bcrypt.compare(password, userData.password);
    console.log("Valid Password:", validPassword);

    if (!validPassword) {
      console.log("Invalid password for email:", email);
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Verify the OTP if the user has a secret key (2FA enabled)
    console.log("Stored Secret:", userData.secret); // Debugging
    console.log("Token provided:", token); // Debugging

    if (userData.secret) {
      console.log("Verifying 2FA token for email:", email);
      const verified = speakeasy.totp.verify({
        secret: userData.secret,
        encoding: "base32",
        token,
      });

      if (!verified) {
        console.log("Invalid 2FA token for email:", email);
        return res.status(401).send("Invalid token");
      }
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      console.log("User logged in:", email);
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
