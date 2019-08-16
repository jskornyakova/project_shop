Vue.component('error', {
    data(){
        return {
            text: "",
        }
    },
    methods: {
        setText(value){
            this.text = value;
        }
    },
    template: `<div class="error-block" v-if="text">
                    <p class="error-nsg">
                    <button class="close-btn" @click="setText('')">&times;</button>
                    {{text}}
                    </p>
               </div>`,
});