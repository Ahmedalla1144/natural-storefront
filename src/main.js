import Alpine from 'alpinejs';
import './style.css';
import {storefront} from './pages/store.js';
import {shell} from './components/shell.js';
document.querySelector('#app').innerHTML=shell(document.body.dataset.page);
Alpine.data('storefront',storefront);
window.Alpine=Alpine;
Alpine.start();
