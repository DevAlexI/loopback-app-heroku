import {Entity, model, property} from '@loopback/repository';

@model()
export class Price extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
    required: true,
  })
  zone: number;

  @property({
    type: 'number',
    required: true,
  })
  kilos: number;

  @property({
    type: 'number',
    required: true,
  })
  iva: number;

  @property({
    type: 'number',
    required: true,
  })
  comision: number;

  @property({
    type: 'number',
    required: true,
  })
  originalAmount: number;

  @property({
    type: 'number',
    required: true,
  })
  discount: number;


  constructor(data?: Partial<Price>) {
    super(data);
  }
}

export interface PriceRelations {
  // describe navigational properties here
}

export type PriceWithRelations = Price & PriceRelations;
