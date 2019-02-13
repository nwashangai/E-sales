$.fn.digits = function(){ 
  return this.each(function(){ 
      $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
  })
}

jQuery(document).ready( function($) {
 
  // Disable scroll when focused on a number input.
  $('form').on('focus', 'input[type=number]', function(e) {
      $(this).on('wheel', function(e) {
          e.preventDefault();
      });
  });

  // Restore scroll on number inputs.
  $('form').on('blur', 'input[type=number]', function(e) {
      $(this).off('wheel');
  });

  // Disable up and down keys.
  $('form').on('keydown', 'input[type=number]', function(e) {
      if ( e.which == 38 || e.which == 40 )
          e.preventDefault();
  });  
    
});

const cart = [];
const order = {
  total: 0,
  name: "",
  phone: "",
  address: "",
  items: []
};

const display = () => {
  $("#list-cart").html(
    cart.length ? cart.map(item => {
      const prod = product.find(element => element.id === item.id);
      return `
          <li class="header-cart-item flex-w flex-t m-b-12">
						<div class="header-cart-item-img" onclick=deleteItem('${item.id}')>
							<img src="${prod.path}">
						</div>

						<div class="header-cart-item-txt p-t-8">
							<a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
              ${prod.name}
							</a>
							<span class="header-cart-item-info digits">
              ${item.quantity} x ₦ <span class="digits">${prod.price}</span>
							</span>
						</div>
					</li>
    `;
    }) : "No item selected"
  );
  const total = cart.reduce((accumulator, currentValue) => (accumulator + currentValue.price), 0);
  const notify = cart.length;
  order.total = total;
  $('#total').html(`Total: ₦ ${total}`).digits();
  $(".digits").digits();
  document.querySelectorAll('[data-notify]')[0].dataset.notify = notify;
  console.log(cart);
};
const addToCart = () => {
  const id = $("#item-id").val();
  const quantity = parseInt($("#view-quantity").val(), 10);
  const itemIndex = cart.findIndex(element => element.id === id);
  const found = product.find(element => element.id === id);
  if (itemIndex >= 0) {
    cart[itemIndex].quantity = quantity;
    cart[itemIndex].price = parseFloat(found.price) * quantity;
  } else if (found) {
    cart.push({
      id: found.id,
      name: found.name,
      category: found.category,
      price: parseFloat(found.price) * quantity,
      color: $("#view-color").val() || "none",
      quantity
    });
  }
  localStorage.setItem("user-cart", JSON.stringify(cart));

  display();
};

const deleteItem = (id) => {
  const index = cart.findIndex(element => element.id === id);
  cart.splice(index, 1);
  display();
}
