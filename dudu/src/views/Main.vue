<template>
    <div class="main-innerCt">
        <div>This is Main</div>
        <el-button ref="button" type="success" @click="alertMessage" round>主要按钮</el-button>
        <router-view/>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator';

    @Component
    export default class DuduMain extends Vue {
        created() {
            this.$on("click", () => alert("asdasdasd"));
        }

        alertMessage() {
            alert("asdadasdad");
        }
    }
</script>