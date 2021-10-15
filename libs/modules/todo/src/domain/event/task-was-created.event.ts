import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateTaskDTO } from '@todo/contracts/todo';

export class TaskWasCreated extends Event<CreateTaskDTO> {
  constructor(public readonly id: string, public readonly description: string) {
    super(id, { _id: id, description });
  }
}
