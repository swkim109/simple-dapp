export const errorMessage = (err) => {
    
    let msg = "";
    
    //EIP-1193 을 따르는 status code
    switch (err.code) {
        case 4001:
            msg = "The request was rejected by the user";
            break;
        
        default:
            const arr = err.toString().match(/Error: (.*)/g);
            if (arr !== null) {
                msg = arr[0];
            } else {
                msg = "Unknown error";
            }
            
    }
    return msg;
    
}
