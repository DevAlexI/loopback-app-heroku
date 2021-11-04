import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {PriceDataSource} from '../datasources';

export interface Price {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  //getState(postalCode: string): Promise<object>;
  getPrice(kilos: number, zone: string): Promise<object>;
}

export class PriceProvider implements Provider<Price> {


  constructor(
    // price must match the name property in the datasource json file
    @inject('datasources.price')
    protected dataSource: PriceDataSource = new PriceDataSource(),
  ) {}

  value(): Promise<Price> {
    return getService(this.dataSource);
  }
}
