<script lang="ts">

    import {Vue, Component} from 'vue-property-decorator';
    import {VNodeChildren, VNode} from "vue";

    @Component({name: "DuduLeftMenu"})
    export default class DuduLeftMenu extends Vue {

        get subMenus() {
            return this.$store.state.subMenu || [];
        }

        render(createElement: Function) {
            const menus = this.subMenus;

            function createSubMenu(menu): VNode {
                if (!menu || !menu.children || !menu.children.length) {
                    return createElement("el-menu-item", {props: {index: menu.pathId}}, menu.text);
                }
                const items: VNode[] = [createElement("template", {slot: "title"}, menu.text)];
                menu.children.forEach(item => {
                    items.push(createSubMenu(item));
                });
                return createElement("el-submenu", {
                    props: {index: menu.pathId}
                }, items);
            }

            const children: VNode[] = [];
            menus.forEach(function (menu: any) {
                children.push(createSubMenu(menu));
            });

            return createElement("el-menu", {props: {index: 11111111111111}}, children);
        }
    }
</script>

<style scoped>

</style>