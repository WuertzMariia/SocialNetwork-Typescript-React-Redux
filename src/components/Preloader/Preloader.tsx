import React from 'react'; 
import preloader from './../../assets/images/preload_t.svg'

let Preloader = () => {
    return (
        <div><img src={preloader} style={{display:"block", margin:"auto", width: "auto"}}/> </div>
    )
    
}

export default Preloader; 