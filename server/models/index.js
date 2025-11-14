import { sequelize } from '../util/db.js';

import Blog from './blog.js';
import User from './user.js';

User.hasMany(Blog);
Blog.belongsTo(User);

await sequelize.sync({ alter: true });

export { Blog, User };
