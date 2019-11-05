const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post");

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer that 2 characters."
    },
    required: [true, "Name is required."]
  },
  likes: Number,
  posts: [PostSchema],
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogpost"
    }
  ]
});

// do not pass a arrow function to vistual().get(...), because that function makes use of this.
UserSchema.virtual("postCount").get(function() {
  return this.posts.length;
});

// same as with virtual
/**
 * Remove hook that deletes all dependent BlogPost from the BlogPost collection.
 */
UserSchema.pre("remove", function(next) {
  const BlogPost = mongoose.model("blogpost");
  // deprecated i think. use deleteMany in future
  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
