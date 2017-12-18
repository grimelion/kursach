'use strict';

module.exports.id = 'products';

module.exports.up = function (done) {
  const products = [
    {
        id: 1,
        name: 'Sweater',
        price: 120,
        image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        category: 'warm-clothes',
        options: [],
    },
    {
        id: 2,
        name: 'Hoodie',
        price: 160,
        image: 'https://i.pinimg.com/736x/35/58/be/3558be7208ab4853aca2616f6909ea92--purple-hoodies-fall-clothes.jpg',
        category: 'warm-clothes',
        options: [],
    },
    {
        id: 3,
        name: 'Shirt',
        price: 80,
        image: 'https://greenglobaltravel.com/wp-content/uploads/2017/06/Best-Travel-Clothes-Clothing-Arts-Pickpocket-Proof-Shirt.jpg',
        category: 'lightweight-clothes',
        options: [],
    },
    {
        id: 4,
        name: 'Suit',
        price: 300,
        image: 'https://static1.squarespace.com/static/5339d8b8e4b0753aa3c8e5d9/57b3028ae4fcb5df8e52d55b/5991c96f9656caf2b0d12e25/1502726517301/?format=300w',
        category: 'business-clothes',
        options: [],
    },
    {
        id: 5,
        name: 'Jacket',
        price: 200,
        image: 'https://greenglobaltravel.com/wp-content/uploads/2017/06/Best-Travel-Clothes-Oros-Apparel-Rover-Jacket.jpg',
        category: 'warm-clothes',
        options: [],
    },
    {
        id: 6,
        name: 'T-Shirt',
        price: 30,
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2017-02/17/15/enhanced/buzzfeed-prod-fastlane-03/original-grid-image-11910-1487361843-6.jpg?crop=846:1280;91,0&downsize=715:*&output-format=auto&output-quality=auto',
        category: 'lightweight-clothes',
        options: [],
    },
    {
        id: 7,
        name: 'Scarf',
        price: 100,
        image: 'https://cdn.cliqueinc.com/posts/181572/the-2016-way-to-layer-your-clothes-1627187-1453230139.640x0c.jpg',
        category: 'warm-clothes',
        options: [],
    },
    {
        id: 8,
        name: 'Yeezy Boost 350 V2',
        price: 1000,
        image: 'https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/8/0/800389_1.jpg',
        category: 'footwear',
        options: [],
    },
    {
        id: 9,
        name: 'Flip flops',
        price: 150,
        image: 'http://1.bp.blogspot.com/-VjL0wjSiLlk/VCkh_r3XxWI/AAAAAAAAadc/DlQxDotodI4/s1600/DSC06356.jpg',
        category: 'footwear',
        options: [],
    },
    {
        id: 10,
        name: 'Gloves',
        price: 200,
        image: 'https://www.revzilla.com/product_images/0217/2147/dainese_blackjack_gloves.jpg',
        category: 'warm-clothes',
        options: [],
    }
];

  this.db.collection('productOptions').find().toArray((err, res) => {
    if (err) throw err;
    console.log('WTF: ', res);
    
    for (const row in res) {
      let productId = (row < 3) ? 0 : 1;
      console.log(products[productId]);
      products[productId].options.push(res[row]._id);
    }
    this.db.collection('products').insertMany(products, done);
  });
};

module.exports.down = function (done) {
  done();
};
