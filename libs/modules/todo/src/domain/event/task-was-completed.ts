import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CompleteTaskDTO } from '@todo/contracts/todo';

export class TaskWasCompleted extends Event<CompleteTaskDTO> {
  constructor(public readonly id: string) {
    super(id, { _id: id });
  }
}
