$(document).ready(init);

function init() {

	$.fn.scrollPath("getPath")
		// Move to 'step1' element
		.moveTo(400, 50, {name: "step1"})
		// Line to 'step2' element
		.lineTo(400, 1100, {name: "step2"})
		// Arc down and line to 'step3'
		.arc(300, 1650, 550, -Math.PI/2, Math.PI/2, true)
		.lineTo(600, 2200, {
			callback: function() {
				setTimeout(function() {
					highlight($("#btn3to4"))
				}, 2000);
			},
			name: "step3"
		})
		// Continue line to 'step4'
		.lineTo(2750, 2200, {name: "step4"})
		// Arc up while rotating
		.arc(2900, 1000, 1200, Math.PI/2, 0, true, {rotate: Math.PI/2 })
		// Line to 'step5'
		.lineTo(4100, 750, {
			name: "step5",
			callback: function() {
				$("#music").attr("preload", "auto");
			}
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
		.lineTo(1800, 750, {
			name: "step6",
			callback: function() {
				$(".journey").show("slow");
				$(".surprise").show();
				$("#music").attr("autoplay", "true");
				$("#music").get(0).play();
			}
		});

	// We're done with the path, let's initate the plugin on our wrapper element
	$(".wrapper").scrollPath({drawPath: false, wrapAround: false, scrollBar: false});
	//$(".sp-canvas").toggle();

	$("button.text").click(function() {
		var target = $(this).data("goto");
		// Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
		// for extra easing functions like the one below
		$.fn.scrollPath("scrollTo", target, 1000, "easeInOutSine");
	});

	$("#audiocontrol").click(function() {
		if ($("#audiocontrol").hasClass("off")) {
			$("#music").get(0).play();
			$("#audiocontrol").removeClass("off");
		} else {
			$("#music").get(0).pause();
			$("#audiocontrol").addClass("off");
		}
	});

	/* ===================================================================== */

/*
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
*/
}

function highlight(element) {
	if(!element.hasClass("highlight")) {
		element.addClass("highlight");
		setTimeout(function() { element.removeClass("highlight"); }, 2000);
	}
}
