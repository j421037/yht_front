let BASEURL = "https://e.yhtjc.com/v2/public/index.php/";

if (process.env.NODE_ENV === 'development') {
    BASEURL= "http://192.168.0.250/yhtsys/public/index.php/";
    // BASEURL = "http://421037.f3322.net:8090/yhtsys/public/index.php/";
   	//BACKEND_DOMAIN = 'http://421037.f3322.net:8090/index.php/api/';
    //  BACKEND_DOMAIN = 'http://dev.miaoyi09.com/index.php/api/';
    //BACKEND_DOMAIN_VIEW_URL = 'http://dev.miaoyi09.com/index.php/view/attr';
}

let BACKEND_DOMAIN = BASEURL + 'api/';
let BACKEND_DOMAIN_VIEW_URL = BASEURL + 'view/attr';

let EDITOR_IMG_URL = BACKEND_DOMAIN + 'editor/uploadimage';
let FILE_UPLOAD_URL = BACKEND_DOMAIN + 'file/upload';

export default {
    BASEURL,
    BACKEND_DOMAIN,
    BACKEND_DOMAIN_VIEW_URL,
    EDITOR_IMG_URL,
    FILE_UPLOAD_URL
}
