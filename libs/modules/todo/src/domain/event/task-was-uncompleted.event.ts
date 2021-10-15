import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { UncompleteTaskDTO } from '@todo/contracts/todo';
export class TaskWasUncompleted extends Event<UncompleteTaskDTO> {
  constructor(public readonly id: string) {
    super(id, { _id: id });
  }
}
