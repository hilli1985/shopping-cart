var ShoppingCart = function () {

  // an array with all of our cart items
  var cart = [];

  var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    $(".cart-list").empty();
    let sum =0;
    for (item of cart ){
      sum = sum + parseInt(item.price.replace('$',''));
      $(".shopping-cart").children(".cart-list").append('<div class="item">'+item.name+' '+item.price+'</div>');
    }
    $(".shopping-cart").find('span').text(sum);
  }

  var addItem = function (item) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    cart.push(item);
  }

  var clearCart = function () {
    // TODO: Write a function that clears the cart ;-)
    cart = []; 
  }
  
  return {
    cart : cart ,
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart
  }
};

var app = ShoppingCart();
// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  if (!($(".shopping-cart").attr('class').includes(' show'))){
    $(".shopping-cart").addClass('show');
    return;
  }
  $(".shopping-cart").removeClass('show');
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  let name = ($(this).closest('.card-container').children('.item').attr('data-name'));
  let price = ($(this).closest('.card-container').find(".pricebox").text());
  // remove spaces 
  price = price.replace( /\s/g, '');
  let item = {
    name : name, 
    price : price
  }
  app.addItem(item);
  app.updateCart();

});

$('.clear-cart').on('click', function () {
  app.clearCart();
  app.updateCart();
});