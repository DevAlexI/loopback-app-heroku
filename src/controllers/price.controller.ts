// Uncomment these imports to begin using these cool features!
//import {inject} from '@loopback/context';
import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {Price} from '../services/index';

export class PriceController {

    constructor(
      @inject('service.Price')
    protected priceService : Price
    ) {}


  @get('/prices/{kilos}&{zone}')
  async getTotal(@param.path.number('kilos') kilos: number, @param.path.string('zone') zone: string): Promise<object>{
    const getPrice = await this.priceService.getPrice(kilos, zone);
    console.log(getPrice);
    return getPrice;
  }


 /* @get('/iva/{id}')
  async getIva(price: object, zone: string) {
    let iva = 0;
    switch ( zone ) {
      case 'zona1':
          iva = 0.16;
          break;
      case 'zona2':
          iva = 0.17;
          break;
      case 'zona3':
          iva = 0.15;
          break;
      case 'zona4':
          iva = 0.12;
          break;
      case 'zona5':
          iva = 0.10;
          break;
      default:
          console.log("No zone found");
   }

   return price.price * iva;
  }

  @get('/comision/{id}')
  async getComision(price: object, zone: string): Promise<Number> {
    let comision = 0;

    switch ( zone ) {
      case 'zona1':
        comision = 0.8;
        break;
      case 'zona2':
          comision = 0.15;
          break;
      case 'zona3':
          comision = 0.20;
          break;
      case 'zona4':
          comision = 0.6;
          break;
      case 'zona5':
          comision = 0.5;
          break;
      default:
          console.log("No zone found");
          break;
   }

   return price * comision;
  }



  @post('/tickets/descuentos/{monto}&{metodo_pago}%{cupon}&{zona}&{envio}')
  async setValuesForDiscount(){
    const coupons = ['MASTER20', 'PERRITOFELI', 'NOJADO'];
    const metodoPago = ['mastercard', 'visa', 'paypal'];

    const myCoupons = coupons[Math.floor(Math.random() * coupons.length)];
    const myMetodoPago = metodoPago[Math.floor(Math.random() * metodoPago.length)];

    return {
      monto: get
      cupon: myCoupons,
      metodoPago: myMetodoPago
    }
  }*/
}
