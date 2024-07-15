module.exports = (sequelize, Sequalize) => {
  const BookSchema = sequelize.define(
    "Book",
    {
      title: Sequalize.STRING,
      author: Sequalize.STRING,
      category: Sequalize.STRING,
    },
    {
      timestamps: false,
    }
  );
  return BookSchema;
};
