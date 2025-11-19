import Blog from './blog.js';
import User from './user.js';
import UserBlogs from './user_blogs.js';

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, {
  through: UserBlogs, as: 'marked_blogs'
});
Blog.belongsToMany(User, {
  through: UserBlogs, as: 'users_marked'
});

export { Blog, User, UserBlogs };
