/**
 RSVP for Tribe.im
 **/

(function () {

var showInvitation = function () {
		$("#rsvp").css({visibility: "hidden"});
		$("#invitation").css({visibility: "visible"}).addClass("animated bounceIn");
		setTimeout(function () {
			$("#rsvp").css({visibility: "visible"}).addClass("animated flipInX");
		}, 800);
	},
	showPostcard = function () {
		$("#subscriber").html(localStorage.getItem("rsvp_name"));
		$("#address").html(localStorage.getItem("rsvp_email"));
		$("#postcard").css({visibility: "visible"}).addClass("animated bounceIn show_front");
		setTimeout(function () {
			$("#postcard").toggleClass("show_front").toggleClass("show_back");
		}, 1000);
	};

// Intro animation
$(window).bind("load", function () {
	var isRegistered = localStorage
			&& localStorage.getItem("rsvp_name")
			&& localStorage.getItem("rsvp_email");
	setTimeout(isRegistered ? showPostcard : showInvitation, 400);
});

// Newsletter sign up
$(function () {
	$("#rsvp > form").submit(function (event) {
		event.preventDefault();
		$("#rsvp").removeClass().addClass("animated flipOutX");
		$("#sticky").css({visibility: "hidden"});
		setTimeout(function () {
			$("#rsvp").css({visibility: "hidden"});
			$("#envelope").removeClass().addClass("sending");
			$.ajax({
				type: "POST",
				url: "signup.php",
				data: {
					email: $("#rsvp > form input[name='email']").val(),
					name: $("#rsvp > form input[name='name']").val()
				},
				success: function (body) {
					var name = $("#rsvp > form input[name='name']").val(),
						email = $("#rsvp > form input[name='email']").val();
					$("#subscriber").html(name);
					$("#address").html(email);
					localStorage.setItem("rsvp_name", name);
					localStorage.setItem("rsvp_email", email);
					$("#envelope").removeClass().addClass("success");
					setTimeout(function () {
						$("#envelope").css({visibility: "hidden"});
						$("#postcard").css({visibility: "visible"}).addClass("animated bounceIn show_front");
						setTimeout(function () {
							$("#postcard").toggleClass("show_front").toggleClass("show_back");
						}, 1000);
					}, 400);
				},
				error: function (xhr, type) {
					$("#envelope").removeClass();
					$("#sticky").html(xhr.responseText).css({visibility: "hidden"}).removeClass();
					$("#rsvp").css({visibility: "visible"}).removeClass().addClass("animated flipInX");
					setTimeout(function () {
						$("#sticky").css({visibility: "visible"}).addClass("animated fast rollIn");
					}, 200);
				}
			});
		}, 400);
	});
});

$(function () {
	// Sticky closing
	$("#sticky").bind("click", function (event) {
		if(event.target.tagName.toLowerCase() !== "a") {
			$("#sticky").removeClass().addClass("animated fast fadeOutDown");
			setTimeout(function () {
				$("#sticky").css({visibility: "hidden"});
			}, 400);
		}
	});
	// Postcard flipping
	$("#postcard").bind("click", function () {
		$("#postcard").toggleClass("show_front").toggleClass("show_back");
	});
	// Postcard closing
	$("#close").bind("click", function () {
		localStorage.removeItem("rsvp_name");
		localStorage.removeItem("rsvp_email");
		$("#postcard").addClass("animated fadeOutDown");
		showInvitation();
		setTimeout(function () {
			$("#postcard").css({visibility: "hidden"});
		}, 400);
	});
});

})();
