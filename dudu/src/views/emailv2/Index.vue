<template>
    <div>HAHAHAHAHAHAH</div>
</template>

<script>
    import {Component} from "vue-property-decorator";
    import BaseComponent from '../../components/BaseComponent';

    @Component
    export default class EmailIndex extends BaseComponent {
        created() {
            debugger;
            console.log(this.queryMap);
        }
    }
</script>

<style scoped>

</style>