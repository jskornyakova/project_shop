Vue.component('cart', {
    props: ['kind'],
    data() {
        return {
            cartUrl: `./userCart.json`,
            cartItems: [],
            imgCart: `https://placehold.it/72x85`,
            message: ""
        }
    },
    computed: {
        total: function() {
            if (!this.cartItems.length) {
                return 0;
            }

            return this.cartItems.reduce((accum, item) => accum + (item.price * item.quantity), 0);

        }
    },

    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            }


            // this.$parent.getJson(`${API}/deleteFromBasket.json`)
            //     .then(data => {
            //         if (data.result) {
            //             if (product.quantity > 1) {
            //                 product.quantity--
            //             } else {
            //                 this.cartItems.splice(this.cartItems.indexOf(product), 1);
            //             }
            //         } else {
            //             console.log('error!')
            //         }
            //     })
        },
        changeQuantity(product, quantity){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: +quantity - find.quantity})
                    .then(data => {
                        if (data.result) {
                            find.quantity = +quantity;
                        }
                    })
            }
        },
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `<cart-small
                    :total="total"
                    :cartItems="cartItems"
                    @remove="remove"
                    v-if="kind === 'small'"></cart-small>
               <cart-grid
                    :total="total"
                    :cartItems="cartItems"
                    @remove="remove"
                    @changeQuantity="changeQuantity"
                    v-else-if="kind === 'big'"></cart-grid>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'imgCart'],
    template: `<div class="drop_product_cart">
                    <a href="single_page.html"><img :src="imgCart" alt="" class="img-cart">
                    <h2 class="h2-cart">{{cartItem.product_name}}</h2></a> <div class="star-cart"><img src="img/star.png" alt="" >
                    <img src="img/delete.png" alt="" class="delete" @click="$emit('remove', cartItem)"></div>
                    <br>
                    <h2 class="h2-cart"><span class="pink">
                    {{cartItem.quantity}} x $ {{cartItem.price}}</span></h2> </div>
                </div>`,
});

Vue.component('cart-small',{
    props: ['cartItems','imgCart', 'total', 'product', 'quantity'],
    data(){
        return {
            showCart: false
        }
    },
    methods: {
        remove(cartItem) {
            this.$emit('remove', cartItem);
        }
    },
    template:`
    <div class="header__right_cart">
                    <button class="header__right_cart-btn" @click="showCart = !showCart"><img src="img/cart.svg" alt="cart"></button>
                    <div class="drop-cart" v-show="showCart">
                            <p class="drop-cart-p" v-if="!cartItems.length">Cart is empty</p>
                            <cart-item 
                            v-for="item of cartItems" 
                            :key="item.id_product"
                            :imgCart="item.imgCart"
                            :cart-item="item"
                            @remove="remove"></cart-item>
                            <p v-if="!cartItems.length"><h1 class="h1-cart">TOTAL<span>$ {{total}}</span></h1></p>
                            <br>
                            <div class="button_cart bas"><a href="checkout.html">Checkout</a></div>
                            <br>
                            <div class="button_cart bas"><a href="shopping_cart.html">Go to cart</a></div>
                    </div>
                </div>
    `,
});

Vue.component('grid-item', {
    props: ['gridItem', 'imgCart'],
    template: `
                    <div class="d-tr">
                        <div class="d-td"><img :src="imgCart" alt="">
                            <h2><a class="product__link" href="single_page.html">{{gridItem.product_name}}</a></h2>
                            <p>Color: {{gridItem.color}}
                                <br>Size: {{gridItem.size}}</p>
                        </div>
                        <div class="d-td">$ {{gridItem.price}}</div>
                        <form class="d-td">
                            <input 
                            :value="gridItem.quantity"
                            @input="$emit('input', gridItem, $event.target.value)"
                          type="number" name="num1" min="1" max="10"> 
                        </form>
                        <div class="d-td">{{gridItem.shipping}}</div>
                        <div class="d-td">$ {{gridItem.quantity*gridItem.price}}</div>
                        <div class="d-td d-td_delete">
                            <a href="#"><img src="img/delete.png" alt="" @click="$emit('remove', gridItem)"></a>
                        </div>
                        </div>`
});
Vue.component('cart-grid',{
    props: ['cartItems','imgCart', 'total', 'product', 'quantity'],
    methods: {
        remove(gridItem) {
            this.$emit('remove', gridItem);
        },
        changeQuantity(product, quantity) {
            this.$emit('changeQuantity', product, quantity)
        }
    },
    template:`<div class="d-tr">
                    <div class="d-tr zaglav">
                        <div class="d-td">Product Details</div>
                        <div class="d-td">unite Price</div>
                        <div class="d-td">Quantity</div>
                        <div class="d-td">shipping</div>
                        <div class="d-td">Subtotal</div>
                        <div class="d-td">ACTION</div>
                    </div>
                            <p class="drop-cart-p" v-if="!cartItems.length">Cart is empty</p>
                            <grid-item 
                            v-for="item of cartItems" 
                            :key="item.id_product"
                            :imgCart="item.imgCart"
                            :color="item.color"
                            :size="item.size"
                            :grid-item="item"
                            @input="changeQuantity"
                            @remove="remove"></grid-item>
                           
                       
                           
                            </div>`,
});