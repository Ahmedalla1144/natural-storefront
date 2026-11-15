import {products} from '../data/products.js';
import {translations} from '../i18n/translations.js';
import {loadCart,saveCart,total,unitPrice} from '../utils/cart.js';
const params = new URLSearchParams(location.search);
export function storefront(){return {
 lang:params.get('lang')==='en'?'en':'ar', products, cart:loadCart(), query:'', category:'all', sort:'featured', page:1, perPage:4, v:0,s:0,qty:1,photo:0, success:false,errors:{},customer:{name:'',phone:'',notes:''}, notice:'',
 product:products.find(p=>p.id===params.get('id')),
 init(){document.documentElement.lang=this.lang;document.documentElement.dir=this.lang==='ar'?'rtl':'ltr';document.title=`${this.t('brand')} · ${this.t('shop')}`;this.$watch('cart',()=>saveCart(this.cart));this.$watch('query',()=>this.page=1);this.$watch('category',()=>this.page=1);this.$watch('sort',()=>this.page=1);},
 t(key){return translations[this.lang][key]||key;},name(p){return p.name[this.lang];},money(n){return new Intl.NumberFormat(this.lang==='ar'?'ar-EG':'en-EG',{maximumFractionDigits:0}).format(n)+' '+this.t('currency');},image(p){return `${import.meta.env.BASE_URL}images/figma-${p.image}`;},url(page='index.html',id){return `${page}?lang=${this.lang}${id?'&id='+encodeURIComponent(id):''}`;},switchLanguage(){const url=new URL(location.href);url.searchParams.set('lang',this.lang==='ar'?'en':'ar');location.href=url.href;},
 get filtered(){let list=this.products.filter(p=>(this.category==='all'||p.category===this.category)&&this.name(p).toLowerCase().includes(this.query.trim().toLowerCase()));if(this.sort!=='featured')list.sort((a,b)=>(a.prices[0][0]-b.prices[0][0])*(this.sort==='low'?1:-1));return list;},get pages(){return Math.max(1,Math.ceil(this.filtered.length/this.perPage));},get visible(){return this.filtered.slice((this.page-1)*this.perPage,this.page*this.perPage);},get count(){return this.cart.reduce((n,x)=>n+x.qty,0);},get total(){return total(this.cart);},get price(){return this.product?.prices[this.v][this.s]*this.qty||0;},
 itemProduct(x){return products.find(p=>p.id===x.id);},lineTotal(x){return unitPrice(x)*x.qty;},
 add(p,v=0,s=0,qty=1){const item=this.cart.find(x=>x.id===p.id&&x.v===v&&x.s===s);if(item)item.qty=Math.min(99,item.qty+qty);else this.cart.push({id:p.id,v,s,qty});this.notice=this.t('added');this.openCart();},
 change(i,delta){this.cart[i].qty=Math.max(1,Math.min(99,this.cart[i].qty+delta));},remove(i){this.cart.splice(i,1);},
 openCart(){this.$refs.cartDialog.showModal();},closeCart(){this.$refs.cartDialog.close();},
 submit(){this.errors={};if(this.customer.name.trim().length<2)this.errors.name=this.t('requiredName');const phone=this.customer.phone.replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[\s()-]/g,'');if(!/^(?:\+20|0020|0)1[0125]\d{8}$/.test(phone))this.errors.phone=this.t('requiredPhone');if(Object.keys(this.errors).length){this.$nextTick(()=>document.querySelector('[aria-invalid="true"]')?.focus());return;}if(!this.cart.length)return;this.customer={name:'',phone:'',notes:''};this.cart=[];saveCart([]);this.success=true;this.$nextTick(()=>this.$refs.success.focus());}
};}
