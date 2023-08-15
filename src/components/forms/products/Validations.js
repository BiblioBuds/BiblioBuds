const Validations = (product) =>{
    let errors = {}
    const justNumbers = /^\d+$/;
    if(!product.name){
        errors.name = 'This field can´t be empty'
    }
    if(!product.image){
        errors.image = 'This field can´t be empty'
    }
    if(!product.description){
        errors.description = 'This field can´t be empty'
    }
    if(!product.cost){
        errors.cost = 'This field can´t be empty'
    }else if(!justNumbers.test(product.cost)){
        errors.cost = 'This field acept just numbers'
    }
    return errors
}
export default Validations;