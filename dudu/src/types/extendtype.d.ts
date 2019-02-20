import Request from "@/common/Request";

declare module 'vue/types/vue' {

    // 扩充
    interface Vue {
        $http: Request;
    }



}