// init Isotope
var $grid = $('#product-list').isotope({
	// options
});
// filter items on button click
$('.filter-button-group').on('click', 'button', function () {
	var filterValue = $(this).attr('data-filter');
	$grid.isotope({ filter: filterValue });
});
$('.filter-menu .btn').click(function () {
	$('.filter-menu .btn').removeClass('active');
	$(this).addClass('active');
})


// init Isotope
var $gridbox = $('#sortproduct-list').isotope({
	// options
});
// filter items on button click
$('.sort-product-tabs').on('click', 'button', function () {
	var filterValue = $(this).attr('data-filter');
	$gridbox.isotope({ filter: filterValue });
});
$('.filter-menu .btn').click(function () {
	$('.filter-menu .btn').removeClass('active');
	$(this).addClass('active');
})
