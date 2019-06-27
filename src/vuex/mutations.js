import * as types from './mutation-type.js';
import tool from '../util/tool.js';

const mutations = {
	[types.LOGIN] (state, data) {
		state.login = data;
		if (data.status == "success")
        {
            state.token = data.token;
            tool.setter("token",data.token);
        }
	},

	[types.SET_ERROR_INFO] (state, data) {
		state.loginResult = data;
	},
	[types.USER_INFO] (state, data) {
		state.userInfo = data.data;
	},
	[types.USER_IMPORT] (state, response) {
		state.UserImport = response;
	},
	[types.USER_DISABLE] (state, response) {
		state.UserDisable = response;
	},
	[types.CLEAR_ARTICLE] (state) {
		state.ArticleOne = {};
	},
	[types.USER_SIGNUP] (state, data) {
		state.userSignup = data;
	},
	[types.INIT_TOKEN] (state, token) {
		state.token = token;
	},
	[types.AUTH_UPDATE_PASSWD] (state, response) {
		state.AuthUpdatePasswd = response;
	},
	[types.NAVIGATION] ( state, data) {
		//console.log(data);
		state.navigation = data.data;
	},

	[types.ADD_GROUP] (state, data) {
		//console.log(data);
		state.add_group = data;
	},
	[types.GET_GROUP_LIST] (state, data) {
		state.groups = data;
	},

	[types.UPDATE_PERMISSION_STATUS] (state,data) {
		//console.log(data);
		state.add_group = data;
	},

	[types.UPDATE_ICON_CSS_FILE] (state, data) {
		state.updateIconCssFile = data;
	},
	[types.ICON_URL] (state, data) {

		state.iconUrl = data.data;
	},

	[types.GET_FUNCTION_TABLE_DATA] (state, data) {

		state.functionTableData = data.list;
		state.functionTablePageCount = data.count;
	},

	[types.ROLE_ADD] (state, data) {
		state.roleAdd = data.status;
	},
	[types.ROLE_TREE_DATA] (state, data) {
		state.roleTreeData = data.data;
	},
	[types.ROLE_TABLE_DATA] (state, data) {
		state.role_table_data = data.data;
	},

	[types.TREE_SELECT] ( state, data) {
		////console.log(data);
		state.tree_select = data.data;
	},

	[types.UPDATE_ROLE_STATUS] (state, data) {
		state.updateRoleStatus = data.status;
	},
	[types.ROLE_INFO] (state, data) {
		state.role_info = data.data;
	},
	[types.PUT_ROLE_STATUS] (state, data) {
		state.role_put_status = data;
	},
	[types.USER_LIST] (state, data) {
		state.userList = data.data;
	} ,
	[types.USER_ROLE] (state, data) {
		state.userRole = data.data;
	},
	[types.PUT_USER_ROLE_STATUS] (state, data) {
		state.user_put_role_status = data;
	},
	[types.UPDATE_USER_AUTHORIZE] (state, data) {
		state.updateUserAuthorize = data;
	},
	[types.POST_BRAND_STATUS] (state, data) {
		state.createBrandStatus = data.status;
	},
	[types.BRAND_LIST] (state, data) {
		state.brandList = data.data;
	},
	[types.UPDATE_BRAND] (state, data) {
		state.updateBrandStatus = data;
	},
	[types.UPDATE_BRAND_STATUS] (state, data) {
		state.updateBrandEnableStatus = data.status;
	},
	[types.REGION_LIST] (state, data) {

		let list = data.data;

		let pid = list[0].pid;

		if (state.region.length < 1) {

			state.region  = list;

		} else {

			for(let i in state.region) {

				if (state.region[i].id == pid) {

					state.region[i].children = list;
				}
			}
		}
	},

	[types.CUSTOMER_CREATE] (state,data) {

		state.customerCreate = data;
	},
	[types.CUSTOMER_UPDATE] (state, response) {
		console.log(response)
		state.customerCreate = response;
	} ,
	[types.CUSTOMER_LIST] (state, data) {

		state.customerList = '';
		//console.log(data);
		state.customerList = data;
	},
	[types.RECEIVE_CUSTOMER] (state, data) {

		//console.log(data);
		state.receiveStatus = data;
	},
	[types.PERSONAL_CUSTOMER] (state, data) {
		//console.log(data);
		state.personal_customer_list = data
	},
	[types.APPENT_COMMENTS] (state, data) {
		//console.log(data);
		state.append_comments = data;
	},
	[types.COMMENT_LIST] (state, data) {
		//console.log(data);
		state.comments = data;
	},
	[types.FREE_CUSTOMER] (state, data) {
		//console.log(data);
		state.freeCustomer = data;
	},
	[types.ACCEPT_CUSTOMER] (state, data) {
		//console.log(data);
		state.acceptCustomer = data;
	},
	[types.CUSTOMER_MANAGER_LIST] (state,data) {
		//console.log(data);
		state.customerManagerList = data;
	},
	[types.CUSTOMER_PUBLISH] (state, data) {
		//console.log(data);
		state.customerPublish = data;
	},
	[types.DEPARTMENT_LIST] (state, data) {
		//console.log(data);
		state.department_list = data.data;
	},
	[types.DEPARTMENT_MODIFY] (state, data) {
		//console.log(data);
		state.departmentModify = data;
	},
	[types.DEPARTMENT_CREATE] (state, data) {
		//console.log(data);
		state.departmentCreate = data;
	},
	[types.DEPARTMENT_STAFF] (state, data) {
		//console.log(data);
		state.departmentStaff = data;
	},
	[types.DEPARTMENT_SET_STAFF] (state, data) {
		//console.log(data);
		state.departmentSetStaff = data;
	},
	[types.DEPARTMENT_SET_MANAGER] (state, data) {
		//console.log(data);
		state.departmentSetManager = data;
	},
	[types.INIT_CUSTOMER] (state, data) {
		//console.log(data);
		state.customerInit = data;
	},
	[types.SYNC_USER] (state, data) {
		//console.log(data);
		state.syncUser = data;
	},
	[types.INIT_USER_LIST] (state, data) {
		//console.log(data);
		state.initUserList = data;
	},
	[types.JOIN_WORKWX] (state, data) {
		//console.log(data);
		state.joinWorkWx = data;
	},
	[types.INIT_MOBILE_DATA] (state, data) {
		//console.log(data);
		state.baseMobileData = data;
	},
	[types.CREATE_CHAT] (state, data) {
		//console.log(data);
		state.createChat = data;
	},
	[types.SET_CURRENT_CUSTOMER] (state, data) {
		//console.log(data);
		state.CurrentCustomer = data;
	},
	[types.ARTICLE_POST] (state, data) {
		//console.log(data);
		state.ArticlePost = data;
	},
	[types.FEELBACK_POST] (state, response) {
		state.FeelbackPost = response;
	},
	[types.FEELBACK_PUT] (state, response) {
		state.FeelbackPost = response;
	},
	[types.FORUM_MODULE_ARTICLES] (state, response) {
		state.ForumModuleArticles.loaded = response.loaded;
		state.ForumModuleArticles.hasRole = response.hasRole;

		if (response.data.length > 0) {
			response.data.forEach((item) => {
				state.ForumModuleArticles.data.push(item);
			});
		}
	},
	[types.SET_ARTICLE_TOP] (state, response) {
		state.SetArticleTop = response;
	},
	[types.FORUM_MODULE_ARTICLE_CLEAR] (state) {
		state.ForumModuleArticles.data = [];
	},
	[types.FORUM_MODULE_SYNC] (state, response) {
		state.ForumModuleSync = response;
	},
	[types.ARTICLE_PORTAL_SHOW] (state, response) {
		state.PortalArticleData.loaded = response.loaded;

		if (response.data.length > 0) {
			response.data.forEach((item) => {
				state.PortalArticleData.data.push(item);
			});
		}
	},
	[types.ARTICLE_CATEGORY] (state, response) {
		state.ArticleCategory = response.data;
	},
	[types.FEELBACK_CATEGORY] (state,response) {
		state.FeelbackCategory = response.data;
	},
	[types.LOAD_ARTICLE_MODULE_CATEGORY] (state, response) {
		state.ArticleModuleCategory = response.data;
	},
	[types.ARTICLE_MANAGER_CATEGORY] (state, response) {
		state.ArticleManagerCategory = response;
	},
	[types.ARTICLE_CATEGORY_POST] (state, data) {
		//console.log(data);
		state.ArticleCategoryPost = data;
	},
	[types.ARTICLE_GET_ONE] (state, data) {
		// console.log(data);
		state.ArticleOne = data;
	},
	[types.ADD_ARTICLE_ANSWER] (state, data) {
		//console.log(data);
		state.AddArticleAnswer = data;
	},
	[types.ARTICLE_ANSWER] (state, data) {
		//console.log(data);
		state.ArticleAnswer = data;
	},
	[types.ARTICLE_AGREE_CLICK] (state, data) {
		//console.log(data);
		state.ArticleAgree = data;
	},
	[types.ARTICLE_AGREE] (state, data) {
		//console.log(data);
		state.ArticleAgree = data;
	},
	[types.FORUM_MENU] (state, data) {
		//console.log(data);
		state.ForumMenu = data;
	},
	[types.ARTICLE_DRAFT] (state, response) {
		state.ArticleDraft = response.data;
	},
	[types.ARTICLE_PUBLISH] (state, data) {
		//console.log(data);
		state.ArticlePublish = data;
	},
	[types.ARTICLE_EDIT] (state, data) {
		// console.log(data);
		state.ArticleEditOne = data;
	},
	[types.ARTICLE_PUT] (state, data) {
		// console.log(data);
		state.ArticleUpdate = data;
	},
	[types.ARTICLE_PUBLISH_LIST] (state, data) {
		// console.log(data);
		state.ArticlePublishList = data;
	},
	[types.ARTICLE_CATEGORY_PUT] (state, data) {
		// console.log(data);
		state.ArticleCategoryPut = data;
	},
	[types.ARTICLE_SET_FINE] (state, data) {
		state.ArticleSetFine = data;
	},
	[types.ARTICLE_DELETE] (state, data) {
		state.ArticleDelete = data;
	},
	[types.FORM_PHOTOS_ADD] (state, response) {

		state.ForumPhotosAdd = response;
	},
	[types.ARTICLE_AGREE_NOTIFY] (state, data) {
		// console.log(data);
		state.ArticleAgreeNotify = data;
	},
	[types.ARTICLE_ANSWER_NOTIFY] (state, data) {
		// console.log(data);
		state.ArticleAnswerNotify = data;
	},
	[types.ARTICLE_AGREE_LIST] (state, data) {

		state.ArticleAgreeList = data;
	},
	[types.AGREE_EVERY_MONTH] (state, data) {

		state.AgreeEveryMonth = data;
	},
	[types.MY_ARTICLE_NOTIFY] (state, data) {

		state.MyArticleNotify = data;
	},
	[types.SET_HISTORY] (state, history) {

		let status = state.historyMenu.some((item) => {

			return item.path == history.path;
		})

		if (!status) {

			state.historyMenu.push(history);
		}


	},
	[types.REMOVE_HISTORY] (state,historyPath) {
		let tmp = state.historyMenu;

		for( let i in tmp) {
			if (tmp[i].path == historyPath) {

				tmp.splice(i,1);
				break;
			}
		}

		state.historyMenu = tmp;
	},
	[types.SHRINK_STATUS] (state) {
		state.ShrinkStatus = !state.ShrinkStatus;
	},

	[types.INIT_SHRINK_STATUS] (state, status) {
		state.ShrinkStatus = status;
	},
	[types.DELETE_PERMISSION] (state, data) {
		state.DeletePermission = data;
	},

	[types.BREAD_PATH] (state, path) {
		//console.log(path)
		let navigation = state.navigation;

		state.Breadcrumb = [];

		for (var i in navigation) {

	        let children = navigation[i].children;

	        if (navigation[i].front_path == path) {
	        	state.Breadcrumb.push(navigation[i].name);
	        }

	        for (var ii in children) {

	          	if (children[ii].front_path == path) {
	          		state.Breadcrumb.push(navigation[i].name);
	            	state.Breadcrumb.push(children[ii].name);
	          	}
	        }
	    }
	},
	[types.ADD_MY_CUSTOMER] (state, data) {
		state.AddMyCustomer = data;
	},
	[types.SEARCH_CUST] (state, response) {
		// console.log(response)
		state.SearchCust = response.data;
	},
	[types.SEARCH_PROJECT] (state, response) {

		state.SearchProject = response.data;
	},
	[types.ADD_RECEIVABLE] (state, response) {

		state.AddReceivable = response;
	},
	[types.ADD_RECEIVEBILL] (state, response) {
		state.AddReceivebill = response;
	},
	[types.AR_SUM_TABLE] (state, response) {
		state.ARSum = response.data;
		state.ARSummaries = response.summaries;
		state.ARSumLoading = false;
		state.ARSumTotal = response.total;
	},
	[types.AR_SUM_TABLE_LOADING] (state) {
		state.ARSumLoading = true;
	},

	[types.UPDATE_RECEIVEBILL] (state, response) {
		state.UpdateReceivebill = response;
	},
	[types.ADD_AR_TYPE] (state, response) {
		state.AddARType = response;
	},
	[types.AR_TYPE] (state, response) {
		state.ARType = response.data;
	},
	[types.ADD_PROJECT] (state, response) {
		state.AddProject = response;
	},
	[types.ARSUM_USER_ROLE] (state, response) {

		state.ARSumUserRole = response;
	},
	[types.BASE_PAGINATION] (state, response) {

		state.BasePagination = response.data;
	},
	[types.ADD_RECEIVABLE_PLAN] (state,response) {
		state.AddReceivablePlan = response;
	},
	[types.REFUND_ADD] (state, response) {
		state.RefundAdd = response;
	},
	[types.REFUND_UPDATE] (state, response) {

		state.UpdateRefund = response;
	},
	[types.SET_AR_TAB] (state, tab) {
		state.ARCurrentTable = tab;
	},
	[types.ARTABLE_CONFIG_CHANGE] (state, obj) {

		for (let i in obj) {
			state.ARTableConfig[i] = obj[i];
		}
	},
	[types.GET_ARSET_FIELD_TYPE] (state, response) {
		state.ARSetFieldType = response;
	},
	[types.ADD_ENUMBERATE] (state, response) {
		console.log(response)
		state.AddEnumberate = response;
	},
	[types.GET_ENUMBERATE] (state, response) {
		// console.log(response)
		state.Enumberate = response;
	},
	[types.ADD_BIND_ATTR] (state, response) {
		state.AddBindAttr = response;
	},
	[types.BIND_ATTR_LIST] (state, response) {
		state.BindAttrList = response;
	},
	[types.STATIC_FIELDS] (state, response) {
		state.FIELDS = response;
	},
	[types.UPDATE_FILTER_QUERY] (state, response) {
		state.filterQuery = response;
	},
	[types.UPDATE_FILTER_QUERY_PARAM] (state, response) {
		for (let i in response) {
			state.filterQuery[i] = response[i];
		}
	},
	[types.ARSUM_SET_CURRENT_ROW] (state, response) {
		state.ARSumCurrentRow = response;
	},
    [types.UPDATE_ARSUMCURRENT_ROW] (state, response) {
        if (response.status == 'success')
        {
            state.ARSumCurrentRow = response.data[0];
        }
    },
	[types.GET_SALE_ORDER_LIST] (state, response) {
		state.SaleOrderList.data = response.row;
		state.SaleOrderList.pagination.total = response.total;
		// console.log(response)
	},
	[types.SET_SALE_ORDER_LIST] (state, response) {
		for (let i in response) {
			state.SaleOrderList[i] = response[i];
		}
	},
	[types.SET_RECEIVEBILL_LIST] (state, response) {
		for (let i in response) {
			state.ReceiveBillList[i] = response[i];
		}
	},
    [types.SET_INITIAL] (state,response) {
        for (let i in response) {
            state.InitialList[i] = response[i];
        }
    },
	[types.GET_RECEIVEBILL_LIST] (state, response) {
		state.ReceiveBillList.data = response.row;
		state.ReceiveBillList.pagination.total = response.total;

	},
	[types.GET_REFUND_LIST] (state, response) {
		state.RefundList.data = response.row;
		state.RefundList.pagination.total = response.total;
	},
	[types.SET_REFUND_LIST] (state, response) {
		for (let i in response) {
			state.RefundList[i] = response[i];
		}
	},
	[types.GET_RECEPLAN_LIST] (state, response) {
		state.RecePlanList.data = response.row;
		state.RecePlanList.pagination.total = response.total;
	},
	[types.SET_RECEPLAN_LIST] (state, response) {
		for (let i in response) {
			state.RecePlanList[i] = response[i];
		}
	},
	[types.UPDATE_CUST_STATUS] (state, response) {
		state.CustStatus = response;
	},
	[types.GET_ARSUM_FILTER_TABLE] (state, response) {
		state.ARSumFilterTable = response;
		state.FilterProgram = response.program;
		// response.program.forEach((item) => {
		// 	if (item.default) {
		// 		state.ARTableConfig.ColumnVisible = item.colvisible;
		// 	}
		// });
	},
	[types.FIND_ARSUM_FILTER_VALUE] (state, response) {
		state.FindARSumFilterValue = response;
	},
	[types.CREATE_PROGRAM] (state, response) {
		state.CreateProgram = response;
	},
	[types.GET_FILTER_PROGRAM] (state, response) {
		state.FilterProgram = response;
	},
	[types.UPDATE_FILTER_CONFIG] (state, response) {
		state.UpdateFilterConfig = response;
	},
	[types.GET_POTENTIAL_CUSTOMER] (state, response) {
		state.PotentialCustomer = response;
	},
	[types.UPDATE_POTENTIAL_QUERY] (state, response) {
		state.PotentialQueryParam = response;
	},
	[types.CREATE_POTENTIAL_PROJECT] (state,response) {
		state.CreatePotentialPro = response;
	},
	[types.ARSUM_INITIALZATION] (state, response) {
		state.ARSumInitialization = response;
	},
	[types.SET_ARSUM_COLUMN_VISIBLE] (state, data) {
		for (let i in data) {
			state.ARTableConfig.ColumnVisible[i].value = data[i].value;
		}

		tool.setter('arsum_column_visible', JSON.stringify(state.ARTableConfig.ColumnVisible));
	},
	[types.SET_ARSUM_GLOBAL_FONTSIZE] (state, FontSize) {
		state.ARTableConfig.FontSize = FontSize;
	},
	[types.FORUM_MODULE_TABLE_DATA] (state, response) {
		//
		if (response.data.length > 0) {
			state.ForumModuleTableData = response.data;
		}
	},
	[types.FORUM_MODULE] (state, response) {
		// console.log(response)
		if (response.data.length > 0) {
			state.ForumModule = response.data;
		}
	},
	[types.FORUM_MODULE_STORE] (state, response) {
		state.ForumModuleStore = response
	},
	[types.PORTAL_PIC_LIST] (state, response) {
		state.PortalPicList = response.data;
	},
	[types.ARTICLE_PERSONAL_MODULE] (state,response) {

		state.ArticlePersonalModule = response.data;
	},
	[types.ARTICLE_CHANGE_CATEGORY] (state, response) {
		state.ArticleChangeCategory = response;
	},
	[types.ARTICLE_CATEGORY_DELETE] (state, response) {
		state.ArticleCategoryDelete = response;
	},
    [types.SET_BASEPRODUCTCONFIG] (state, params)
    {

        eval('state.BaseProduct.' + params.field +'='+params.value);
        //state.BaseProduct.Category.CreateDialog.visible = true;
    },
    [types.PRODUCT_CATEGORY_STORE] (state,response) {
	    state.ProductCategoryStore = response;
    },
    [types.PRODUCT_CATEGORY_LIST] (state, response) {
	    state.ProductCategoryList = response.data;
    },
    [types.PRODUCT_CREATE_PRICE_TABLE] (state, response) {
	    state.ProductCreatePriceTable = response;
    },
    [types.LOAD_PRODUCT_PRICE_TABLE] (state, params) {
	    //state.ProductPriceTableList = response.data;
        state.ProductPriceTableList.push({category:params.category,collects: params.response.data});
    },
    [types.DELETE_PRODUCT_PRICE_TABLE] (state, response) {
        state.DeleteProductPriceTable = response;
    },
    [types.PRODUCT_SURFACE_PRICE_LIST] (state, response) {
	    let data = response.data;

	    if (!state.ProductSurfacePriceList.column.some((item) => {return item.id == data.id}))
        {
            state.ProductSurfacePriceList.column.push({id:data.id,"field":data.column});
        }

        state.ProductSurfacePriceList.rows.push({id:data.id,"row":data.rows});
    },
    [types.MAKEOFFER_PARAMS] (state, response) {
        state.MakeOfferParams = response.data;
    },
    [types.PRODUCT_PRICE_UPDATE] (state,response) {
	    state.ProductPriceUpdate = response;
    },
    [types.PRODUCT_PRICE_VERSION] (state, response) {
        state.ProductPriceVersion.forEach((item,index) => {
            if (item.brand == response.info.product_brand)
                state.ProductPriceVersion.splice(index,1);
        });
        state.ProductPriceVersion.push({product_brand:response.info.product_brand,rows:response.response.data});
    },
    [types.PRODUCT_PRICE_FAST_UPDATE] (state, response) {
        state.ProductPriceFastUpdate = response;
    },
    [types.PRODUCT_CREATE_OFFER] (state, response) {
	    state.CreateOffer = response;
    },
    [types.PRODUCT_OFFERS] (state, response) {
	    state.ProductOffers = response.data
    },
    [types.DEPARTMENT_SET_ASSISTANT] (state, response) {
	    state.departmentSetAssistant = response;
    },
    [types.LOAD_COST_ROLE] (state,response) {
        state.CostRole.users = response.users;
        state.CostRole.authorize = response.authorize;
    },
    [types.MODIFY_OFFER] (state,response) {
	    state.ModifyOffer = response;
    },
    [types.LOAD_PRICE_INFO] (state, response) {
	    state.priceInfo = response.data;
    },
    [types.QUERY_CUSTOMER] (state, response) {
	    state.QueryCustomer = response.data;
    },
    [types.GET_INITIAL_LIST] (state, response) {
	    state.InitialList.data = response.data;
        state.InitialList.total = response.total;
    },
    [types.CREATE_INITIAL] (state, response) {
	    state.CreateInitial = response;
    },
    [types.RESET_PWD_FROMMANAGEMENT] (state, response) {
	    state.ResetPwdFromManagement = response;
    },
    [types.LOAD_HISTORY_PRICES] (state, response) {

	    state.LoadHistoryPrices.notice = response.notice;
	    state.LoadHistoryPrices.rows = response.data.rows;
	    state.LoadHistoryPrices.column = response.data.column;
    },
    [types.UPDATE_TARGET] (state, response) {
	    state.updateTarget = response;
    },
    [types.LOAD_STANDARD_PRICE] (state, response) {
        state.LoadStandardPrice.status = response.status;

        if (response.status == "success") {
            state.LoadStandardPrice.notice = response.notice;
            state.LoadStandardPrice.rows = response.data.rows;
            state.LoadStandardPrice.column = response.data.column;
        }
        else {
            state.LoadStandardPrice.notice = response.errmsg;
        }

    }
}

export default mutations;
