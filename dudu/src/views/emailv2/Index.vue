<template>
    <div>HAHAHAHAHAHAH</div>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import BaseComponent from '../../components/BaseComponent';

    @Component({name: "dudu-email-index"})
    export default class EmailIndex extends BaseComponent {
        created() {
            console.log(this.queryMap);
        }
    }
</script>

<style scoped>

</style>