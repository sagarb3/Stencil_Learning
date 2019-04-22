/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface Sb3StockPrice {
    'stockSymbol': string;
  }
  interface Sb3StockPriceAttributes extends StencilHTMLAttributes {
    'stockSymbol'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'Sb3StockPrice': Components.Sb3StockPrice;
  }

  interface StencilIntrinsicElements {
    'sb3-stock-price': Components.Sb3StockPriceAttributes;
  }


  interface HTMLSb3StockPriceElement extends Components.Sb3StockPrice, HTMLStencilElement {}
  var HTMLSb3StockPriceElement: {
    prototype: HTMLSb3StockPriceElement;
    new (): HTMLSb3StockPriceElement;
  };

  interface HTMLElementTagNameMap {
    'sb3-stock-price': HTMLSb3StockPriceElement
  }

  interface ElementTagNameMap {
    'sb3-stock-price': HTMLSb3StockPriceElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}