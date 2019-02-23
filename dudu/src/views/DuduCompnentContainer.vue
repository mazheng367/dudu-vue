<template>
    <component :is="activeComp" :query-map="queryMap">aaaaaa</component>
</template>

<script>
    import {Vue, Component, Watch} from 'vue-property-decorator';
    import CompMap from './comp-map';
    import isEmpty from 'lodash/isEmpty';

    @Component
    export default class DuduCompnentContainer extends Vue {
        data() {
            return {
                view: "",
                queryMap: {}
            }
        }

        created() {
            this.view = this.$route.params.view;
        }

        get activeComp() {
            debugger;
            const compName = this.view;
            if (isEmpty(compName)) {
                return;
            }

            if (!CompMap.hasOwnProperty(compName)) {
                //throw `没有找到组件:${compName}，请检查comp-map.ts文件是否正确配置`;
                return;
            }

            return CompMap[compName];
        }

        @Watch("$route")
        onRouterChanged() {
            this.view = this.$route.params.view;
        }

        @Watch("view")
        onActiveCompChanged() {
            debugger;
            this.queryMap = this.$route.query;
        }
    }
</script>

<style scoped>

</style>