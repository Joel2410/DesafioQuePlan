import { Test, TestingModule } from '@nestjs/testing';
import { MyFriendsController } from './my-friends.controller';

describe('MyFriendsController', () => {
  let controller: MyFriendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyFriendsController],
    }).compile();

    controller = module.get<MyFriendsController>(MyFriendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
