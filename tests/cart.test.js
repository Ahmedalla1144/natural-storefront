import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cleanCart,total} from '../src/utils/cart.js';
test('packages multiply the selected size and option price',()=>{assert.equal(total([{id:'olive-oil',v:1,s:1,qty:2},{id:'ajwa',v:0,s:0,qty:3}]),1280);});
test('untrusted saved carts discard invalid products, options and quantities',()=>{assert.deepEqual(cleanCart([{id:'ajwa',v:0,s:1,qty:2},{id:'ajwa',v:1,s:0,qty:1},{id:'bad',v:0,s:0,qty:1},{id:'dates',v:0,s:0,qty:-1},{id:'dates',v:0,s:0,qty:1.5}]),[{id:'ajwa',v:0,s:1,qty:2}]);assert.deepEqual(cleanCart({}),[]);});
