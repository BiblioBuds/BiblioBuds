const validateForm = (data) => {
    // respectivas validaciones para el formulario
    const { title, author, editorial, price, pages, format, stock, date, image, synopsis } = data;
    let errors = {};
    title.length === 1 ? errors.title = 'Must have at least 2 characters' : errors.title = ''
    author.length < 5 ? errors.author = 'Must have at least 5 characters' : errors.author = ''
    if (author.length === 0) errors.author = ''
    editorial.length === 1 ? errors.editorial = 'Must have at least 2 characters' : errors.editorial = ''
    if (price >=1 && price <=3) errors.price = 'Price must be greater than $3.00'
    if (pages >=1 && pages <=5) errors.pages = 'Pages must be greater than 5'
    if (stock ==1) errors.stock = 'Stock must be greater than 1'
    const dateRegex = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
    if(!dateRegex.test(date)){
        errors.date = 'Enter a valid date'
    }
    if (!date.length) errors.date = ''
    image?.length < 9 ? errors.image = 'Must have at least 9 characters' : errors.image = ''
    if (image?.length === 0) errors.image = ''
    synopsis.length < 10 ? errors.synopsis = 'Must have at least 10 characters' : errors.synopsis = ''
    if (synopsis.length === 0) errors.synopsis = ''
    return errors;
    
};
  
export default validateForm;