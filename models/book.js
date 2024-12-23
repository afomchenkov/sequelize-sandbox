const Sequelize = require("sequelize");

module.exports = (sequelize, Sequalize) => {
  const BookSchema = sequelize.define(
    "Book",
    {
      title: Sequalize.STRING,
      author: Sequalize.STRING,
      category: Sequalize.STRING,
      tags: Sequalize.ARRAY(Sequelize.DataTypes.DECIMAL)
    },
    {
      timestamps: false,
    }
  );

  BookSchema.addHook('afterSave', (instance) => {
    console.log('1 > AFTER SAVE: ', instance);

    const oldProp = instance.previous('title');
    const newProp = instance.get('title');
    
    console.log('2 > AFTER SAVE:', {
      oldProp,
      newProp
    });
  });

  return BookSchema;
};
