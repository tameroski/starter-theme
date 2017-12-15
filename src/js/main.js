(function($){

    "use strict";

    $(document).ready(function(){

    	/* Bulma's Burger Menu */
	    $('.navbar-burger').each(function(){
	    	$(this).on('click', function(){
	    		var target = $(this).data('target');
	    		$(this).toggleClass('is-active');
	    		$('#'+target).toggleClass('is-active');
	    	});
	    });

    });

})(jQuery);