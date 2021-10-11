require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USER,
  process.env.DB_PASS,

  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

//TO CREATE A MODEL and POPULATE A TABLE WITH COLUMNS
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
  },
});

/*
 *One to One Rel - Example: User has the profile, the profile belongs to the user
 *
 */
//TO CREATE A PROFILE FOR USERS TO SEE
const Profile = sequelize.define("Profile", {
  birthday: {
    type: DataTypes.DATE,
  },
});

User.hasOne(Profile);
Profile.belongsTo(User);

//CASCADE OPTION - IF I DELETE A USER, THE PROFILE SHOULD BE DELETED TOO
User.hasOne(Profile, {
  onDelete: "CASCADE",
});
Profile.belongsTo(User);

/*
 *One to Many - A USER HAVING MULTIPLE POSTS
 *
 */
const Post = sequelize.define("Post", {
  content: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Post);
Post.belongsTo(User);
/*
 *Many to Many
 *
 */
//GETTING ALL REVIEWS ASSOCIATED WITH A USER
const Review = sequelize.define("Review", {
  username: {
    type: DataTypes.STRING,
  },
  review: {
    type: DataTypes.STRING,
  },
  datePosted: {
    type: DataTypes.DATE,
  },
});

User.belongsToMany(Review, { through: "Users_Reviews" });
Review.belongsToMany(User, { through: "Users_Reviews" });
(async () => {
  await sequelize.sync({ force: true });

  let my_user = await User.create({
    username: "Courtney",
  });
  let my_profile = await Profile.create({
    birthday: new Date(),
  });
  console.log(await my_user.getProfile());
  await my_user.setProfile(my_profile);
  await my_user.getProfile();
  console.log(await my_user.getProfile());

  let resultUser = await User.findOne({
    where: {
      id: 1,
    },
  });
  console.log(await resultUser.getProfile());
})();
