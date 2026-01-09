 const formValidate= ()=>{
        let error={}
        if(!products.name?.trim()){
            newError.name= "Name is required"
        }
        if(!products.description?.trim()){
            newError.description= "Description is required"
        }
        if(!products.price?.trim()){
            newError.price= "Price is required"
        }
        return error
    }

    export default formValidate