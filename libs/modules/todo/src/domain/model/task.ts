import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

export class Task extends AggregateRoot {
  aggregateId(): string {
    throw new Error('Method not implemented.');
  }
}
