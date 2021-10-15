import {
  EVENTSTORE_KEYSTORE_CONNECTION,
  EventStoreModule,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from '@todo/modules/todo';
import { ConsoleModule } from 'nestjs-console';

import configuration from './app.config';
import { AppLoggerMiddleware } from './app.middleware';
import { appProviders } from './app.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ConsoleModule,
    CqrsModule,
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost/counter'
    ),
    MongooseModule.forRoot(
      process.env.KEYSTORE_URI || 'mongodb://localhost/keystore',
      {
        connectionName: EVENTSTORE_KEYSTORE_CONNECTION,
      }
    ),
    EventStoreModule.forRoot({
      category: process.env.EVENTSTORE_STREAM || 'counter',
      connection:
        process.env.EVENTSTORE_URL || 'esdb://localhost:2113?tls=false',
    }),
    // Project modules
    TodoModule,
  ],
  providers: [...appProviders],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
