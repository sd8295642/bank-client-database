const router = require("express").Router();
// Import the User model from the models folder
const { User } = require("../../models");
const speakeasy = require("speakeasy");
const bcrypt = require("bcrypt");

// "/users" route
// Route to register a new user... change to "/register"?
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Generate a unique secret key for the user
    const secret = speakeasy.generateSecret({ length: 20 });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user's data, including the secret key, in the database
    const userData = await User.create({
      email,
      password: hashedPassword,
      secret: secret.base32,
    });

    // Generate a QR code for the user's authenticator app
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) {
        return res.status(500).send("Error generating QR code");
      }
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Send the QR code to the user
      res.send(
        `<img src="${data_url}"><p>Scan the QR code with your authenticator app</p>`
      );
      res.status(200).json(userData);
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
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await bcrypt.compare(password, userData.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Verify the OTP if the user has a secret key (2FA enabled)
    if (userData.secret) {
      const verified = speakeasy.totp.verify({
        secret: userData.secret,
        encoding: "base32",
        token,
      });

      if (!verified) {
        return res.status(401).send("Invalid token");
      }
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
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
