import { DataTypes, Op } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('blogs', 'year', {
    type: DataTypes.INTEGER,
    allowNull: true
  });

  await queryInterface.addConstraint('blogs', {
    type: 'check',
    fields: ['year'],
    name: 'year_must_be_valid',
    where: {
      year: {
        [Op.gte]: 1991,
        [Op.lte]: (new Date()).getFullYear()
      }
    }
  })
};

export const down = async ({ context: queryInterface}) => {
  await queryInterface.removeColumn('blogs', 'year');
};
