<script lang="ts">

    import {Vue, Component} from 'vue-property-decorator';
    import VueInstance, {VNode} from "vue";
    import isEmpty from "lodash/isEmpty";


    @Component({name: "DuduLeftMenu"})
    export default class DuduLeftMenu extends Vue {
        get subMenus() {
            return this.$store.state.subMenu || [];
        }

        menuClick(index: object, paths: Array<string>, menuItem: VueInstance) {
            this.$store.commit("currentView", (<any>menuItem.$attrs).view);
        }

        render(createElement: Function) {
            const menus = this.subMenus;
            let firstViewMenu: any;

            function createSubMenu(menu: any): VNode {
                if (!menu || !menu.children || !menu.children.length) {
                    if (!firstViewMenu) {
                        firstViewMenu = JSON.parse(JSON.stringify(menu));
                    }
                    return createElement("el-menu-item", {props: {index: menu.pathId}, attrs: {view: menu.view}, key: menu.pathId}, menu.text);
                }
                const items: VNode[] = [createElement("template", {slot: "title"}, menu.text)];
                menu.children.forEach((item: any) => {
                    items.push(createSubMenu(item));
                });
                return createElement("el-submenu", {
                    props: {index: menu.pathId},
                    key: menu.pathId
                }, items);
            }

            const children: VNode[] = [];
            menus.forEach(function (menu: any) {
                children.push(createSubMenu(menu));
            });

            const menuConfig = {props: {index: "sub-root"}, on: {select: this.menuClick}};

            if (firstViewMenu && !isEmpty(firstViewMenu.view)) {
                this.$store.commit("currentView", firstViewMenu.view);
                (menuConfig.props as any)["default-active"] = firstViewMenu.pathId;
            }

            return createElement("el-menu", menuConfig, children);
        }
    }
</script>

<style scoped>

</style>