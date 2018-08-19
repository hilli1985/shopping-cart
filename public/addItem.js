//additem
var ProducetRepo = function () {
  var products = [];
  
  // var source = document.getElementById("entry-template").innerHTML;
  // var template = Handlebars.compile(source);
  var addProduct =  function(product) {
    products.push(product);
  }
  let productCat='';
  var renderProducts = function() {
    let product0 = '';
    let product1 = '';
    let product2 = '';
   
    for (let i=0; i<products.length; i++){
      let product = '<div class="col-md-4">'+
      '<div class="card-container">'+
      `<div class="card item new" item data-name=${products[i].name} data-price=${products[i].price}>`+
      '<div class="pricebox">'+
      '<p class="price"> $'+products[i].price+'</p>'+
      '</div>'+
      '<div class="buybox">'+
      '<p class="add-to-cart"> ADD TO CART </p>'+
      '</div>'+
      '<div class="card-inner">'+
      '<img src='+products[i].image +'class="proimage">'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>';
      if ((i%3)==0){ 
        $(".container-new").empty();
        product0 = product; 
        productCat =productCat+'<div class="row">'+ product0+'</div>';
        $(".container-new").append(productCat); 
      }
      else if ((i%3)==1){
        $(".container-new").empty();
        product1 = product; 
        productCat ='<div class="row">'+ product0 + product1+'</div>';
        $(".container-new").append(productCat); 
      }
      else if ((i%3)==2){
        $(".container-new").empty();
        product2 = product;
        productCat ='<div class="row">'+ product0 + product1+ product2+'</div>';
        $(".container-new").append(productCat); 
      }  
  }
}
  return { 
    products: products,
    addProduct : addProduct,
    renderProducts : renderProducts
  }
}


var adminApp = ProducetRepo();

$('.add-new-product').on('click', function () {
  // TODO: hide/show the new product window!
  if (!($(".product-window").attr('class').includes(' show'))){
    $(".product-window").addClass('show');
    return;
  }
  $(".product-window").removeClass('show');
});

// $(".add-product").submit(function(e){
//   e.preventDefault();
// });

$('.add-product').on('click', function () {
  let product = {
    name:$("#p-name").val(),
    price:$("#p-price").val(),
    image:'"'+$("#p-image").val()+'"',
  }
  adminApp.addProduct(product);
  adminApp.renderProducts();
});

$('.container-new').on('click', '.add-to-cart',function () {
  // TODO: get the "item" object from the page
  let name = ($(this).closest('.card-container').children('.item').attr('data-name'));
  let price = ($(this).closest('.card-container').find(".pricebox").text());
  // remove spaces 
  price = price.replace( /\s/g, '');
  let item = {
    name : name, 
    price : price,
    quantity: 1
  }
  app.addItem(item);
  app.updateCart();
  
});




