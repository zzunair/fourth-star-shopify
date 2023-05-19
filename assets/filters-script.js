$(document).on('click', '.product-item .add-to-cart-btn', function () {
  var product_id = $(this).data('id');
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
      alert('Product added to cart successfully!');
    },
    error: function (XMLHttpRequest, textStatus) {
      alert('Error adding product to cart: ' + textStatus);
    }
  });
})