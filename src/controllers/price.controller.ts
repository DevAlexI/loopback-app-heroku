// Uncomment these imports to begin using these cool features!
import {get} from '@loopback/rest';

// import {inject} from '@loopback/core';


export class PriceController {
  @get('/price/{id}')
  getPrice(price: number){
    return `Price: ${price}`;
  }

  @get('/zone/{id}')
  getZone(zone: number){
    return `Zone: ${zone}`;
  }

  @get('/iva/{id}')
  getIva(price: number, zone: number) {
    let iva = 0;
    switch ( zone ) {
      case 1:
          iva = 0.16;
          break;
      case 2:
          iva = 0.17;
          break;
      case 3:
          iva = 0.15;
          break;
      case 4:
          iva = 0.12;
          break;
      case 5:
          iva = 0.10;
          break;
      default:
          console.log("No zone found");
   }

   return price * iva;
  }

  @get('/comision/{id}')
  getComision(price: number, zone: number) {
    let comision = 0;

    switch ( zone ) {
      case 1:
        comision = 0.8;
        break;
      case 2:
          comision = 0.15;
          break;
      case 3:
          comision = 0.20;
          break;
      case 4:
          comision = 0.6;
          break;
      case 5:
          comision = 0.5;
          break;
      default:
          console.log("No zone found");
          break;
   }

   return price * comision;
  }

  @get('/total/{id}')
  getTotal(price: number, zone: number){
    const iva = this.getIva(price, zone);
    const comision = this.getComision(price, zone);

    return price + iva + comision;
  }
}
