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
        url: "https://pytluaq.herokuapp.com/zones?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%22string%22%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22name%22%3A%22{zone}%22%2C%0A%20%20%20%20%22weight%22%3A%20{kilos}%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22name%22%3A%20true%2C%0A%20%20%20%20%22weight%22%3A%20true%2C%0A%20%20%20%20%22cost%22%3A%20true%2C%0A%20%20%20%20%22time%22%3A%20true%0A%20%20%7D%0A%7D"
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
