const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "username field is required",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "email field is required",
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [this],
  },
  {
    toJSON: {
      // Virtuals allow us to add more information to a database response so that
      // we don't have to add in the information manually with a
      // helper before responding to the API request.
      // Virtuals work just like regular functions!
      virtuals: true,

      // Getters let you transform data in MongoDB into a more user friendly form, and setters let you transform user data before it gets to MongoDB.
      // getters DO NOT impact the underlying data stored in MongoDB
      // https://mongoosejs.com/docs/tutorials/getters-setters.html
      getters: true,
    },
    id: false, //We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
