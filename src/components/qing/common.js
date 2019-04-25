import $ from 'jquery'

$.log = console.log

$.getCurYear = () => {
    var date = new Date;
    return date.getFullYear();
}

export default $