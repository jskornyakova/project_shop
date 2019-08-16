Vue.component('products', {
    props: ['count'],
    data(){
      return {
          catalogUrl: `./products.json`,
          products: [],
          filtered: [],
          imgCatalog: `https://placehold.it/260x260`,
      }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });

    },
    template: `<div class="product-box">
        <product 
        v-for="product of filtered.slice(0, count)"
        :key="product.id_product"
        :product="product"
        :img="product.img"
        ></product>

    </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product">
            <a href="single_page.html"><img class="product__img" :src="product.img" :alt="product.product_name"></a>
                <div class="product__text"> <a class="product__link" href="single_page.html">{{product.product_name}}</a>
                <p class="product__price">$ {{product.price}}</p>
                </div>
                <button class="product__add" @click="$root.$refs.cart.addProduct(product)"><img src="img/Forma_1_copy.svg" alt="cart">Add to Cart</button>
        </div>`
});
