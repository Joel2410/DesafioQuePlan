import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { PgListenerService } from '../database/services';
import { MyFriendsService } from './my-friends.service';
import { MyFriends } from '../database/models';
import { Data } from '../interfaces';
import { FriendDTO } from './dtos';

@Controller('my-friends')
export class MyFriendsController {
  constructor(
    private readonly myFriendsService: MyFriendsService,
    private readonly pgListenerService: PgListenerService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {
    // Listen PG Notifications
    this.pgListenerService.listen((payload: Data) => {
      // Send notification to client by web socket
      this.notificationsGateway.send(payload);
    });
  }

  @Get()
  /**
   * The function "getMyFriends" returns a promise that resolves to an array of "MyFriends" objects.
   * @returns a Promise that resolves to an array of MyFriends objects.
   */
  getMyFriends(): Promise<MyFriends[]> {
    return this.myFriendsService.getMyFirends();
  }

  @Post()
  /**
   * The function creates or updates a friend using the provided payload.
   * @param {FriendDTO} payload - The payload parameter is of type FriendDTO, which is an object
   * containing the data for creating or updating a friend.
   * @returns a Promise of type MyFriends.
   */
  createOrUpdateFriend(@Body() payload: FriendDTO): Promise<MyFriends> {
    return this.myFriendsService.createOrUpdateFriend(payload);
  }

  @Delete()
  /**
   * The function `deleteFriend` takes a payload of type `FriendDTO` and returns a promise that
   * resolves to void.
   * @param {FriendDTO} payload - The payload parameter is of type FriendDTO, which is an object
   * containing information about the friend to be deleted.
   * @returns The deleteFriend method is returning a Promise<void>.
   */
  deleteFriend(@Body() payload: FriendDTO): Promise<void> {
    return this.myFriendsService.deleteFriend(payload);
  }
}
