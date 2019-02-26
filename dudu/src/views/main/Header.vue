<template>
    <div class="app-header">
        <div class="app-logo" @click="logoClick">
            <img alt="wait" src="../../../public/resources/logo-nav.png"/>
        </div>
        <div class="top-menu">
            <el-menu mode="horizontal" @select="menuClick">
                <el-menu-item v-for="(menu,index) in topMenus" :index="index+''" :key="'key_'+index" style="height: 50px;line-height: 50px">
                    <font-awesome-icon class="menu-icon" :icon="menu.iconCls|vueIconCls"/>
                    {{menu.text}}
                </el-menu-item>
            </el-menu>
        </div>
        <div class="detail-container">
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {vueIconCls} from '@/utils/Filters';
    import {RouteConfig} from "vue-router";
    import isEmpty from "lodash/isEmpty";

    @Component({
        name: "DuduHeader",
        filters: {
            vueIconCls
        }
    })
    export default class DuduHeader extends Vue {
        logoClick() {
            this.$emit("logoclick");
        }

        get topMenus() {
            return this.$store.state.menuData || [];
        }

        menuClick(index: string) {
            const currentMenu = this.$store.state.menuData[index];
            let subs = [];
            if (currentMenu.children && currentMenu.children.length) {
                subs = JSON.parse(JSON.stringify(currentMenu.children)) || [];
            }
            this.$store.dispatch("setSubMenu", subs);
            if (!subs.length && !isEmpty(currentMenu.view)) {
                this.$store.commit("currentView", currentMenu.view);
            }
        }

        @Watch("topMenus", {deep: false})
        onMenuDataChanged(newVal: Array<any>) {
            if (!newVal || !newVal.length) {
                return;
            }
            const routers: RouteConfig[] = [];
            newVal.forEach(menu => routers.push({name: menu.pathId, path: ""}));
            this.$router.addRoutes(routers);
        }
    }
</script>

<style scoped lang="scss">
    .app-header {
        background-color: $header-backgroud-color;
        display: flex;
        height: 50px;
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

                .menu-icon {
                    font-size: 16px;
                    margin-top: -1px;
                    padding: 0 3px;
                }
            }
        }
    }
</style>