const category = {
    "Corporate": "corporate",
    "Jersey": "jersey",
    "Polo": "polo",
    "School Uniform": "sch-uni",
    "Sports Wear Fabrics": "sport"
};
/**
 * Gets food items and pupulate DOM
 */
const getProduct = () => {
    let items = '';
    product.forEach((item) => {

        items += `<div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${category[item.category]}">
                    <div class="block2">
                        <div class="block2-pic hov-img0">
                            <img src="${item.path}">

                            <a href="#" onclick=setView('${item.id}') class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                Quick View
                            </a>
                        </div>

                        <div class="block2-txt flex-w flex-t p-t-14">
                            <div class="block2-txt-child1 flex-col-l ">
                                <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                    ${item.name}
                                </a>

                                <span class="stext-105 cl3">
                                    ₦ <span class="digits">${item.price}</span>
                                </span>
                            </div>

                            <div class="block2-txt-child2 flex-r p-t-3">
                                <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                    <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                                    <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                                </a>
                            </div>
                        </div>
                    </div>
                    </div>`
    });
    document.getElementById("product-list").innerHTML = items;
    $(".digits").digits();
}

getProduct();

const setView = (data) => {
  const prod = product.find((element) => element.id === data);
  $('#view-name').html(prod.name);
  $('#view-price').html('₦ ' + prod.price);
  $('#item-id').val(data);
  $('#view-color').html(prod.color.map((colour) => (
    `<option>${colour}</option>`
  )));
  $('#view-quantity').val('1');
  $('#item-image').attr('src', prod.path);
}

const showHide = (event) => {
  event.preventDefault();
  $('#toggler').toggleClass("hide");
  if ($( "#toggler" ).hasClass( "hide" )) {
    $('#checkout').html('Check Out');
  } else {
    $('#checkout').html('Hide Check Out');
  }
}

const sendOrder = (event) => {
  event.preventDefault();
  if (cart.length < 1) {
    swal('Failed', "Please You must add at least one item to the cart", "error");
  } else if(!document.getElementById("toggler").checkValidity()) {
    swal('Failed', "Please fill the form correctly", "error");
  } else {
    order.name = $('#fullName').val();
    order.phone = $('#phone').val();
    order.items = cart;
    order.address = $('#address').val();
    order.description = $('#description').val();
    request('post', 'sendorder', { order }).then((userOrders) => {
      if (userOrders.success) {
        swal('Sent', "Thank you your order has been sent", "success");
      } else {
        swal('Failed', "Sorry something went wrong with your order try again", "error");
      }
    });
  }
}

const sendQuery = (event) => {
  event.preventDefault();
  if(!document.getElementById("contact-us").checkValidity()) {
    swal('Failed', "Please fill the contact us form correctly", "error");
  } else {
    const contact = {
      email: $('#email').val(),
      message: $('#msg').val(),
    };
    request('post', 'contact', { contact }).then((userOrders) => {
      if (userOrders.success) {
        swal('Sent', "Thank you we will get back to you shortly", "success");
      } else {
        swal('Failed', "Sorry something went wrong with your message try again", "error");
      }
    });
  }
}
