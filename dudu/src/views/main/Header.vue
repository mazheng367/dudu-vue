<template>
    <div class="app-header">
        <div class="app-logo" @click="logoClick">
            <img alt="wait" src="../../../public/resources/logo-nav.png"/>
        </div>
        <div class="top-menu">
            <el-menu mode="horizontal">
                <el-menu-item v-for="(menu,index) in menus" :index="index+''" :key="'key_'+index">{{menu.name}}</el-menu-item>
            </el-menu>
        </div>
        <div class="detail-container">

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: "DuduHeader"
    })
    export default class DuduHeader extends Vue {
        data() {
            return {
                menus: [
                    {name: "邮件中心"},
                    {name: "text2"},
                    {name: "text3cle"}
                ]
            }
        }

        logoClick() {
            this.$emit("logoclick");
            console.log(this.$http);
        }
    }
</script>

<style scoped lang="scss">
    .app-header {
        background-color: $header-backgroud-color;
        display: flex;
    }

    .app-logo {
        display: flex;
        align-items: center;
        padding: 0 7px;
        cursor: pointer;

        & > img {
            padding: 0 5px;
        }
    }

    .top-menu {
        flex: 1;

        .el-menu {
            background-color: transparent;
            border-bottom: 0;

            .el-menu-item {
                color: #fff;
                font-size: 13px;
                font-weight: bold;
                border-bottom: 0;

                &:hover, &.is-active {
                    background-color: #00599b;
                    color: #fff;
                    border-bottom: 0;
                }
            }
        }
    }
</style>