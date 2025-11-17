import Blog from './blog.js';
import User from './user.js';
import Team from './team.js';
import Membership from './membership.js';

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

export { Blog, User, Team, Membership };
