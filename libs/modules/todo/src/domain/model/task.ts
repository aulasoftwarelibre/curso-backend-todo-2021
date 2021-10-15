import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { TaskWasCompleted, TaskWasCreated, TaskWasUpdated } from '../event';
import { Description } from './description';
import { TaskId } from './task-id';

export class Task extends AggregateRoot {
  private _id: TaskId;
  private _description: Description;
  private _isCompleted: boolean;

  public static add(id: TaskId, description: Description): Task {
    const task = new Task();

    task.apply(new TaskWasCreated(id.value, description.value));
    return task;
  }

  aggregateId(): string {
    return this._id.value;
  }

  get id(): TaskId {
    return this._id;
  }

  get description(): Description {
    return this.description;
  }

  public complete(id: TaskId): Task {
    if(this._isCompleted) {
      return;
    }

    this.apply(new TaskWasCompleted(id.value));

    return this;
  }

  public describe(description: Description): void {
    if (this._description.equals(description)) {
      return;
    }

    this.apply(new TaskWasUpdated(this._id.value, description.value));
  }

  private onTaskWasCompleted() {
    this._isCompleted = true;
  }

  private onTaskWasCreated(event: TaskWasCreated) {
    this._id = TaskId.with(event.payload._id);
    this._description = Description.withString(event.payload.description);
  }

  private onTaskWasUpdated(description: Description): void {
    this._description = Description.withString(description.value);
  }
}
