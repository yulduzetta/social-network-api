const router = require("express").Router();

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  connectWithUser,
  disconnectWithUser
} = require("../../controllers/user-controller");

// setup REST
router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).post(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(connectWithUser).delete(disconnectWithUser)

module.exports = router;
