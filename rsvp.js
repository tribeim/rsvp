/**
 RSVP for Tribe.im
 **/
$(window).bind("load", function () {
	$("#rsvp")
		.css({visibility: "hidden"});
	$("#invitation")
		.css({visibility: "visible"})
		.addClass("animated bounceIn");
	setTimeout(function () {
		$("#rsvp")
			.css({visibility: "visible"})
			.addClass("animated flipInX");
	}, 800);
});