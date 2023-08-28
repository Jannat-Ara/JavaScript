const { stringify } = require("querystring");

const success = (message, data=null) =>{
    return JSON.stringify(
        {
            success : true,
            message: message,
            data: data
        }
    )
};

const failure =(message, data=null) =>{
    return JSON.stringify(
        {
            success: true,
            message: message,
            data: data
        }
    )
}
module.exports ={success, failure};