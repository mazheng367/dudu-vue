<template>
    <div class="dudu-loading" :class="{'hide-elem':hide}">
        <div class="loading-container">
            <svg viewBox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';

    @Component
    export default class DuduLoading extends Vue {
        @Prop({type: Boolean, default: () => false})
        public show!: Boolean;

        get hide(): Boolean {
            return !this.show;
        }
    }

</script>

<style lang="scss" scoped>
    .dudu-loading {
        position: absolute !important;
        top: 0;
        left: 0 !important;
        right: 0;
        bottom: 0;
        z-index: 2000;
        background-color: rgba(255, 255, 255, .9);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loading-container {
        .circular {
            width: 42px;
            height: 42px;
            font-weight: bolder;
        }

        .path {
            -webkit-animation: loading-dash 1.5s ease-in-out infinite;
            animation: loading-dash 1.5s ease-in-out infinite;
            stroke-dasharray: 90, 150;
            stroke-dashoffset: 0;
            stroke-width: 2;
            stroke: #409EFF;
            stroke-linecap: round;
        }

    }
</style>