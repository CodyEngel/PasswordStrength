/*************************************************************************************************************************************************************************************
To Do:
	- Let users customize password score ...Or it will use default values
	- Customize minimum and maximum border width on input box

*************************************************************************************************************************************************************************************/
$.fn.passwordStrength = function(options) {
	var opts = $.extend({}, $.fn.passwordStrength.defaults, options); // Extend options
	
	$(this).on("keyup", function() {
		var password = $(this).val();
		
		var pos = $(this).offset();
		var width = $(this).outerWidth();
		var score = test_num_characters(password) + test_upper(password) + test_lower(password) + test_numeric(password) + test_special(password);
		if(opts.showScore)
			displayScore(score);
			
		$(".passwordStrength_password_strength").css({
						top: pos.top + "px",
						left: (pos.left + width + 5) + "px",
						position:'absolute',
						background: color(score),
						color: '#fff',
						"font-weight": 600,
						padding: 3
					});
		$(this).css({
					"border-color": color(score),
					"border-width": (score < opts.minBorder) ? opts.minBorder : (score > opts.maxBorder) ? opts.maxBorder : score +"px"
					});		
	}); // on keyup
	
	function displayScore(score) {
		var $PASSWORD_STRENGTH = $(".passwordStrength_password_strength");
		if($PASSWORD_STRENGTH.is(":visible")) {
			$PASSWORD_STRENGTH.remove();
			$PASSWORD_STRENGTH.removeAttr("style");
		}
		$("body").append("<p class='passwordStrength_password_strength'>Score: "+score+"</p>");
	} // displayScore
	
	/*
		Password strength is denoted by color ranging from
		red (weak) to green (strong)
	*/
	function color(score) {
		var color = "#00ff00";
		switch (score) {
			case -8:
				color = "#ff0000";
				break;
			case -7:
				color = "#ff1000";
				break;
			case -6:
				color = "#ff2000";
				break;
			case -5:
				color = "#ff3000";
				break;
			case -4:
				color = "#ff4000";
			case -3:
				color = "#ff5000";
			case -2:
				color = "#ff6000";
				break;
			case -1:
				color = "#ff7000";
				break;
			case 0:
				color = "#ff8000";
				break;
			case 1:
				color = "#ffe100";
				break;
			case 2:
				color = "#eaff00";
				break;
			case 3:
				color = "#d4ff00";
				break;
			case 4:
				color = "#48ff00";
				break;
			default:
				if(score > 4)
					color = "#00ff00";
				else
					color = "#ff0000";
				break;
		} // switch
		return color;
	} // color
	
	/*
		Tests how long the password is.
		Score is calculated with (password length / 2) - 8
	*/
	function test_num_characters(password) {
		return Math.ceil(password.length / opts.weightLength) - opts.passwordLength;
	} // test_num_characters
	
	/*
		Tests if the password contains a uppercase letter.
			If it does, return 1.
			Otherwise return 0.
	*/
	function test_upper(password) {
		try {
			return Math.ceil(password.match(/[A-Z]/g).length / opts.weightUpperCase);
		}
		catch(e) {
			return 0;
		}
	} // test_upper
	
	/*
		Tests if the password contains a lowercase letter.
			If it does, return 1.
			Otherwise return 0.
	*/
	function test_lower(password) {
		try {
			return Math.ceil(password.match(/[a-z]/g).length / opts.weightLowerCase);
		}
		catch(e) {
			return 0;
		}
	} // test_lower
	
	/*
		Tests if the password contains a number.
			If it does, return 1.
			Otherwise return 0.
	*/
	function test_numeric(password) {
		try {
			return Math.ceil(password.match(/[0-9]/g).length / opts.weightNumeric);
		}
		catch(e) {
			return 0;
		}
	} // test_numeric
	
	/*
		Tests if the password contains a special character.
			If it does, return 1.
			Otherwise return 0.
	*/
	function test_special(password) {
		try {
			return Math.ceil(password.match(/[_\W]/g).length / opts.weightSpecial);
		}
		catch(e) {
			return 0;
		}
	} // test_special
};

$.fn.passwordStrength.defaults = {
	passwordLength: 8,
	weightLength: 3,
	weightLowerCase: 4,
	weightUpperCase: 4,
	weightNumeric: 3,
	weightSpecial: 2,
	minBorder: 2,
	maxBorder: 5,
	showScore: false
}