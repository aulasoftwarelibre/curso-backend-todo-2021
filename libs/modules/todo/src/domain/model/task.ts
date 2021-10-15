import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { TaskWasCreated } from '../event';
import { Description } from './description';
import { TaskId } from './task-id';

export class Task extends AggregateRoot {
  private _id: TaskId;
  private _description: Description;

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

  private onTaskWasCreated(event: TaskWasCreated) {
    this._id = TaskId.with(event.payload._id);
    this._description = Description.withString(event.payload.description);
  }
}
