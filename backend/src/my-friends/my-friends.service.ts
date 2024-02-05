import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MyFriends } from 'src/database/models/my-friends.model';
import { FriendDTO } from './dtos';

@Injectable()
export class MyFriendsService {
  constructor(
    @InjectModel(MyFriends)
    private myFriends: typeof MyFriends,
  ) {}

  /**
   * The function "getMyFriends" returns a promise that resolves to an array of "MyFriends" objects.
   * @returns a Promise that resolves to an array of MyFriends objects.
   */
  async getMyFirends(): Promise<MyFriends[]> {
    return this.myFriends.findAll();
  }

  /**
   * The function creates or updates a friend record in the database based on the provided FriendDTO
   * object.
   * @param {FriendDTO} friend - The parameter `friend` is of type `FriendDTO`, which is likely a data
   * transfer object representing a friend object with properties such as `id`, `name`, `age`, etc.
   * @returns The function `createOrUpdateFriend` returns a Promise that resolves to a `MyFriends`
   * object.
   */
  async createOrUpdateFriend(friend: FriendDTO): Promise<MyFriends> {
    const myFriend = friend.id
      ? await this.myFriends.findOne({ where: { id: friend.id } })
      : undefined;

    if (!myFriend) return await this.myFriends.create({ ...friend });

    return await myFriend.update(friend);
  }

  /**
   * The function deletes a friend from the database if it exists, otherwise it throws an error.
   * @param {FriendDTO} friend - The parameter `friend` is of type `FriendDTO`, which is likely a data
   * transfer object representing a friend entity.
   */
  async deleteFriend(friend: FriendDTO): Promise<void> {
    const myFriend = friend.id
      ? await this.myFriends.findOne({ where: { id: friend.id } })
      : undefined;

    if (!myFriend) throw new BadRequestException('Friend not found');

    await myFriend.destroy();
  }
}
