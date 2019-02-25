export const PRIVILEGE_NULL = 0;
export const PRIVILEGE_SINGLE = 1;
export const PRIVILEGE_MULTI = 2;
export const PRIVILEGE_TREE = 4;
export const PRIVILEGE_SINGLE_AND_TREE = 5;
export const PRIVILEGE_MULTI_AND_TREE = 6;
export const PRIVILEGE_LEAF = 8;
export const PRIVILEGE_SINGLE_AND_LEAF = 9;
export const PRIVILEGE_MULTI_AND_LEAF = 10;

export const OBJ_NULL = 0;
export const OBJ_FAVORITE = 22;
export const OBJ_ATTACH = 25;
export const OBJ_COMMENT = 26;
export const OBJ_PRIVILEGE = 85;
export const OBJ_HISTORY = 90;
export const OBJ_DEPARTMENT = 95;
export const OBJ_BIZ_DEPT = 96;
export const OBJ_MNG_DEPT = 97;
export const OBJ_ROLE = 98;
export const OBJ_USER = 99;
export const OBJ_SYSLOG = 142;
export const OBJ_ONLINE_USER = 150;
export const OBJ_REPORT_DESIGN = 200;
export const OBJ_TEMPLATE = 205;
export const OBJ_TYPE = 300;
export const OBJ_OBJMAP = 400;
export const OBJ_OBJATTRMAP = 500;
export const OBJ_AUDITFLOW = 831;
export const OBJ_AUDITSTAGE = 841;
export const OBJ_AUDITLOG = 851;
export const OBJ_REFER_OBJECT = 998;
export const OBJ_REMIND = 999;
export const OBJ_REMINDER = 1000;
export const OBJ_REMINDER_ITEM = 1001;
export const OBJ_REL_XXX_USER = 800;
export const OBJ_EMAIL_MANAGER = 2002;
export const OBJ_EMAIL_ADDR_BOOK = 2003;
export const OBJ_OFFICE = 2004;
export const OBJ_GOV_FILE = 2005;
export const OBJ_FILE_RULE = 2006;
export const OBJ_WORK_FLOW = 2007;
export const OBJ_APPLICANT = 2008;
export const OBJ_COST_PRICE = 2012;
export const OBJ_TRIGGER_RULE = 2013;
export const OBJ_TECHNOLOGY = 2014;
export const OBJ_PRODUCT = 2015;
export const OBJ_WORK_FLOW_TASK = 2016;
export const OBJ_STATUS = 2017;
export const OBJ_PATENT_CASE = 2018;
export const OBJ_PATENT_INVENTOR = 2019;
export const OBJ_PATENT_PRIORITY = 2020;
export const OBJ_IP_FILE = 2021;
export const OBJ_EVENT_CASE = 2022;
export const OBJ_EVENT_TASK_INS = 2023;
export const OBJ_PATENT_BILL = 2024;
export const OBJ_PATENT_COST = 2025;
export const OBJ_EMAIL_TEMPLATE = 2026;
export const OBJ_NOTICE = 2027;

/**
 * Attribute type
 */
export const ATTR_NUMERIC = 1;
export const ATTR_PERCENT = 2;
export const ATTR_CURRENCY = 3;

export const ATTR_SHORT_STR = 4;
export const ATTR_LONG_STR = 5;
export const ATTR_LONG_TEXT = 6;
export const ATTR_SEQUENCE = 7;
export const ATTR_EMAIL = 8;
export const ATTR_URL = 9;
export const ATTR_PHONE = 10;
export const ATTR_CHECK = 11;
export const ATTR_RADIO = 12;
export const ATTR_DROPDOWN = 13;
export const ATTR_MULTI = 14;

export const ATTR_DATE = 15;
export const ATTR_DATETIME = 16;
export const ATTR_IMAGE = 17;
export const ATTR_ID = 18;
export const ATTR_REF_OBJ = 18;
export const ATTR_COMBINE = 19;
export const ATTR_LINK = 20;
export const ATTR_FESTIVAL = 21;

/**
 * Conditon Compare Operator type
 */
export const TDD_OPER_NULL = 1;
export const TDD_OPER_NOT_NULL = 2;
export const TDD_OPER_EQUAL = 3;
export const TDD_OPER_NOT_EQUAL = 4;
export const TDD_OPER_GT = 5;
export const TDD_OPER_GT_EQUAL = 6;
export const TDD_OPER_LE = 7;
export const TDD_OPER_LE_EQUAL = 8;
export const TDD_OPER_INC = 9;
export const TDD_OPER_NOT_INC = 10;
export const TDD_OPER_RANGE = 11;
export const TDD_OPER_L_LIKE = 12;
export const TDD_OPER_R_LIKE = 13;
export const TDD_OPER_BEFORE = 14;
export const TDD_OPER_AFTER = 15;
export const TDD_OPER_RECENT = 16;
export const TDD_OPER_FUTURE = 17;
export const TDD_OPER_BELONGTO = 18;
export const TDD_OPER_MYSELF = 101;

export const TDD_OPER_NOT_REL = 105;
export const TDD_OPER_REL = 106;
export const TDD_OPER_MASTER = 107;
export const TDD_OPER_NOT_REL_OR_REL = 112;
export const TDD_OPER_REL_OR_MASTER = 113;
export const TDD_OPER_NOT_REL_OR_MASTER = 114;
export const TDD_OPER_NO_REL_USER = 109;
export const TDD_OPER_NO_MASTER_USER = 110;
export const TDD_OPER_NO_REL_DEPT = 111;
export const TDD_OPER_NO_MASTER_DEPT = 115;

/**
 * Conditon Date type attribute offset define
 */
export const TDD_OFFSET_DAY = 1;
export const TDD_OFFSET_WEEK = 2;
export const TDD_OFFSET_MONTH = 3;
export const TDD_OFFSET_YEAR = 4;

/**
 * Edit pop window size
 */
export const TDD_EDIT_POP_WIDTH = 800;
export const TDD_EDIT_POP_HEIGHT = 600;

//Recur Type define; change this will change the activityedit.php radioArr

export const TDD_RECUR_DAY = 1;
export const TDD_RECUR_WEEK = 2;
export const TDD_RECUR_MONTH = 3;
export const TDD_RECUR_MONTH_NTH = 4;
export const TDD_RECUR_YEAR = 5;
export const TDD_RECUR_YEAR_NTH = 6;

/**
 * exception define
 */

export const EXCEPTION_DETAIL_ERROR = 9000;
export const DELETE_EXCEPTION_FORBID = 10000;
export const EXCEPTION_PRICE_OVER_FINAL = 10001;
export const SAVE_CHECK_DUPLICATION = 10002;
export const DELETE_RELOBJ_CANNOT_VIEW = 10003;

export const EVENT_OBJ_CREATE = 1;
export const EVENT_OBJ_UPDATE = 2;
export const EVENT_OBJ_DELETE = 3;
export const EVENT_OBJ_RESUME = 4;
export const EVENT_OBJ_REL_CREATE = 5;
export const EVENT_OBJ_REL_DELETE = 6;
export const EVENT_DATE = 7;
export const EVENT_STAGE_DATE = 8;
export const EVENT_SUBMIT = 9;
export const EVENT_AUDIT_PASS = 10;
export const EVENT_AUDIT_REJECT = 11;
export const EVENT_BEFORE_SUBMIT = 12;
export const EVENT_BEFORE_AUDIT = 13;
export const EVENT_FESTIVAL = 14;

//remind type
export const TO_TYPE_ME = 0;			//self
export const TO_TYPE_OWNER = 1;			//Owner
export const TO_TYPE_REL = 2;			//rel user
export const TO_TYPE_OBJECTROLE = 3;			//object role
export const TO_TYPE_ROLE = 4;			//role
export const TO_TYPE_USER = 5;			//user
export const TO_TYPE_MASTER = 6;			//master user
export const TO_TYPE_ACCOUNT = 7;			//account
export const TO_TYPE_SUBMITER = 8;			//submiter
export const TO_TYPE_BEFORE_STAGE_AUDITER = 9;			//before stage's audidter
export const TO_TYPE_CURRENT_STAGE_AUDITER = 10;			//current stage's auditer
export const TO_TYPE_NEXT_STAGE_AUDITER = 11;			//next stage's auditer
export const TO_TYPE_OBJSELF = 12;		//object self

//field control position index
export const ATTR_OWNER_NOT_EDIT = 0;
export const ATTR_OWNER_NOT_VIEW = 1;
export const ATTR_REL_NOT_EDIT = 2;
export const ATTR_REL_NOT_VIEW = 3;
export const ATTR_OTHER_NOT_EDIT = 4;
export const ATTR_OTHER_NOT_VIEW = 5;

//dim total key
export const DIM_TOTAL_KEY = "#{#TOTAL#}#";

//contract action
export const ACTION_ENABLED = 1;
export const ACTION_DISABLED = 2;
export const ACTION_LOCK = 3;
export const ACTION_UNLOCK = 4;

//reminder type
export const REMIND_TYPE_SYSTEM = 1; //system
export const REMIND_TYPE_ORDER = 2; //order
export const REMIND_TYPE_ACTIVITY_AHEAD = 3;
export const REMIND_TYPE_ACTIVITY_AT = 33;
export const REMIND_TYPE_USER_TASK = 4;

//max list disp num
export const MAX_DISP_NUMS = 1000;

//search result display type
export const SEARCH_RESULT_QUICK_VIEW = 1;
export const SEARCH_RESULT_BASIC_FIELDS = 2;

//Ajax Request Timeout
export const AJAX_REQUEST_TIMEOUT = 300000;
//

export const POPLAYOUT_TYPEID_NEW_PATENTCOST = 110;//专利详细页面 新建费用弹出框
export const POPLAYOUT_TYPEID_NEW_EVENTCASE = 101;//专利详细页面 新建管制事项弹出框
export const POPLAYOUT_TYPEID_EMAILBACKUP_EVENTCASE = 102;//邮件归档弹出页面，选中管制事项时的修改页面
export const POPLAYOUT_TYPEID_NEW_INVENTOR = 101;//专利详细页面发明人表格，新增发明人按钮