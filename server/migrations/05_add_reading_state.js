import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('user_blogs', 'read', {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  });
};

export const down = async ({ context: queryInterface}) => {
  await queryInterface.removeColumn('user_blogs', 'year');
};
