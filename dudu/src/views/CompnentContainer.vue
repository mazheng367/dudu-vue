<script lang="ts">
    import {Vue, Component, Watch} from 'vue-property-decorator';
    import CompMap from './comp-map';
    import isEmpty from 'lodash/isEmpty';
    import Error from './Error.vue';

    @Component
    export default class CompnentContainer extends Vue {

        data() {
            return {view: ""};
        }

        created() {
            this.$data["view"] = (<any>this.$route.params).view;
        }

        render(createElement: Function) {
            const compName = (this as any).view;
            if (isEmpty(compName)) {
                return;
            }

            if (!CompMap.hasOwnProperty(compName)) {
                return createElement(Error);
            }
            return createElement(CompMap[compName], {props: {"query-map": this.$route.query}});
        }

        @Watch("$route")
        onRouterChanged() {
            this.$data["view"] = (this.$route.params as any).view;
        }
    }
</script>

<style scoped>

</style>