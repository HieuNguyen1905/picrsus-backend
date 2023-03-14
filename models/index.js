const User = require("./user");
const Post = require("./posts");

User.hasMany(Post);
Post.belongsTo(User)

module.exports = {
    User,
    Post
}