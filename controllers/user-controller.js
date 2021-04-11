const { User } = require("../models");
const ERR_MSG_NO_USR_FOUND = "No user with this id was found";
const ERR_MSG_NO_CONNECTION_FOUND = "No friend (user) with this id was found";

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getUserById: function ({ params }, res) {
    User.findOne({
      _id: params.id,
    })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: ERR_MSG_NO_USR_FOUND });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser: function ({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(404).json(err));
  },
  updateUser: function ({ params, body }, res) {
    User.findOneAndUpdate(
      {
        _id: params.id,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: ERR_MSG_NO_USR_FOUND });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteUser: function ({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: ERR_MSG_NO_USR_FOUND });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  connectWithUser({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.friendId },
      { $addToSet: { friends: params.userId } },
      { runValidators: true, new: true }
    )
      .then((dbFriendUserData) => {
        if (!dbFriendUserData) {
          res.status(404).json({ message: ERR_MSG_NO_CONNECTION_FOUND });
          return;
        } else {
          User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { runValidators: true, new: true }
          ).then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: ERR_MSG_NO_USR_FOUND });
              return;
            }
            res.json(dbUserData);
          });
        }
      })
      .catch((err) => res.status(400).json(err));
  },
  disconnectWithUser({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.friendId },
      { $pull: { friends: params.userId } },
      { runValidators: true, new: true }
    )
      .then((dbFriendUserData) => {
        if (!dbFriendUserData) {
          res.status(404).json({ message: ERR_MSG_NO_CONNECTION_FOUND });
          return;
        } else {
          User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { runValidators: true, new: true }
          ).then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: ERR_MSG_NO_USR_FOUND });
              return;
            }
            res.json(dbUserData);
          });
        }
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
