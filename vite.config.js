import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({base:'/natural-storefront/',plugins:[tailwindcss()],build:{rollupOptions:{input:{home:'index.html',product:'product.html',checkout:'checkout.html'}}}});
