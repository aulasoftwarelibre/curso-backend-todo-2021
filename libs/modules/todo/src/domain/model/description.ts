import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { stringify } from 'querystring';

interface Props {
  value: string;
}

export class Description extends ValueObject<Props> {
  public static withString(value: string) {
    if (value.length < 10) {
      throw DomainError.because(
        'Las descripciones deben ser mayor de 10 caracteres'
      );
    }

    return new Description({ value });
  }

  get value(): string {
    return this.props.value;
  }
}
