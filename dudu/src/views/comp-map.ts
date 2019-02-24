import EmailV2Index from './emailv2/Index.vue';
import BaseListContainer from './base/ListContainer.vue';

interface ComponentMap {
    [key: string]: any;
}

const map: ComponentMap = {
    "emailv2.Index": EmailV2Index,
    "base.ListContainer": BaseListContainer
};

export default map;
