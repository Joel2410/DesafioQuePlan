import { Injectable, Logger } from '@nestjs/common';
import createSubscriber, { Subscriber } from 'pg-listen';
import { dbConfig } from '../db.config';
import { Data } from '../../interfaces';
import { ConfigService } from '@nestjs/config';

type notificationCallBack = (payload: Data) => void;
const notificationName = 'backend_notification';

@Injectable()
export class PgListenerService {
  subscriber: Subscriber;
  onNotification: notificationCallBack;

  constructor(private configService: ConfigService) {
    this.subscriber = createSubscriber({
      ...dbConfig(configService),
      user: dbConfig(this.configService).username,
    });

    /* Setting up an event listener for the 'notificationName' event on the `notifications`
    object of the `subscriber` to listen notifications from the data base. */
    this.subscriber.notifications.on(notificationName, (payload: Data) => {
      Logger.debug(`Received notification in "${notificationName}":`, payload);
      this.onNotification(payload);
    });

    /* Sets up an event listener for the 'error' event on the `events` object of the `subscriber`
    to close the app when an error occurs. */
    this.subscriber.events.on('error', (error: any) => {
      Logger.error('Fatal database connection error:', error);
      process.exit(1);
    });

    /* Setting up an event listener for the 'exit' event of the Node.js process to close the `subscriber`. */
    process.on('exit', () => {
      this.subscriber.close();
    });
  }

  /**
   * The function "listen" is an asynchronous function that connects to a subscriber and listens for
   * notifications on a specific channel.
   * @param {notificationCallBack} onNotificationCallBack - The onNotificationCallBack is a callback
   * function that will be called whenever a notification is received. It is a function that you can
   * define and pass as an argument to the listen function.
   */
  async listen(onNotificationCallBack: notificationCallBack) {
    this.onNotification = onNotificationCallBack;
    await this.subscriber.connect();
    await this.subscriber.listenTo(notificationName);
  }
}
