$(document).ready(init);

function init() {
	/* ========== DRAWING THE PATH AND INITIATING THE PLUGIN ============= */

	$.fn.scrollPath("getPath")
		// Move to 'step1' element
		.moveTo(400, 50, {name: "step1"})
		// Line to 'step2' element
		.lineTo(400, 800, {name: "step2"})
		// Arc down and line to 'step3'
		.arc(200, 1200, 400, -Math.PI/2, Math.PI/2, true)
		.lineTo(600, 1600, {
			callback: function() {
				setTimeout(function() {
					highlight($("#btn3to4"))
				}, 2000);
			},
			name: "step3"
		})
		// Continue line to 'step4'
		.lineTo(1750, 1600, {name: "step4"})
		// Arc up while rotating
		.arc(1800, 1000, 600, Math.PI/2, 0, true, {rotate: Math.PI/2 })
		// Line to 'step5'
		.lineTo(2400, 750, {
			name: "step5"
		})
		// Rotate in place
		.rotate(3*Math.PI/2, {
			name: "step5-rotated",
			callback: function() {
				setTimeout(function() {
					var btn = $("#btn5to6");
					btn.css({visibility:"visible"});
					function addO() {
						var txt = btn.text();
						if (txt.length < 5) {
							btn.text(txt + txt[0]);
							setTimeout(addO, 250);
						}
					}
					setTimeout(addO, 250);
				}, 750);
			}
		})
		
		// Continue to 'step6'
		.lineTo(1000+580/2, 660, {
			name: "step6"
		});

	// We're done with the path, let's initate the plugin on our wrapper element
	$(".wrapper").scrollPath({drawPath: false, wrapAround: false, scrollBar: false});

	$("button.text").click(function() {
		var target = $(this).data("goto");
		// Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
		// for extra easing functions like the one below
		$.fn.scrollPath("scrollTo", target, 1000, "easeInOutSine");
	});

	/* ===================================================================== */

	$(".settings .show-path").click(function(e) {
		e.preventDefault();
		$(".sp-canvas").toggle();
	}).toggle(function() {
		$(this).text("Hide Path");
	}, function() {
		$(this).text("Show Path");
	});

	$(".tweet").click(function(e) {
		open(this.href, "", "width=550, height=450");
		e.preventDefault();
	});

	$.getJSON("http://cdn.api.twitter.com/1/urls/count.json?callback=?&url=http%3A%2F%2Fjoelb.me%2Fscrollpath",
			function(data) {
				if(data && data.count !== undefined) {
					$(".follow .count").html("the " + ordinal(data.count + 1) + " kind person to");
				}
			});
	}


function highlight(element) {
	if(!element.hasClass("highlight")) {
		element.addClass("highlight");
		setTimeout(function() { element.removeClass("highlight"); }, 2000);
	}
}
function ordinal(num) {
	return num + (
		(num % 10 == 1 && num % 100 != 11) ? 'st' :
		(num % 10 == 2 && num % 100 != 12) ? 'nd' :
		(num % 10 == 3 && num % 100 != 13) ? 'rd' : 'th'
	);
}
