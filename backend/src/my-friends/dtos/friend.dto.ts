import { MinLength, MaxLength } from 'class-validator';

export class FriendDTO {
  id?: bigint;

  @MinLength(4)
  @MaxLength(60)
  name?: string;

  @MaxLength(1)
  gender?: string;
}
