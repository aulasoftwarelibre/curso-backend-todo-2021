import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { RemoveTaskDTO } from '@todo/contracts/todo';
export class TaskWasRemoved extends Event<RemoveTaskDTO> {
  constructor(public readonly id: string) {
    super(id, { _id: id });
  }
}
