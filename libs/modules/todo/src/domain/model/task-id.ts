import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class TaskId extends Id {
  public static with(id: string): TaskId {
    return new TaskId(id);
  }
}
