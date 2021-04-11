const router = require("express").Router();

// Import API routes from /api/index.js
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("non-existent API route was hit");
});

module.exports = router;
