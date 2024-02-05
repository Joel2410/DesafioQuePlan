import { Module } from '@nestjs/common';
import { MyFriendsService } from './my-friends.service';
import { MyFriendsController } from './my-friends.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MyFriends } from 'src/database/models/my-friends.model';
import { PgListenerService } from 'src/database/services/pg-listener.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Module({
  imports: [SequelizeModule.forFeature([MyFriends]), NotificationsModule],
  providers: [MyFriendsService, PgListenerService, NotificationsGateway],
  controllers: [MyFriendsController],
})
export class MyFriendsModule {}
