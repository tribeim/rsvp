/**
 RSVP for Tribe.im
 **/
$(function () {
	$("#invitation")
		.css({visibility: "hidden"});
	$("#rsvp")
		.css({visibility: "visible"})
		.addClass("animated bounceIn");
	setTimeout(function() {
		$("#invitation")
			.css({visibility: "visible"})
			.addClass("animated flipInX");
	}, 800);
});