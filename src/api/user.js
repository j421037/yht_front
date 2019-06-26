import * as http from '../util/http.js';

export const login = (userInfo) => {
	// console.log(userInfo);
	return http.post('auth/login', userInfo);
}

export const signup = (userInfo) => {
	return http.post('auth/register', userInfo);
}
export const getUserInfo = () =>{
	return http.get('auth/user');
}
export const UserImport = (info) => {
	return http.post('user/import', info);
}
export const UserDisable = (info) => {
	return http.post('user/disable', info);
}
export const UserDelete = (info) => {
	return http.post('user/delete', info);
}
export const logout = () => {
	return http.post('auth/logout');
}
export const AuthUpdatePasswd = (info) => {
	return http.post('auth/put/resetpass', info);
}

export const initNavigation = () => {
	return http.post('user/get/navigation');
}

export const addGroup = (info) => {
	return http.post('permission/add/group', info);
}
export const getGroups = () => {
	return http.post('permission/get/groups');
}

export const updatePermission = (info) => {
	return http.post('permission/put/one', info);
}

export const updateIconCssFile = (info) => {
	return http.post('base/put/url', info);
}
export const loadIconUrl = () => {
	return http.post('base/get/icon');
}
export const addRole = (roleData) => {
	return http.post('role/add', roleData);
}
export const getRoleList = () => {
	return http.post('role/list');
}
export const getRoleTree = () => {
	return http.post('role/get/permission');
}
export const getFunctionTable = (pageSize) => {
	return http.post('permission/get/all');
}
export const getRoleTreeSelectNode = (id) => {
	return http.post('role/get/NodeSelect', {id:id});
}
export const updateRole = (userInfo) => {
	return http.post('role/update/user', userInfo);
}
export const getRoleOne = (id) => {
	return http.post('role/get/one', {id:id});
}
export const putRole = (role) => {
	return http.post('role/put/one', role);
}
export const getUserList = () => {
	return http.post('user/get/list');
}
export const updateUserAuthorize = (info) => {
	return http.post('user/update/authorize', info);
}
export const getUserRole = (id) => {
	return http.post('user/get/role', {id: id});
}
export const putUserRole = (roleInfo) => {
	return http.post('user/put/role', roleInfo);
}
export const postBrand = (info) => {
	return http.post('brand/post/one', info);
}
export const brandList = () => {
	return http.post('brand/get/all');
}
export const updateBrand = (info) => {
	return http.post('brand/put/one', info);
}

export const updateBrandStatus = (info) => {
	return http.post('brand/put/status', info);
}

export const getRegion = (info) => {
	return http.post('customer/get/region', info);
}

export const customerCreate = (info) => {
	return http.post('customer/post/create', info);
}
export const customerUpdate = (info) => {
	return http.post('customer/post/update', info);
}
export const getCustomer = (info) => {
	return http.post('customer/public/list', info);
}
export const receiveCustomer = (info) => {
	return http.post('customer/receive/one', info);
}
export const getPersonalCustomer = (info) => {
	return http.post('customer/personal/list', info);
}
export const appendComments = (info) => {
	return http.post('customer/post/comments', info);
}
export const getComments = (info) => {

	return http.post('customer/get/comments', info);
}
export const freeCustomer = (info) => {
	return http.post('customer/free/one', info);
}
export const acceptCustomer = (info) => {
	return http.post('customer/accept/one', info);
}
export const customerManagerList = (info) => {
	return http.post('customer/manager/list', info);
}
export const customerPublish = (info) => {
	return http.post('customer/publish', info);
}
export const departmentList = () => {
	return http.post('department/get/list');
}
export const departmentModify = (info) => {
	return http.post('department/put/one', info);
}
export const departmentCreate = (info) => {
	return http.post('department/post/create', info);
}
export const departmentStaff = (info) => {
	return http.post('department/get/users', info);
}
export const departmentSetStaff = (info) => {
	return http.post('department/put/users', info);
}
export const departmentSetManager = (info) => {
	return http.post('department/put/manager', info);
}
export const departmentSetAssistant = (info) => {
    return http.post("department/put/assistant", info);
}
export const initCustomer = (info) => {
	return http.post('customer/get/init', info);
}
export const syncUser = () => {
	return http.post('user/update/workwx');
}
export const initUserList = () => {
	return http.post('user/get/init');
}
export const joinWorkWx = (info) => {
	return http.post('user/put/workwx', info);
}
export const InitMobileData = () => {
	return http.post('m/get/basedata');
}
export const createChat = (info) => {
	return http.post('wechat/post/chat', info);
}
export const ArticlePost = (article) => {
	return http.post('article/post', article);
}

export const ForumModuleArticles = (info) => {
	return http.post('article/modules/get', info);
}
export const ArticleChangeCategory = (info) => {
	return http.post('article/category/change', info);
}
export const ArticlePortalShow = (info) => {
	return http.post('article/portal/get', info);
}
export const ArticleCategory = () => {
	return http.post('article/category/get');
}
export  const FeelbackCategory = () => {
	return http.post('article/category/get/feelback');
}
export const ArticleManagerCategory = () => {
	return http.post('article/category/manager/get');
}
export const LoadArticleModuleCategory = (info) => {
	return http.post('article/list/category/get', info);
}
export const ArticleCategoryPost = (info) => {
	return http.post('article/category/post', info);
}
export const ArticleOne = (info) => {
	return http.post('article/get/'+info.id, info);
}
export const AddArticleAnswer = (info) => {
	return http.post('article/answer/post', info);
}
export const ArticleAnswer = (info) => {
	return http.post('article/answer/get', info);
}
export const AricleAgreeClick = (info) => {
	return http.post('article/agree/click', info);
}
export const ArticleAgree = (info) => {
	return http.post('article/agree', info);
}
export const ForumMenu = () => {
	return http.post('forumenu/get');
}
export const ArticleDraft = (info) => {
	return http.post('article/draft', info);
}
export const ArticlePublish = (info) => {
	return http.post('article/publish', info);
}
export const ArticleEdit = (info) => {
	return http.post('article/edit/one', info);
}

export const ArticlePut = (info) => {
	return http.post('article/update', info);
}
export const ArticlePublishList = () => {
	return http.post('article/publish/get');
}
export const ArticleCategoryPut = (info) => {
	return http.post('article/category/put', info);
}
export const ArticleSetFine = (info) => {

	return http.post('article/fine/set', info);
}
export const ArticleDelete = (info) => {
	return http.post('article/delete', info);
}
export const ArticleAgreeNotify = () => {
	return http.post('article/notify/agree');
}
export const ArticleAnswerNotify = () => {
	return http.post('article/notify/answer');
}
export const ArticleAgreeList = () => {
	return http.post('article/agree/get');
}
export const AgreeEveryMonth = (info) => {
	return http.post('article/agree/count', info);
}
export const ForumPhotosAdd = (info) => {
	return http.post('article/photos/post',info);
}
export const PortalPicList = () => {
	return http.post('article/photos/one');
}
export const MyArticleNotify = () => {
	return http.post('article/mine/notify');
}
export const DeletePermission = (info) => {
	return http.post('permission/delete', info);
}
export const AddMyCustomer = (info) => {
	return http.post('realcustomer/store', info);
}
export const SearchCust = (info) => {

	return http.post('realcustomer/query', info);
}
export const AddReceivable = (info) => {
	return http.post('receivable/store',info);
}
export const AddReceivebill = (info) => {
	return http.post('receivebill/store', info);
}
export const DeleteReceivebill = (info) => {
	return http.post('receivebill/delete', info);
}
export const ARSum = (query) => {
	return http.post('arsum/query', query)
}
export const UpdateReceivable = (info) => {
	return http.post('receivable/update',info);
}
export const UpdateReceivebill = (info) => {
	return http.post('receivebill/update', info);
}
export const AddARType = (info) => {
	return http.post('artype/store', info);
}
export const ARType = () => {
	return http.post('artype/index');
}
export const ARUploadUrl = () => {
	let obj = {};
	let url = http.appURL;
	let token = http.token;

	obj.url = url;
	obj.token = token;

	return obj;
}

export const AddProject = (info) => {
	return http.post('project/store', info);
}
export const SearchProject = (info) => {
	return http.post('project/query', info);
}
export const ARSumUserRole = () => {
	return http.post('arsum/role');
}
export const InitPagination = () => {
	return http.post('base/pagination');
}
export const AddReceivablePlan = (info) => {
	return http.post('ReceivablePlan/add', info);
}
export const updateReceivablePlan = (info) => {
	return http.post('ReceivablePlan/update', info);
}
export const deleteReceivablePlan = (info) => {
	return http.post('ReceivablePlan/delete', info);
}
export const RefundAdd = (info) => {
	return http.post('refund/store', info);
}
export const RefundUpdate = (info) => {
	return http.post('refund/update', info);
}
export const RefundDelete = (info) => {
	return http.post('refund/delete', info);
}
export const GetArsetFieldType = (info) => {
	return http.post('arset/fieldtype');
}
export const AddEnumberate = (info) => {
	return http.post('enumberate/store', info);
}
export const UpdateEnumberate = (info) => {
	return http.post('enumberate/update', info);
}
export const GetEnumberate = () => {
	return http.post('enumberate/all');
}
export const AddBindAttr = (info) => {
	return http.post('bindattr/store', info);
}
export const UpdateBindAttr = (info) => {
	return http.post('bindattr/update', info);
}
export const getBindAttrList = () => {
	return http.post('bindattr/all');
}

export const getBindAttrFromPath = (info) => {
	return http.post('bindattr/one', info);
}

export const GetSaleOrderList = (info) => {
    console.log(info)
	return http.post('receivable/all', info);
}
export const DeleteReceivable = (info) => {
	return http.post('receivable/delete', info);
}
export const GetReceiveBillList = (info) => {

	return http.post('receivebill/all', info);
}
export const GetRefundList = (info) => {
	return http.post('refund/all', info);
}
export const GetRecePlanList = (info) => {
	return http.post('ReceivablePlan/all', info);
}
export const UpdateCustStatus = (info) => {
	return http.post('Arrears/update/status', info);
}
export const GetARSumFilterTable = () => {
	return http.post('arsum/filter');
}
export const FindARSumFilterValue = (info) => {
	return http.post('arsum/filter/query', info);
}
export const CreateProgram = (info) => {
	return http.post('arsum/filter/create/program', info);
}
export const UpdateProgram = (info) => {
	return http.post('arsum/filter/update/program', info);
}
export const FilterProgram = () => {
	return http.post('arsum/filter/get/program');
}
export const DeleteProgram = (info) => {
	return http.post('arsum/filter/delete/program', info);
}
export const UpdateFilterConfig = (info) => {
	return http.post('arsum/filter/update/config', info);
}
export const PotentialCustomer = (info) => {
	return http.post('potentialCustomer/all', info);
}
export const CreatePotentialPro = (info) => {
	return http.post('potentialProject/store', info);
}
export const ARSumInitialization = () => {
	return http.post('arsum/initialization');
}
export const GetForumModuleTable = () => {
	return http.post('article/module/table');
}
export const GetForumModule = () => {
	return http.post('article/module/all');
}
export const ForumModuleStore = (info) => {
	return http.post('article/module/store', info);
}
export const ForumModuleDel = (info) => {
	return http.post('article/module/delete', info);
}
export const ForumModuleUpdate = (info) => {
	return http.post('article/module/update', info);
}
export const ForumModuleSync = () =>{
	return http.post('article/module/sync');
}
export const SetArticleTop = (info) => {
	return http.post('article/settop', info);
}
export const CancelArticleTop = (info) => {
	return http.post('article/canceltop', info);
}
export const ArticlePersonalModule = () => {
	return http.post('article/module/personal');
}
export const ArticleCategoryDelete = (info)=> {
	return http.post('article/category/delete', info);
}
export const ProductCategoryStore = (info) => {
    return http.post("products/store", info);
}

export const ProductCategoryUpdate = (info) => {
    return http.post("products/update", info);
}

export const LoadProductCategory = () => {
    return http.post("products/list");
}
export const ProductCreatePriceTable = (info) => {
    return http.post("products/table/create", info);
}
export const LoadProductPriceTable = (info) => {
    return http.post("products/table/list", info);
}
export const DeleteProductPriceTable = (info) => {
    return http.post("products/table/delete", info);
}
export const ProductSurfacePriceList = (info) => {
    return http.post("products/prices",info);
}
export const MakeOfferParams = () => {
    return http.post("products/params");
}
export const ProductPriceUpdate = (info) => {
    return http.post("products/prices/update", info);
}
export const ProductPriceVersion = (info) => {
    return http.post("products/prices/version", info);
}
export const ProductPriceFastUpdate = (info) => {
    return http.post("products/prices/fastupdate", info);
}
export const CreateOffer = (info) => {
    return http.post("products/offer/store", info);
}
export const ProductOffers = (info) => {
    return http.post("products/offers", info);
}
export const LoadCostRole = () => {
    return http.post("cost/role");
}
export const ModifyOffer = (info) => {
    return http.post("products/offer/modify",info);
}
export const LoadPriceInfo = (info) => {
    return http.post("products/prices/info", info);
}
export const QueryCustomer = (info) => {
    return http.post("realcustomer/searchcust",info);
}
export const queryArrear = (info) => {
    return http.post("arrear/search", info);
}
export const GetInitialList = (info) => {
    return http.post("initamount/all", info);
}
export const CreateInitial = (info) => {
    return http.post("initamount/create", info);
}
export const UpdateInitial = (info) => {
    return http.post("initamount/update", info);
}
export const ResetPwdFromManagement = (info) => {
    return http.post("user/management/reset", info);
}
export const LoadHistoryPrices = (info) => {
    return http.post("products/prices/history", info);
}
export  const updateTarget = (info) => {
    return http.post("index/update/target", info);
}
export const LoadTarget = () => {

    return http.post("index/target");
}


