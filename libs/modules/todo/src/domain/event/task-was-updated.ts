import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { UpdateTaskDTO } from '@todo/contracts/todo';

export class TaskWasUpdated extends Event<UpdateTaskDTO> {
  constructor(public readonly id: string, public readonly description: string) {
    super(id, { _id: id, description });
  }
}
