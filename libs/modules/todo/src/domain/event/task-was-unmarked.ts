import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { UnmarkTaskDTO } from '@todo/contracts/todo';
export class TaskWasUnmarked extends Event <UnmarkTaskDTO>
{constructor(public readonly id: string) {
        super(id, {_id: id})
    }
}