import {VueRequest} from "@/utils/Request";

declare module 'vue/types/vue' {
    // 扩充
    interface Vue {
        $http: VueRequest;
    }
}