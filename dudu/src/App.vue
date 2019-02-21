<template>
    <div id="app">
        <el-container ref="mainContainer" v-loading="isLoading">
            <el-header>
                <dudu-header @logoclick="goHome"/>
            </el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
        <div></div>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import DuduHeader from './views/main/Header.vue';

    @Component({
        components: {
            DuduHeader
        }
    })
    export default class App extends Vue {
        get isLoading() {
            return this.$store.state.loading;
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

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
