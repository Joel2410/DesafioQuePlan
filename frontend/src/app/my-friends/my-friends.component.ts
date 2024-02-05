import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MyFriendsService } from './my-friends.service';
import { NotificationsComponent } from '../components';
import { Data, Friend } from '../interfaces';
import { Actions } from '../helpers';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrl: './my-friends.component.scss',
})
export class MyFriendsComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['id', 'name', 'gender'];
  public dataSource: MatTableDataSource<Friend> = new MatTableDataSource();

  private notificationsSubscription = new Subscription();
  private friendsSubscription = new Subscription();
  private durationInSeconds = 10;

  constructor(
    private myFriendService: MyFriendsService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * The ngOnInit function initializes the component by listening for notifications and finding
   * friends.
   */
  public ngOnInit(): void {
    this.listenNotifications();
    this.findFriends();
  }

  /**
   * The ngOnDestroy function unsubscribes from a notifications subscription.
   */
  public ngOnDestroy(): void {
    this.notificationsSubscription.unsubscribe();
    this.friendsSubscription.unsubscribe();
  }

  /**
   * The function "listenNotifications" subscribes to a service that retrieves new messages, updates
   * the data source with the payload, and displays a snackbar with the changes.
   */
  private listenNotifications(): void {
    this.notificationsSubscription = this.myFriendService
      .getNewMessage('newMessage')
      .subscribe((payload: Data) => {
        this.updateDataSource(payload);
        const message = this.getChanges(payload);
        this.openSnackBar(message);
      });
  }

  /**
   * The function updates the data source by either adding,  updating or deleting a friend object
   * based on the payload action.
   * @param {Data} payload - The payload parameter is an object that contains information about the
   * action being performed and the data being updated. It has the following properties:
   */
  private updateDataSource(payload: Data): void {
    const updatedFriend =
      payload.action == Actions.DELETE ? payload.old_data : payload.new_data;

    const index = this.dataSource.data.findIndex(
      (friend) => friend.id == updatedFriend.id
    );

    if (index !== -1) {
      if (payload.action == Actions.DELETE) {
        this.dataSource.data.splice(index, 1);
      } else {
        this.dataSource.data[index] = payload.new_data;
      }
    } else {
      this.dataSource.data.push(updatedFriend);
    }
    this.dataSource._updateChangeSubscription();
  }

  /**
   * The function "findFriends" retrieves a list of friends from a service and assigns it to a data
   * source.
   */
  private findFriends(): void {
    this.friendsSubscription = this.myFriendService
      .getFriends()
      .subscribe((payload: Friend[]) => {
        this.dataSource.data = payload;
      });
  }

  /**
   * The function `getChanges` takes in a `Data` object and returns a string describing the changes
   * made based on the action specified in the object.
   * @param {Data} data - The `data` parameter is an object that contains information about the action
   * performed on a table. It has the following properties:
   * @returns a string that represents the changes made to a data object.
   */
  private getChanges(data: Data): string {
    let changes = '';
    switch (data.action) {
      case Actions.UPDATE:
        this.findDifferences(data.old_data, data.new_data).forEach(
          (diffrence) => {
            if (changes.length > 0) changes += '; ';
            changes += `${diffrence} de la tabla "${data.table}"`;
          }
        );
        break;
      case Actions.INSERT:
        changes = `Se agregó a "${data.new_data.name}" a la tabla "${data.table}"`;
        break;
      case Actions.DELETE:
        changes = `Se eliminó a "${data.old_data.name}" de la tabla "${data.table}"`;
        break;
    }
    return changes;
  }

  /**
   * The function `findDifferences` compares two objects and returns an array of strings indicating the
   * differences between the two objects.
   * @param {any} obj1 - The first object to compare.
   * @param {any} obj2 - The `obj2` parameter is an object that represents the updated version of an
   * object.
   * @returns an array of strings, which represents the differences between the properties of `obj1`
   * and `obj2`.
   */
  private findDifferences(obj1: any, obj2: any): string[] {
    const differences: string[] = [];

    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          differences.push(
            `El valor "${obj1[key]}" se actualizó por "${obj2[key]}" en la columna "${key}"`
          );
        }
      }
    }

    return differences;
  }

  /**
   * The applyFilter function filters the data source based on the value entered in an HTML input
   * element.
   * @param {Event} event - The event parameter is of type Event, which represents an event that occurs
   * in the browser. It can be any type of event, such as a click event, keydown event, or input event.
   */
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * The openSnackBar function opens a snackbar notification with the given message.
   * @param {string} message - The message parameter is a string that represents the content of the
   * notification message that will be displayed in the snackbar.
   */
  private openSnackBar(message: string) {
    this.snackBar.openFromComponent(NotificationsComponent, {
      data: message,
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
