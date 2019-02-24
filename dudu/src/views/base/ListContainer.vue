<template>
    <div>ListContainer</div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import BaseComponent from "@/components/BaseComponent";

    @Component
    export default class BaseListContainer extends BaseComponent {
        created() {
            console.log(this.queryMap);
        }
    }
</script>

<style scoped>

</style>