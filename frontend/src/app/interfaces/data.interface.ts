import { Actions } from '../helpers';
import { Friend } from './friend.interface';

export interface Data {
  table: string;
  action: Actions;
  new_data: Friend;
  old_data: Friend;
}
