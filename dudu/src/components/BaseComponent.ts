import {Vue, Component, Prop} from "vue-property-decorator";

@Component
export default class BaseComponent extends Vue {
    @Prop({
        type: Object, default: () => {
        }
    })
    public queryMap!: object;
}