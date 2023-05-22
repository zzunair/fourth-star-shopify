function showAlert(name) {
	var alertBox = $('#alertBox');
    $(alertBox).show();
    $(alertBox).html('<p>' + name + ' has been added into cart. </p>');
    setTimeout(() => {
      $(alertBox).hide();
    }, 7000);
  }
  
  function closeAlert() {
	var alertBox = $('#alertBox');
	  $(alertBox).hide();
  }

  function updateCartCounter() {
    jQuery.getJSON("/cart.js", function (cart) {
      let items_count = cart.item_count;
      $(".cart-counter-number span").text(items_count);
    })
  }
  
$(document).on('click', '.product-item .add-to-cart-btn', function () {
  var product_id = $(this).data('id');
  var product_name = $(this).data('name');
  var data = {
    "id": product_id,
    "quantity": 1
  };
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function () {
      // alert('Product added to cart successfully!');
      showAlert(product_name);
      updateCartCounter();
    },
    error: function (XMLHttpRequest, textStatus) {
      alert('Error adding product to cart: ' + textStatus);
    }
  });
})