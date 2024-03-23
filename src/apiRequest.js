const apiRequest = async (url = '',optionsObj = null,errMsg = null)=>{
    try{
        const response = await fetch(url, optionsObj); //If we do not have an ok response or it is not in 200 range ...maybe it's 404 we want to catch that and throw an error.. because we know that will not be automatically caught as an error...it's just a response that we didn' want
        if(!response.ok) throw Error('Please reload the app');//For to be in sync with the local state and api 
    }catch(err){
        errMsg = err.message;
    }finally{
        return errMsg;
    }
}

export default apiRequest;