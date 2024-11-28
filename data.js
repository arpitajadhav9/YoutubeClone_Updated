export const API_KEY = 'AIzaSyBjOahLCXCLQdcgQ5tmxR9viBg_Kng-omE'

// this below code block is to convert the views of each yt video into millions and k as as without this convertor the views will be shown in whole number.

export const value_convertor = (value) =>{
    if(value>=1000000)
        {
            return Math.floor(value/1000000)+"M";
        }
        else if(value>=1000)
        {
            return Math.floor(value/1000)+"K";
        }
        else
        {
            return value;
        }
}

//Math.floor is to remove decimal points