const { Schema, model, Types } = require("mongoose");

const ReactSchema = new Schema({
  reactionId: {
    // set custom id to avoid confusion with parent thought_id
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: "reactionBody is a required field",
    //TODO: 280 character maximum
  },
  username: {
    type: String,
    required: "username is a required field",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //TODO: Use a getter method to format the timestamp on query
  },
});

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "thoughtText is a required field",
      //TODO: Must be between 1 and 280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //TODO: Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: "username is a required field",
    },
    reactions: [ReactSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
