import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'my_friends', timestamps: false })
export class MyFriends extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: true })
  id: bigint;

  @Column
  name: string;

  @Column
  gender: string;
}
