const router = require("express").Router();

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// setup REST
router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
