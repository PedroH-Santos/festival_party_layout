import { useState } from "react";




export default function useModal(){
    const [showModal,setShowModal] = useState(false);
    
    function onChangeStatusModal(){
        setShowModal(!showModal);
    }
    


    return {
        showModal,
        onChangeStatusModal
    }

}