const Product = require('./product');

const main =()=>{
    const total = Product.getAll();

    //  Product.getOneById(1);

    // Product.updateById(3,{
    //     name:'Naruto Vol. 4',
    //     stock:126
    // });

     Product.deleteById(6);


    // Product.add({
    //     id:11,
    //     name: 'My Hero Academia, Vol. 1',
    //     price:9.99,
    //     stock:124,
    //     author: 'John Doe',
    // })

};
main();