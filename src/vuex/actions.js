import * as api from '../api/user.js';
import tool from '../util/tool.js';

export const login = ( {commit}, userInfo) => {
	return api.login(userInfo).then((response) => {
		// window.location.replace('#/app');
		// console.log(response);
		commit('LOGIN', response);
	})
}

export const signup  = ( {commit}, userInfo) => {
	return api.signup(userInfo).then( (response) => {
		commit('USER_SIGNUP', response);
	});
}
export const UserImport = ({commit}, info) => {
	return api.UserImport(info).then((response) => {
		commit('USER_IMPORT', response);
	});
}
export const UserDisable = ({commit}, info) => {
	return api.UserDisable(info).then((response) => {
		commit('putUserRole', response);
	});
}
export const UserDelete = ({commit}, info) => {
	return api.UserDelete(info).then((response) => {
		commit('USER_DISABLE', response);
	})
}
export const InitToken = ({commit}, token) => {
	return commit('INIT_TOKEN', token);
}
export const AuthUpdatePasswd = ({commit}, info) => {
	return api.AuthUpdatePasswd(info).then((response) => {
		commit('AUTH_UPDATE_PASSWD', response);
	})
}
export const getUserInfo = ({commit}) => {
	return api.getUserInfo().then((response) => {
		commit('USER_INFO', response);
	});
}

export const logout = ({commit}) => {
  return api.logout().then( (response) => {
  	if (response.status == 'success') {
  		tool.setter('token', '');
  		window.location.href = '#/login';
  	}
  })
}

export const initNavigation = ( {commit} ) => {
	return api.initNavigation().then((response) => {
		commit('NAVIGATION', response);
	})
}

export const addGroup = ({commit}, data) => {
	return api.addGroup(data).then((response) => {
		commit('ADD_GROUP', response);
	});
}

export const getGroups = ({commit}) => {
	return api.getGroups().then((response) => {
		commit('GET_GROUP_LIST', response);
	});
}

export const updatePermission = ({commit}, info) => {
	return api.updatePermission(info).then( (response) => {
		commit('UPDATE_PERMISSION_STATUS', response);
	});
}

export const DeletePermission = ({commit}, info) => {
	return api.DeletePermission(info).then((response) => {
		commit('DELETE_PERMISSION', response);
	})
}

export const getFunctionTable = ({commit}) => {
	
	return api.getFunctionTable().then((response) => {
		commit('GET_FUNCTION_TABLE_DATA', response);
	})
}

export const addRole = ({commit}, roleData) => {
	return api.addRole(roleData).then((response) => {
		commit('ROLE_ADD', response);
	});
}

export const getRoleTree = ({commit}) => {
	return api.getRoleTree().then((response) => {
		commit('ROLE_TREE_DATA', response);
	})
}

export const getRoleList = ( {commit}) => {
	return api.getRoleList().then((response) => {
		commit('ROLE_TABLE_DATA', response);
	});
}

/**
* 获取权限列表选中项 
*/
export const getRoleTreeSelectNode = ({commit}, id) => {
	return api.getRoleTreeSelectNode(id).then( (response ) => {
		commit('TREE_SELECT', response);
	})
}
/**获取角色信息**/
export const getRoleOne = ({commit}, id) => {
	return api.getRoleOne(id).then((response) => {
		commit('ROLE_INFO', response);
	})
}
/**修改角色**/
export const updateRole = ({commit}, userInfo) => {
	return api.updateRole(userInfo).then( (response) => {
		commit('UPDATE_ROLE_STATUS', response);
	} )
}
/**设置功能权限**/
export const putRole = ({commit}, roleInfo) => {
	return api.putRole(roleInfo).then((response) => {
		commit('PUT_ROLE_STATUS', response);
	});
}

/**设置图标文件**/
export const updateIconCssFile = ( {commit}, info) => {
	return api.updateIconCssFile(info).then((response) => {
		commit('UPDATE_ICON_CSS_FILE', response);
	});
}
/**获取图标文件**/
export const loadIconUrl = ({commit}) => {
	return api.loadIconUrl().then((response) => {
		commit('ICON_URL', response);
	})
}

/****用户管理****/
export const getUserList = ({commit}) => {
	return api.getUserList().then((response) => {
		commit('USER_LIST', response);
	});
}
export const getUserRole = ({commit}, id) => {
	return api.getUserRole(id).then((response) => {
		commit('USER_ROLE', response);
	});
}
export const putUserRole = ({commit},roleInfo) => {
	return api.putUserRole(roleInfo).then((response) => {
		commit('PUT_USER_ROLE_STATUS', response);
	})
}

export const updateUserAuthorize = ({commit}, userInfo) => {
	return api.updateUserAuthorize(userInfo).then( (response) => {
		commit('UPDATE_USER_AUTHORIZE', response);
	})
}

/**添加品牌**/
export const createBrand = ({commit} , info) => {
	return api.postBrand(info).then((response) => {
		commit('POST_BRAND_STATUS', response);
	});
}
/**品牌列表**/
export const brandList = ( {commit} ) => {
	return api.brandList().then((response) => {
		commit('BRAND_LIST',response);
	});
}
/**更新品牌**/
export const updateBrand = ({commit}, info) => {
	return api.updateBrand(info).then((response) => {
		commit('UPDATE_BRAND', response);
	});
}

/**更新品牌状态**/
export const updateBrandStatus = ({commit}, info) => {
	return api.updateBrandStatus(info).then((response) => {
		commit('UPDATE_BRAND_STATUS', response);
	});
}

/**省级联动**/
export const getRegion = ({commit}, info) => {
	return api.getRegion(info).then((response) => {
		commit('REGION_LIST', response);
	});
}

/**客户资源创建**/
export const customerCreate = ({commit}, info) => {
	return api.customerCreate(info).then((response) => {
		commit('CUSTOMER_CREATE',response);
	})
}
/**修改客户资源**/
export const customerUpdate = ({commit},info) => {
	return api.customerUpdate(info).then((response) => {
		commit('CUSTOMER_UPDATE', response);
	})
}
/**客户资源后台管理列表**/
export const customerManagerList = ({commit}, info) => {
	return api.customerManagerList(info).then((response) => {
		commit('CUSTOMER_MANAGER_LIST', response);
	})
}

/**客户资源列表**/
export const getCustomer = ( {commit}, info ) => {
	return api.getCustomer(info).then( (response) => {
		commit('CUSTOMER_LIST', response);
	} ); 
}

/**领取一个客户**/
export const receiveCustomer = ({commit}, info) => {
	return api.receiveCustomer(info).then((response) => {
		commit('RECEIVE_CUSTOMER', response);
	});
}

/**个人客户列表**/
export const getPersonalCustomer = ({commit}, info) => {
	return api.getPersonalCustomer(info).then( (response) => {
		commit('PERSONAL_CUSTOMER', response);
	} )
}

/**新建一个跟进记录**/
export const appendComments = ({commit}, info) => {
	return api.appendComments(info).then((response) => {
		commit('APPENT_COMMENTS', response);
	})
}
/**获取记录**/
export const getComments = ({commit}, info) => {
	return api.getComments(info).then((response) => {
		commit('COMMENT_LIST', response);
	})
}
/**释放客户**/
export const freeCustomer = ({commit}, info) => {
	return api.freeCustomer(info).then( (response) => {
		commit('FREE_CUSTOMER', response);
	} )
} 
/**验收客户**/
export const acceptCustomer = ({commit}, info) => {
	return api.acceptCustomer(info).then( (response) => {
		commit('ACCEPT_CUSTOMER', response);
	} )
}

/**发布客户**/
export const customerPublish = ({commit}, info) => {
	return api.customerPublish(info).then((response) => {
		commit('CUSTOMER_PUBLISH', response);
	})
}

/**部门列表**/
export const departmentList = ({commit}) => {
	return api.departmentList().then((response) => {
		commit('DEPARTMENT_LIST', response);
	})
}
/**创建部门**/
export const departmentCreate = ({commit}, info) => {
	return api.departmentCreate(info).then((response) => {
		commit('DEPARTMENT_CREATE',response);
	})
}
/**修改部门**/
export const departmentModify = ({commit}, info) => {
	 
	return api.departmentModify(info).then((response) => {
		commit('DEPARTMENT_MODIFY',response);
	});
}
/**获取部门成员**/
export const departmentStaff =({commit}, info) => {
	return api.departmentStaff(info).then((response) => {
		commit('DEPARTMENT_STAFF', response);
	})
}
/**更新部门成员**/
export const departmentSetStaff = ({commit}, info) => {
	return api.departmentSetStaff(info).then((response) => {
		commit('DEPARTMENT_SET_STAFF', response);
	})
}
/**部门设置管理**/
export const departmentSetManager = ({commit}, info) => {
	return api.departmentSetManager(info).then((response) => {
		commit('DEPARTMENT_SET_MANAGER', response);
	})
}

/**企业微信新建群聊**/
export const createChat = ({commit}, info) => {
	return api.createChat(info).then((response) => {
		commit('CREATE_CHAT', response);
	});
}

/**客户组件数据初始化**/
export const initCustomer = ({commit}, info) => {
	return api.initCustomer(info).then((response) => {
		commit('INIT_CUSTOMER', response);
	});
}
/**同步微信通讯录**/
export const syncUser = ({commit}) => {
	return api.syncUser().then((response) => {
		commit('SYNC_USER', response);
	})
}
/**初始化数据**/
export const initUserList = ({commit}) => {
	return api.initUserList().then((response) => {
		commit('INIT_USER_LIST', response);
	})
}
/**加入企业微信**/
export const joinWorkWx = ({commit},info) => {
	return api.joinWorkWx(info).then((response) => {
		commit('JOIN_WORKWX', response);
	})
}
/**移动端初始化**/
export const InitMobileData = ({commit}) => {
	return api.InitMobileData().then((response) => {
		commit('INIT_MOBILE_DATA', response);
	});
}
/**设置当前浏览的客户信息**/
export const SetCurrentCustomer = ({commit}, item) => {
	if (typeof(item) == 'object') {
		return commit('SET_CURRENT_CUSTOMER', item);
	}
}
export const ArticlePost = ({commit}, article) => {
	return api.ArticlePost(article).then((response) => {
		return commit('ARTICLE_POST', response);
	})
}

export const ForumModuleArticles = ({commit}, info) => {
	return api.ForumModuleArticles(info).then((response) => {
		return commit('FORUM_MODULE_ARTICLES',response);
	})
}
export const ForumModuleArticlesClear = ({commit}) => {
	return commit('FORUM_MODULE_ARTICLE_CLEAR');
}
export const ForumModuleSync = ({commit}, info) => {
	return api.ForumModuleSync().then((response) => {
		return commit('FORUM_MODULE_SYNC', response);
	})
}
export const ArticlePortalShow = ({commit},info) => {
	return api.ArticlePortalShow(info).then((response) => {
		return commit('ARTICLE_PORTAL_SHOW', response);
	})
}
export const SetArticleTop = ({commit}, info) => {
	return api.SetArticleTop(info).then((response) => {
		return commit('SET_ARTICLE_TOP', response);
	});
}
export const CancelArticleTop = ({commit}, info) => {
	return api.CancelArticleTop(info).then((response) => {
		return commit('SET_ARTICLE_TOP', response);
	})
}
export const ArticleCategory = ({commit}) => {
	return api.ArticleCategory().then((response) => {
		return commit('ARTICLE_CATEGORY', response);
	});
}
export const ArticleChangeCategory = ({commit},info) => {
	return api.ArticleChangeCategory(info).then((response) => {
		return commit('ARTICLE_CHANGE_CATEGORY', response);
	});
}

export const ClearArticle = ({commit}) => {
	return commit('CLEAR_ARTICLE');
}
export const ArticleManagerCategory = ({commit}) => {
	return api.ArticleManagerCategory().then((response) => {
		return commit('ARTICLE_MANAGER_CATEGORY', response);
	});
}
export const LoadArticleModuleCategory = ({commit}, info) => {
	return api.LoadArticleModuleCategory(info).then((response) => {
		return commit('LOAD_ARTICLE_MODULE_CATEGORY', response);
	});
}
export const ArticleCategoryPost = ({commit}, info) => {
	return api.ArticleCategoryPost(info).then((response) => {
		return commit('ARTICLE_CATEGORY_POST', response);
	})
}

export const ArticleOne = ({commit}, info) => {
	return api.ArticleOne(info).then((response) => {
		return commit('ARTICLE_GET_ONE', response);
	})
}
export const AddArticleAnswer = ({commit}, info) => {
	return api.AddArticleAnswer(info).then((response) => {
		return commit('ADD_ARTICLE_ANSWER',response);
	})
}
export const ArticleAnswer = ({commit}, info)=> {
	return api.ArticleAnswer(info).then((response) => {
		return commit('ARTICLE_ANSWER', response);
	})
}
//点赞行为
export const AricleAgreeClick = ({commit}, info) => {
	return api.AricleAgreeClick(info).then((response) => {
		return commit('ARTICLE_AGREE_CLICK', response);
	})
}
//获取赞
export const ArticleAgree = ({commit}, info) => {
	return api.ArticleAgree(info).then((response) => {
		return commit('ARTICLE_AGREE', response);
	})
}
//初始化导航
export const ForumMenu = ({commit}) => {
	return api.ForumMenu().then((response) => {
		return commit('FORUM_MENU', response);
	});
}
//草稿箱
export const ArticleDraft = ({commit},info) => {
	return api.ArticleDraft().then((response) => {
		return commit('ARTICLE_DRAFT', response);
	})
}
//草稿箱发布文章
export const ArticlePublish = ({commit}, info) => {
	return api.ArticlePublish(info).then((response) => {
		return commit('ARTICLE_PUBLISH', response);
	});
}
//获取要编辑的文章
export const ArticleEdit = ({commit}, info ) => {
	return api.ArticleEdit(info).then((response) => {
		return commit('ARTICLE_EDIT', response);
	})
}
//更新文章
export const ArticlePut = ({commit}, info) => {
	return api.ArticlePut(info).then((response) => {
		return commit('ARTICLE_PUT', response);
	});
}
//已发布文章
export const ArticlePublishList = ({commit}) => {
	return api.ArticlePublishList().then((response) => {
		return commit('ARTICLE_PUBLISH_LIST', response);
	})
}
//修改分类
export const ArticleCategoryPut = ({commit}, info) => {
	return api.ArticleCategoryPut(info).then((response) => {
		return commit('ARTICLE_CATEGORY_PUT', response);
	})
}
//设置精品
export const ArticleSetFine = ({commit}, info) => {

	return api.ArticleSetFine(info).then((response) => {
		return commit('ARTICLE_SET_FINE',response);
	})
}
//删除文章
export const ArticleDelete = ({commit}, info) => {
	return api.ArticleDelete(info).then((response) => {
		return commit('ARTICLE_DELETE',response);
	})
}
//获取动态
export const ArticleAgreeNotify = ({commit}) => {
	return api.ArticleAgreeNotify().then((response) => {
		return commit('ARTICLE_AGREE_NOTIFY', response);
	})
}
//获取回答动态
export const ArticleAnswerNotify = ({commit}) => {
	return api.ArticleAnswerNotify().then((response) => {
		return commit('ARTICLE_ANSWER_NOTIFY', response);
	})
}
//点赞明细
export const ArticleAgreeList = ({commit}) => {
	return api.ArticleAgreeList().then((response) => {
		return commit('ARTICLE_AGREE_LIST', response);
	})
}

//统计每一个月的获赞
export const AgreeEveryMonth = ({commit}, info) => {
	return api.AgreeEveryMonth(info).then((response) => {
		return commit('AGREE_EVERY_MONTH', response);
	})
}
//初始化侧边栏动态

export const MyArticleNotify = ({commit}) => {
	return api.MyArticleNotify().then((response) => {
		return commit('MY_ARTICLE_NOTIFY', response);
	})
}

//浏览记录
export const SetHistory = ({commit}, history) =>  {
	return commit('SET_HISTORY', history);
}
export const RemoveHistory = ({commit}, historyPath) => {
	return commit('REMOVE_HISTORY', historyPath);
}
//论坛公共版块管理
export const GetForumModuleTable = ({commit}) => {
	return api.GetForumModuleTable().then((response) => {
		return commit('FORUM_MODULE_TABLE_DATA', response);
	})
}

//新增图册
export const ForumPhotosAdd = ({commit}, info) => {
	return api.ForumPhotosAdd(info).then((response) => {
		return commit('FORM_PHOTOS_ADD', response);
	})
}
//论坛首页图册
export const PortalPicList = ({commit}) => {
	return api.PortalPicList().then((response) => {
		commit('PORTAL_PIC_LIST', response);
	})
}
export const GetForumModule = ({commit}) => {
	return api.GetForumModule().then((response) => {
		return commit('FORUM_MODULE', response);
	})
}
export const ForumModuleStore = ({commit}, info) => {
	return api.ForumModuleStore(info).then((response) => {
		return commit('FORUM_MODULE_STORE', response);
	});
}
export const ForumModuleDel = ({commit}, info) => {
	return api.ForumModuleDel(info).then((response) => {
		return commit('FORUM_MODULE_STORE', response);
	})
}
export const ForumModuleUpdate = ({commit}, info) => {
	return api.ForumModuleUpdate(info).then((response) => {
		return commit('FORUM_MODULE_STORE', response);
	})
}

//侧边菜单伸缩
export const ShrinkStatus = ({commit}) => {
	return commit('SHRINK_STATUS');
}

export const InitShrinkStatus = ({commit}, status) => {
	return commit('INIT_SHRINK_STATUS',status);
}
//面包屑导航
export const Breadcrumb = ({commit}, path) => {
	return commit('BREAD_PATH',path);
}
export const AddMyCustomer = ({commit}, info) => {
	return api.AddMyCustomer(info).then((response) => {
		return commit('ADD_MY_CUSTOMER', response);
	})
}
export const SearchCust = ({commit}, info) => {
	return api.SearchCust(info).then((response) => {
		return commit('SEARCH_CUST', response);
	})
}
export const AddReceivable = ({commit}, info) => {
	return api.AddReceivable(info).then((response) => {
		return commit('ADD_RECEIVABLE', response);
	})
}
export const UpdateReceivable = ({commit}, info) => {
	return api.UpdateReceivable(info).then((response) => {
		return commit('ADD_RECEIVABLE', response);
	})
}

export const DeleteReceivable = ({commit}, info) => {
	return api.DeleteReceivable(info).then((response) => {
		return commit('ADD_RECEIVABLE', response);
	})
}

export const AddReceivebill = ({commit}, info) => {
	return api.AddReceivebill(info).then((response) => {
		return commit('ADD_RECEIVEBILL', response);
	})
}
/**删除退款 */
export const DeleteReceivebill = ({commit}, info) => {
	return api.DeleteReceivebill(info).then((response) => {
		return commit('ADD_RECEIVEBILL', response);
	});
}
export const ARSum = ({commit}, query) => {
	//状态开始
	commit('AR_SUM_TABLE_LOADING');
	return api.ARSum(query).then((response) => {
		return commit('AR_SUM_TABLE', response);
	})
}

//更新某一个项目的欠款信息
export const UpdateARSumCurrentRow = ({commit}, pid) => {
    let info = {conf:[{operator:0,field: 'pid',value:pid}], offset:0,limit: 1,initialization: 1,type:1};
    return api.ARSum(info).then((response) => {
       return commit('UPDATE_ARSUMCURRENT_ROW',response);
    });
}

export const UpdateReceivebill = ({commit},info) => {
	return api.UpdateReceivebill(info).then((response) => {
		return commit('ADD_RECEIVEBILL', response);
	})
}
export const AddARType = ({commit}, info) => {
	return api.AddARType(info).then((response) => {
		return commit('ADD_AR_TYPE', response);
	})
}
export const ARType = ({commit}) => {
	return api.ARType().then((response) => {
		return commit('AR_TYPE', response);
	})
}

export const ARUploadUrl = () => {
	let url = api.ARUploadUrl();

	return url;
}
export const AddProject = ({commit}, info) => {
	return api.AddProject(info).then((response) => {
		return commit('ADD_PROJECT', response);
	})
}
/**查询项目**/
export const SearchProject = ({commit}, info) => {
	return api.SearchProject(info).then((response) => {
		return commit('SEARCH_PROJECT', response);
	})
}
/**初始化权限**/
export const ARSumUserRole = ({commit}) => {
	return api.ARSumUserRole().then((response) => {
		return commit('ARSUM_USER_ROLE', response);
	})
} 
/**初始化分页配置**/
export const InitPagination = ({commit}) => {
	return api.InitPagination().then((response) => {
		return commit('BASE_PAGINATION', response);
	})
}
/**提交收款计划**/
export const AddReceivablePlan = ({commit}, info) => {
	return api.AddReceivablePlan(info).then((response) => {
		return commit('ADD_RECEIVABLE_PLAN', response);
	})
}
/**修改收款计划 */
export const updateReceivablePlan = ({commit}, info) => {
	return api.updateReceivablePlan(info).then((response) => {
		return commit('ADD_RECEIVABLE_PLAN', response);
	})
}
export const deleteReceivablePlan = ({commit}, info) => {
	return api.deleteReceivablePlan(info).then((response) => {
		return commit('ADD_RECEIVABLE_PLAN', response);
	})
}
/**提交退款**/
export const RefundAdd = ({commit}, info) => {
	return api.RefundAdd(info).then((response) => {
		return commit('REFUND_ADD', response);
	})
}
/**修改退货**/
export const RefundUpdate = ({commit}, info) => {
	return api.RefundUpdate(info).then((response) => {
		return commit('REFUND_ADD', response);
	})
}
/**删除退货 */
export const RefundDelete = ({commit}, info) => {
	return api.RefundDelete(info).then((response) => {
		return commit('REFUND_ADD', response);
	})
}
/**切换表格**/
export const SetARTable = ({commit}, tab) => {
	return commit('SET_AR_TAB',tab);
}
/**设置**/
export const AlterTableConfig = ({commit}, info) => {
	return commit('ARTABLE_CONFIG_CHANGE', info);
}
export const GetArsetFieldType = ({commit}, info) => {
	return api.GetArsetFieldType(info).then((response) => {
		return commit('GET_ARSET_FIELD_TYPE', response);
	})
}
export const AddEnumberate = ({commit},info) => {
	return api.AddEnumberate(info).then((response) => {
		return commit('ADD_ENUMBERATE', response);
	})
}
export const UpdateEnumberate = ({commit}, info) => {
	return api.UpdateEnumberate(info).then((response) => {
		return commit('ADD_ENUMBERATE', response);
	})
}
export const GetEnumberate = ({commit}) => {
	return api.GetEnumberate().then((response) => {
		return commit('GET_ENUMBERATE', response);
	})
}
export const AddBindAttr = ({commit}, info) => {
	return api.AddBindAttr(info).then((response) => {
		return commit('ADD_BIND_ATTR', response);
	})
}

export const UpdateBindAttr = ({commit}, info) => {
	return api.UpdateBindAttr(info).then((response) => {
		return commit('ADD_BIND_ATTR', response);
	})
}

export const getBindAttrList = ({commit}) => {
	return api.getBindAttrList().then((response) => {
		return commit('BIND_ATTR_LIST', response);
	})
}
export const getBindAttrFromPath = ({commit}, info) => {
	return api.getBindAttrFromPath(info).then((response) => {
		return commit('STATIC_FIELDS', response);
	})
}
export const updateFilterQuery = ({commit}, info) => {
	return commit('UPDATE_FILTER_QUERY', info);
}
export const updateFilterQueryParam = ({commit}, info) => {
	return commit('UPDATE_FILTER_QUERY_PARAM', info);
}
export const ARSumCurrentRow = ({commit}, info) => {
	return commit('ARSUM_SET_CURRENT_ROW', info);
}
//销售明细
export const GetSaleOrderList = ({commit}, info) => {
	return api.GetSaleOrderList(info).then((response) => {
		return commit('GET_SALE_ORDER_LIST', response);
	})
}
export const SetSaleOrderList = ({commit}, info) => {
	return commit('SET_SALE_ORDER_LIST', info);
}
//收款明细
export const GetReceiveBillList = ({commit}, info) => {
	return api.GetReceiveBillList(info).then((response) => {
		return commit('GET_RECEIVEBILL_LIST', response);
	});
}
export const SetReceiveBillList = ({commit}, info) => {
	return commit('SET_RECEIVEBILL_LIST', info);
}
//退货明细
export const GetRefundList = ({commit}, info) => {
	return api.GetRefundList(info).then((response) => {
		return commit('GET_REFUND_LIST', response);
	});
}
export const SetRefundList = ({commit}, info) => {
	return commit('SET_REFUND_LIST', info);
}
/**收款计划 */
export const GetRecePlanList = ({commit}, info) => {
	return api.GetRecePlanList(info).then((response) => {
		return commit('GET_RECEPLAN_LIST', response);
	});
}
export const SetRecePlanList = ({commit}, info) => {
	return commit('SET_RECEPLAN_LIST', info);
}
/**设置客户状态 */
export const UpdateCustStatus = ({commit}, info) => {
	return api.UpdateCustStatus(info).then((response) => {
		return commit('UPDATE_CUST_STATUS', response);
	});
	
}
export const GetARSumFilterTable = ({commit}) => {
	return api.GetARSumFilterTable().then((response) => {
		return commit('GET_ARSUM_FILTER_TABLE', response);
	})
}
export const FindARSumFilterValue  = ({commit},info) => {
	return api.FindARSumFilterValue(info).then((response) => {
		return commit('FIND_ARSUM_FILTER_VALUE', response);
	});
}
export const CreateProgram = ({commit}, info) => {
	return api.CreateProgram(info).then((response) => {
		return commit('CREATE_PROGRAM', response);
	})
}
export const UpdateProgram = ({commit}, info) => {
	return api. UpdateProgram(info).then((response) => {
		return commit('CREATE_PROGRAM', response);
	})
}
export const FilterProgram = ({commit}) => {
	return api.FilterProgram().then((response) => {
		return commit('GET_FILTER_PROGRAM', response);
	})
}
export const DeleteProgram = ({commit}, info) => {
	return api.DeleteProgram(info).then((response) => {
		return commit('CREATE_PROGRAM', response);
	})
}
export const UpdateFilterConfig = ({commit}, info) => {
	return api.UpdateFilterConfig(info).then((response) => {
		return commit('UPDATE_FILTER_CONFIG', response);
	});
}
//目标潜在客户
export const PotentialCustomer = ({commit}, info) => {
	return api.PotentialCustomer(info).then((response) => {
		commit('GET_POTENTIAL_CUSTOMER', response);
	})
}
export const updatePotentialFilterQueryParam = ({commit}, info) => {
	return commit('UPDATE_POTENTIAL_QUERY', info);
}
export const CreatePotentialPro = ({commit}, info) => {
	return api.CreatePotentialPro(info).then((response) => {
		commit('CREATE_POTENTIAL_PROJECT', response);
	})
}
export const ARSumInitialization = ({commit}) => {
	return api.ARSumInitialization().then((response) => {
		commit('ARSUM_INITIALZATION',response);
	})
}
export const SetARSumColumnVisible = ({commit},info) => {
	return commit('SET_ARSUM_COLUMN_VISIBLE', info);
}
export const SetARSumGlobalFontSize = ({commit}, info) => {
	return commit('SET_ARSUM_GLOBAL_FONTSIZE', info);
}
export const ArticlePersonalModule = ({commit}) => {
	return api.ArticlePersonalModule().then((response) => {
		return commit('ARTICLE_PERSONAL_MODULE', response);
	});
}
export const ArticleCategoryDelete = ({commit}, info) => {
	return api.ArticleCategoryDelete(info).then((response) => {
		commit('ARTICLE_CATEGORY_DELETE',response);
	})
}
export const SetBaseProductConfig = ({commit}, info) => {
    return commit("SET_BASEPRODUCTCONFIG",info);
}
export  const ProductCategoryStore = ({commit}, info) => {
    return api.ProductCategoryStore(info).then((response) => {
        return commit("PRODUCT_CATEGORY_STORE", response);
    })
}
export const LoadProductCategory = ({commit}) => {
    return api.LoadProductCategory().then((response) => {
        return commit("PRODUCT_CATEGORY_LIST", response);
    });
}
export const ProductCreatePriceTable = ({commit}, info) => {
    return api.ProductCreatePriceTable(info).then((response) => {
       return commit("PRODUCT_CREATE_PRICE_TABLE",response);
    });
}
export const LoadProductPriceTable = ({commit}, info) => {
    return api.LoadProductPriceTable(info).then((response) => {
        return commit("LOAD_PRODUCT_PRICE_TABLE",{category:info.category,response:response});
    });
}
export const DeleteProductPriceTable = ({commit}, info) => {
    return api.DeleteProductPriceTable(info).then((response) => {
       return commit("DELETE_PRODUCT_PRICE_TABLE", response);
    });
}
export const ProductSurfacePriceList = ({commit}, info) => {
    return api.ProductSurfacePriceList(info).then((response) => {
        return commit("PRODUCT_SURFACE_PRICE_LIST",response);
    });
}
export const MakeOfferParams = ({commit}) => {
    return api.MakeOfferParams().then((response) => {
        return commit("MAKEOFFER_PARAMS", response);
    });
}
export const ProductPriceUpdate =({commit}, info) => {
    return api.ProductPriceUpdate(info).then((response) => {
        return commit("PRODUCT_PRICE_UPDATE", response);
    });
}
export const ProductPriceVersion = ({commit}, info) => {
    return api.ProductPriceVersion(info).then((response) => {
        return commit("PRODUCT_PRICE_VERSION", {info,response});
    })
}
export const ProductPriceFastUpdate = ({commit}, info) => {
    return api.ProductPriceFastUpdate(info).then((response) => {
        return commit("PRODUCT_PRICE_FAST_UPDATE", response);
    });
}
export const CreateOffer = ({commit}, info) => {
    return api.CreateOffer(info).then((response) => {
        return commit("PRODUCT_CREATE_OFFER", response);
    });
}
export const ProductOffers = ({commit}, info) => {
    return api.ProductOffers(info).then((response) => {
        return commit("PRODUCT_OFFERS",response);
    })
}
export const departmentSetAssistant = ({commit}, info) => {
    return api.departmentSetAssistant(info).then((response) => {
        return commit("DEPARTMENT_SET_ASSISTANT", response);
    });
}
export const LoadCostRole = ({commit}) => {
    return api.LoadCostRole().then((response) => {
        return commit("LOAD_COST_ROLE", response);
    });
}
