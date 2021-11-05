import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'price',
  connector: 'rest',
  baseURL: 'https://pytluaq.herokuapp.com',
  crud: false,
  options:{
    headers: {
      accept: 'application/json',
      "content-type": 'application/json'
    }
  },
  operations: [
    //get Price entering kilos and zone
    {
      template: {
        method: "GET",
        url: "https://pytluaq.herokuapp.com/zones"
      },
      functions:{
        getPrice: ["kilos", "zone"]
      }
    },
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PriceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'price';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.price', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
