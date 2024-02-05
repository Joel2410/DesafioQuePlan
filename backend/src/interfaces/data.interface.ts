import { MyFriends } from 'src/database/models/my-friends.model';

export interface Data {
  table: string;
  action: string;
  new_data: MyFriends;
  old_data: MyFriends;
}
