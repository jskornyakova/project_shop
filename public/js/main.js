const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error));
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error));
        },
        deleteJson(url){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },
    }
})

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         // window.ActiveXObject -> xhr = new ActiveXObject();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         }
//         xhr.send()
//     })
// };
//
// getRequest(url).then(data => console.log(data));

// class List {
//     constructor(url, container){
//         this.container = container;
//         this.url = url;
//         this.data = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }
//     getJson(url){
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => console.log(error))
//     }
//     handleData(data){
//         this.data = [...data];
//         this.render();
//     }
//     getItem(id){
//         return this.allProducts.find(el => el.id_product === id);
//     }
//     render(){
//         const block = document.querySelector(this.container);
//         for (let item of this.data){
//             const product = new lists[this.constructor.name](item);
//             this.allProducts.push(product);
//             block.insertAdjacentHTML('beforeend', product.render());
//         }
//     }
//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(el => regexp.test(el.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible')
//             }
//         })
//     }
//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum + item.price, 0)
//     }
//     _init(){
//         return false;
//     }
//
// }
//
// class Item {
//     constructor(el, img = `https://placehold.it/200x150`){
//         this.id_product = el.id_product;
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.img = img;
//     }
//     render(){
//         return `<div class="product-item"  data-id="${this.id_product}">
//                  <img src="${this.img}" alt="${this.product_name}">
//                  <div class="desc">
//                      <h3>${this.product_name}</h3>
//                      <p>${this.price}</p>
//                      <button class="buy-btn" data-id="${this.id_product}">Купить</button>
//                  </div>
//              </div>`
//     }
// }
//
// class ProductsList extends List {
//     constructor(cart, url='/catalogData.json', container = '.products'){
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('buy-btn')){
//                 let id = +e.target.dataset['id'];
//                 this.cart.addProduct(this.getItem(id));
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value);
//         })
//     }
// }
//
// class ProductItem extends Item {}
// class Cart extends List{
//     constructor(url='/getBasket.json', container = '.cart-block'){
//         super(url, container);
//         this.getJson()
//             .then(data => this.handleData(data.contents));
//     }
//     addProduct(product){
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if(data.result){
//                     let find = this.allProducts.find(el => el.id_product === product.id_product);
//                     if(find){
//                        find.quantity++;
//                        this._updateCart(find);
//                     } else {
//                         let prod = Object.assign({quantity: 1}, product);
//                         this.data = [prod];
//                         this.render();
//                     }
//                 } else {
//                     console.log('Error');
//                 }
//             })
//     }
//     removeProduct(element) {
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result) {
//                     let prodId = +element.dataset['id'];
//                     let find = this.allProducts.find(el => el.id_product === prodId);
//                     if (find.quantity > 1) {
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart-item[data-id="${prodId}"]`).remove();
//                     }
//                 } else {
//                     console.log('Error');
//                 }
//             })
//     }
//     _updateCart(product){
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector(`.product-quantity`).textContent = `Quantity: ${product.quantity}`;
//         block.querySelector(`.product-price`).textContent = `$${product.quantity*product.price}`;
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('del-btn')){
//                 this.removeProduct(e.target);
//             }
//         });
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         })
//     }
// }
// class CartItem extends Item {
//     constructor(el, img = `https://placehold.it/50x100`){
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render(){
//         return `<div class="cart-item" data-id="${this.id_product}">
//                 <div class="product-bio">
//                 <img src="${this.img}" alt="Some image">
//                 <div class="product-desc">
//                 <p class="product-title">${this.product_name}</p>
//                 <p class="product-quantity">Quantity: ${this.quantity}</p>
//                 <p class="product-single-price">$${this.price} each</p>
//                 </div>
//                 </div>
//                 <div class="right-block">
//                 <p class="product-price">$${this.quantity*this.price}</p>
//                 <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                 </div>
//                 </div>`
//     }
// }
// const lists = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// };
//
// const cartSome = new Cart();
// const products = new ProductsList(cartSome);
//

// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 30},
//     {id: 3, title: 'Keyboard', price: 55},
//     {id: 4, title: 'Gamepad', price: 65},
// ];
//
// const renderProduct = (title, price, img = `https://placehold.it/200x150`) => {
//     return `<div class="product-item">
//                  <img src="${img}" alt="${title}">
//                  <div class="desc">
//                      <h3>${title}</h3>
//                      <p>${price}</p>
//                      <button class="buy-btn">Купить</button>
//                  </div>
//              </div>`
// };
//
// const renderPage = list => {
//     // document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
//     for (let product of list){
//         document.querySelector('.products').insertAdjacentHTML('beforeend', renderProduct(product.title, product.price));
//     }
// };
//
// renderPage(products);