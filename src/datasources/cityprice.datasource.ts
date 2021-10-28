import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'cityprice',
  connector: 'mongodb',
  url: 'mongodb://ajimenez:aKd6HjHb9MsXJw@147.182.187.121:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  host: '147.182.187.121',
  port: 27017,
  user: 'ajimenez',
  password: 'aKd6HjHb9MsXJw',
  database: 'ajimenez_production',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CitypriceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'cityprice';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.cityprice', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
