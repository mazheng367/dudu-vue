<template>
    <div id="app">
        <el-container>
            <el-header>
                <dudu-header @logoclick="goHome"/>
            </el-header>
            <el-container class="comp-body">
                <el-aside width="200px" v-show="showLeftSub">
                    <dudu-left-menu/>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
        <dudu-loading :show="isLoading"/>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Watch} from 'vue-property-decorator';
    import DuduHeader from './views/main/Header.vue';
    import DuduLoading from './components/Loading.vue';
    import DuduLeftMenu from './views/main/LeftMenu.vue';

    @Component({
        components: {DuduHeader, DuduLoading, DuduLeftMenu}
    })
    export default class App extends Vue {
        get isLoading() {
            return this.$store.state.ajaxRequestCounter > 0;
        }

        get showLeftSub() {
            return (this.$store.state.subMenu || []).length > 0;
        }

        goHome() {
            this.$router.push("/");
        }
    }
</script>
<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100%;
        height: 100%;
        box-sizing: border-box !important;

        & > .el-container {
            height: 100%;
        }
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .el-header {
        padding: 0 !important;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    .el-container {
        width: 100%;
    }

    .comp-body {
        height: 100%;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .el-loading-mask {
        transition-duration: 0s !important;
    }
</style>
