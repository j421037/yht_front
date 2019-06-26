import mutations from './mutations.js';
import * as actions from './actions';
import tool from '../util/tool.js';

const state = {
	login: '',
	token: "",
	errorMsg: '', //错误信息
	userInfo: [],
	userSignup: [],
	UserImport: {result: []},
	UserDisable: {},
	loginResult: '',
	AuthUpdatePasswd: {},
	navigation: [], //导航
	groups: [],//功能组
	update_permission: false,
	updateIconCssFile: '',
	functionTableData: [], //表格数据
	functionTablePageCount: 1, //表格数据分页
	add_group: '',
	role_table_data: [],
	roleTreeData: [],//权限分配项
	roleAdd: '',
	tree_select: [],
	updateRoleStatus: '',
	role_info: [], //角色信息
	role_put_status: '',
	userList: [],
	userRole: [],
	updateUserAuthorize: '',
	user_put_role_status: '',
	createBrandStatus: false, //品牌的创建状态
	updateBrandStatus: false, //品牌的更新状态
	updateBrandEnableStatus: false,
	brandList: [],
	iconUrl: '',
	region: [],
	customerCreate: '',
	customerList: [],
	receiveStatus: '',
	personal_customer_list: [],
	append_comments: '',
	comments: [],
	freeCustomer: '',
	acceptCustomer: '',
	customerManagerList: [],
	customerPublish: [],
	department_list: [],
	departmentStaff: [],
	departmentSetStaff: [],
	departmentSetManager: [],
    departmentSetAssistant: {},
	customerInit: [],
	syncUser: [],
	initUserList: [],
	joinWorkWx: [],
	baseMobileData: [],
	createChat: [],
	CurrentCustomer: [],
	ArticlePost: [],
	FeelbackPost: {},
	ForumModuleArticles: {
		data: [],
		loaded: false,
		hasRole: false
	},
	SetArticleTop: {},
	PortalArticleData: {
		data: [],
		loaded: false
	},
	ForumModuleSync: {},
	ArticleCategory: [],
	FeelbackCategory: [],
	ArticleModuleCategory: [],
	ArticleManagerCategory: [],
	ArticleCategoryPost: [],
	ArticleOne: {
		body: "",
	},
	ArticlePersonalModule: {},
	ArticleChangeCategory: {},
	AddArticleAnswer: {},
	ArticleAnswer: {},
	ArticleAgree: '',
	ForumMenu: {},
	ArticleDraft: {},
	ArticlePublish: {},
	ArticleEditOne: {},
	ArticleUpdate: {},
	ArticlePublishList: {},
	ArticleCategoryPut: {},
	ArticleSetFine: {},
	ArticleDelete: {},
	ArticleAgreeNotify: {},
	ArticleAnswerNotify: {},
	ArticleAgreeList: [],
	ForumModule: [],
	ForumPhotosAdd: {},
	PortalPicList: {},
	ForumModuleTableData: [],
	ForumModuleStore: {},
	AgreeEveryMonth: [],
	MyArticleNotify: {},
	historyMenu: [],
	ShrinkStatus: false,
	Breadcrumb: [],
	DeletePermission: {},
	AddMyCustomer: {},
	SearchCust: {},
	SearchProject: {},
	AddReceivable: {},
	AddReceivebill: {},
	ARSum: [],
	ARSumLoading: true,
	ARSumTotal: 0,
	UpdateReceivable: {},
	UpdateReceivebill: {},
	AddARType: {},
	ARType: [],
	AddProject: {},
	agreementList: [],
	ARSumUserRole: {},
	BasePagination: {},
	ARSummaries: [],
	AddReceivablePlan: {},
	RefundAdd: {},
	UpdateRefund: {},
	ARCurrentTable: '',
	ARTableConfig: {
		sale: true,
		receive: false,
		balance: false,
        refund: false,
		init: false,
		FilterVisible: false,
		CreateCustVisible: false,
		CreateProVisible: false,
		ImportVisible: false,
		SaleOrderVisible: false,
		ReceivebillVisible: false,
		RefundVisible: false,
		RecePlanVisible: false,
		ChangeCustVisible: false,
		CreatePotentialProVisible: false,
        InitialVisible: false,
		ColumnVisible: {
			status_name: {name: "状态", value: true},
			// index: {name:"序号", value: false},
			department: {name: "部门", value: false},
            overdue: {name:"逾期",value:true},
			//project: {name:"旗下项目", value: true},
			protype: {name: "施工范围", value: true},
			affiliate: {name: "挂靠", value: true},
			user_name: {name: "业务员", value: true},
			tag: {name: "标签", value: true},
			cooperation_amountfor: {name: "合作金额", value: true},
			estimate: {name: "预计金额", value: true},
			agreement: {name: "合同信息", value: true},
			tax: {name: "税点", value: true},
			payment_days: {name: "账期", value: true},
			init_data: {name: "期初", value: true},
		},
		FontSize: tool.getter('FontSize') || 12
	},

	ARSetFieldType: [],
	ARSumCurrentRow: {},
	AddEnumberate: {},
	Enumberate: [],
	AddBindAttr: {},
	BindAttrList: [],
	FIELDS: [],
	filterQuery: {},
	SaleOrderList: {
		data: [],
		pagination: {
			total: 0,
		},
		CurrentRow: {},
		update: false,
		ready: false, //是否已经加载过
	},//销售应收列表
	ReceiveBillList: {
		data: [],
		CurrentRow: {},
		pagination: {
			total: 0
		},
		update: false,
		ready: false, //是否已经加载过
	}, //收款列表
	DiscountList: [], //优惠列表
	RefundList: {
		data: [],
		CurrentRow: {},
		pagination: {
			total: 0
		},
		update: false,
		ready: false, //是否已经加载过
	}, //退货列表
	RecePlanList: {
		data: [],
		CurrentRow: {},
		pagination: {
			total: 0
		},
		ready: false, //是否已经加载过
	},//收款计划列表
    InitialList: {
        data: [],
        CurrentRow: {},
        pagination: {
            total: 0
        },
        ready: false, //是否已经加载过
    },//收款计划列表
	CustStatus: {
		//客户状态更新
	},
	ARSumFilterTable: {},//表头过滤信息
	FindARSumFilterValue: [], //远程搜索结果
	CreateProgram: {},
	FilterProgram: [],
	UpdateFilterConfig: {},
	PotentialCustomer: {
		row: [],
		total: 0
	},
	PotentialQueryParam: {
		offset: 0,
		limit: 0
	},
	CreatePotentialPro: {},
	ARSumInitialization: {},
	ArticleCategoryDelete: {},
    BaseProduct: {
	    Category: {
            CreateCategoryDialog: {
                visible: false,

            },
            CreatePriceDialog: {
                visible: false
            },

        },
        Price: {
	        PriceMaintenance: {
	            visible: false
            },
            FastPriceMaintenance: {
                visible: false
            },
            MakeOffer: {
                visible: false
            },
            History: {
	            visible: false
            },
            ModifyOffer: {
	            visible: false
            }
        }
    },
    ProductCategoryStore: {},
    ProductCategoryList: [],
    ProductCreatePriceTable: {},
    ProductPriceTableList: [],
    DeleteProductPriceTable: {},
    ProductSurfacePriceList: {
	    column:[],
        rows:[]
    },
    MakeOfferParams: [],
    ProductPriceUpdate: {},
    ProductPriceVersion: [],
    ProductPriceFastUpdate: {},
    CreateOffer: {},
    ProductOffers: [],
    CostRole: {
	    users: [],
        authorize: false
    },
    ModifyOffer: {},
    priceInfo: [],
    QueryCustomer:[],
    CreateInitial: {},
    ResetPwdFromManagement: {},
    LoadHistoryPrices: {
	    rows: [],
        column: [],
        notice: ""
    },
    updateTarget: {}
}

export default {
	state,
	actions,
	mutations
}
