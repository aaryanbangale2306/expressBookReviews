const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Session middleware available across application
app.use(session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

// Authentication middleware
function authMiddleware(req, res, next) {
  let token = null;

  if (req.session && req.session.authorization) {
    token = req.session.authorization['accessToken'];
  } else if (req.headers['authorization']) {
    const authHeader = req.headers['authorization'];
    token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  }

  if (token) {
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
}

app.use("/customer/auth/*", authMiddleware);
app.use("/auth/*", authMiddleware);

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", customer_routes); // Supports /auth/review/:isbn directly as well
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
