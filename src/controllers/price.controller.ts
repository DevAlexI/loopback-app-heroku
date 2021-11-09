// Uncomment these imports to begin using these cool features!
//import {inject} from '@loopback/context';
import {inject} from '@loopback/core';
import {get, param, response, ResponseObject} from '@loopback/rest';
import {Price} from '../services/index';


const PRICE_RESPONSE: ResponseObject = {
  description: 'Price Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PriceResponse',
        properties: {
          name: {type: 'string'},
          weight: {type: 'string'},
          cost: {type: 'number'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};
export class PriceController {

    constructor(
      @inject('service.Price')
    protected priceService : Price
    ) {}


  @get('/prices/{kilos}&{zone}')
  @response(200, PRICE_RESPONSE)
  async getTotal(@param.path.number('kilos') kilos: number, @param.path.string('zone') zone: string): Promise<object>{
    const getPrice = await this.priceService.getPrice(kilos, zone); //Obteniendo array con objetos
    //Encontrar el objeto con el array y guardar el valor en la variable
    console.log(getPrice);

    const obj = getPrice.find(o => o.Name === zone);

    const iva = await this.getIva(zone);
    const comision = await this.getComision(zone);
    const monto = obj.cost;
    const montoIva = monto * iva;
    const montoComision = monto * comision;
    const tot = montoIva + montoComision;

    return {
      montoTotal: monto,
      iva: iva,
      comision: comision,
      total: tot
    };

  }


  @get('/iva/{zone}')
  async getIva(zone: string): Promise<number> {
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

   return iva;
  }

  @get('/comision/{zone}')
  async getComision(zone: string): Promise<number> {
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

   return comision;
  }



  @get('/tickets/descuentos/{monto}&{metodo_pago}%{cupon}&{zona}&{envio}')
  async setValuesForDiscount(): Promise <object>{
    const coupons = ['MASTER20', 'PERRITOFELI', 'NOJADO'];
    const metodoPago = ['mastercard', 'visa', 'paypal'];

    const myCoupons = coupons[Math.floor(Math.random() * coupons.length)];
    const myMetodoPago = metodoPago[Math.floor(Math.random() * metodoPago.length)];

    return {
      monto: get,
      cupon: myCoupons,
      metodoPago: myMetodoPago
    }
  }
}
