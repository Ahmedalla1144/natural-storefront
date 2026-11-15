import { products } from '../data/products.js';
export const cartKey = 'roots-demo-cart-v1';
export function cleanCart(input) {
 if (!Array.isArray(input)) return [];
 return input.slice(0,100).filter(x => {const p=products.find(p=>p.id===x.id);return p && Number.isInteger(x.v) && p.variants[x.v] && Number.isInteger(x.s) && p.sizes[x.s] && Number.isInteger(x.qty) && x.qty>0 && x.qty<=99;}).map(({id,v,s,qty})=>({id,v,s,qty}));
}
export function loadCart(){try{return cleanCart(JSON.parse(localStorage.getItem(cartKey)||'[]'));}catch{return [];}}
export function unitPrice(item){return products.find(p=>p.id===item.id)?.prices[item.v]?.[item.s]||0;}
export function total(cart){return cart.reduce((sum,x)=>sum+unitPrice(x)*x.qty,0);}
export function saveCart(cart){try{localStorage.setItem(cartKey,JSON.stringify(cart));}catch{/* The cart remains available in memory if storage is disabled. */}}
