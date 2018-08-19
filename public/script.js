var ShoppingCart = function () {
  
  var STORAGE_ID = "shoppingCart";  
  var getFromLocalStorage = function (STORAGE_ID) {
    let tempvar =  JSON.parse(localStorage.getItem("shoppingCart") || '[]'); //return empty array in case of null
    return tempvar;
  }
  var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
  }
  // an array with all of our cart items
  var cart = getFromLocalStorage(STORAGE_ID);
  
  let sum = 0; 
  var source = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);
  
  var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    $(".cart-list").empty();
    sum = 0; 
    for (item of cart ){
      sum = sum + parseInt(item.price.replace('$','')*item.quantity);
      var context = {name : item.name, price: item.price, quantity:item.quantity }
      var html = template(context);
      $(".cart-list").append(html);
    }
    $(".shopping-cart").find('span').text(sum);
  }
  
  var addItem = function (item) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    if (!_findItemByName(item.name)){
      cart.push(item);
    }
    else 
    {
      cart[i].quantity+=1;
    }
    saveToLocalStorage();
  }
  
  function _findItemByName(name) {
    for (i in cart) {
      if (cart[i].name==name)
      return i 
    }
    return null;
  }
  
  var clearCart = function () {
    // TODO: Write a function that clears the cart ;-)
    cart = []; 
    sum = 0;
    saveToLocalStorage();
  }
  
  var removeItemByName = function () {
    let index = _findItemByName(name);
    cart.splice(index, 1);
    saveToLocalStorage();
  }
  
  return {
    cart : cart ,
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    removeItemByName : removeItemByName
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
    price : price,
    quantity: 1
  }
  app.addItem(item);
  app.updateCart();
  
});

$('.clear-cart').on('click', function () {
  app.clearCart();
  app.updateCart();
});

$('.cart-list').on('click', '.item', function () {
  let name = ($(this).text().split("(")[0]);
  app.removeItemByName(name);
  app.updateCart();
});