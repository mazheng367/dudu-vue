import {VueRequest} from "@/utils/Request";

declare module 'vue/types/vue' {
    // 扩充
    interface Vue {
        $http: VueRequest;
    }
}

declare type Nullable<T> = T | null | undefined;

declare interface Bo {
    AttrTable: string;
    AuditFlow: boolean;
    DeptIDAttr: string;
    Description: string;
    DetailObjectName: string;
    DropdownSelect: boolean;
    HasLastView: boolean;
    HasType: boolean;
    HisTable: string;
    IsDefineObj: boolean;
    IsExportable: boolean;
    IsFastNew: boolean;
    IsImportable: boolean;
    IsObjEvent: boolean;
    IsRecyclable: boolean;
    IsRefObj: boolean;
    IsScopeControl: boolean;
    IsSearchable: boolean;
    KeyAttrField: string;
    KeyAttrName: string;
    Label: string;
    MAttrTable: string;
    MainTable: string;
    Name: string;
    NameAttrName: string;
    ObjImg: string;
    ObjLargeImg: string;
    ObjNewImg: string;
    ObjType: number;
    OwnerIDAttr: string;
    ParentAttr: string;
    Plural: string;
    PrivilegeTable: string;
    RelObjIDField: string;
    RelUserIDField: string;
    RelUserTable: string;
    XAttrTable: string;
}

declare interface FieldAttr {
    Align: number;
    AttrLen: number;
    AttrPrec: number;
    AttrType: number;
    DefaultValue: string;
    Description: string;
    DispOrder: number;
    EditCols: number;
    EditRows: number;
    EnumAttrName: string;
    FieldName: string;
    FormulaExpr: string;
    IsAudit: boolean;
    IsDimension: boolean;
    IsDisplayList: boolean;
    IsDisplayOther: boolean;
    IsDisplayView: boolean;
    IsFastNewField: boolean;
    IsFieldControl: boolean;
    IsFormula: boolean;
    IsHidden: boolean;
    IsKey: boolean;
    IsMassUpdate: boolean;
    IsMeasure: boolean;
    IsNewNotEdit: boolean;
    IsNoWrap: boolean;
    IsReadonly: boolean;
    IsRefAttr: boolean;
    IsRefID: boolean;
    IsRequired: boolean;
    IsSearchCond: boolean;
    IsSearchable: number;
    IsSortable: boolean;
    IsSysEnum: boolean;
    IsUnique: boolean;
    IsUserAttr: boolean;
    IsUserEditable: boolean;
    Label: string;
    ListMaxLen: number;
    Name: string;
    ParentName: string;
    ReferBoName: string;
    ReferTo: string;
    ReferredBy: string;
    SequenceFormat: string;
    SequenceStart: number;
    SimpleName: string;
    TableName: string;
    UniqueCaseSensitive: boolean;
}