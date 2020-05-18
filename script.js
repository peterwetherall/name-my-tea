//Setup function
$(document).ready(function(){	
	function titleCase(str) {
		var splitStr = str.toLowerCase().split(" ");
		for (var i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
		}
		return splitStr.join(" "); 
	}
	$("#twitter").click(function(){
		var curtea = titleCase($("h1").html());
		curtea = curtea.replace(/ /g, "%20");
		var tweet = "https://twitter.com/intent/tweet?url=https%3A%2F%2Fpeterwetherall.github.io%2Fname-my-tea%2F&text=I%20just%20found%20out%20that%20my%20tea%20is:%20%22" + curtea + "%22%20-what%20is%20yours%3F&hashtags=NameMyTea";
		window.open(tweet,'_blank');
	});
	$("#email").click(function(){
		var curtea = titleCase($("h1").html());
		curtea = curtea.replace(/ /g, "%20");
		var email = "mailto:?subject=" + curtea + "%20is%20my%20tea!%20What%27s%20yours%3F&body=Find%20out%20at%3A%20https%3A%2F%2Fpeterwetherall.github.io%2Fname-my-tea%2F";
		window.location.href = email;
	});
	$("#milk, #suger").change(upTea);
});
//Decimal to hex
function d2h (d) {
	return d.toString(16);
}
//Hex to decimal
function h2d (h) {
	return parseInt(h, 16);
} 
//Mix two hex colours
function mix (colour_1, colour_2, weight) {
	weight = (typeof(weight) !== 'undefined') ? weight : 50;
	var colour = "#";
	for (var i = 0; i <= 5; i += 2) {
		var v1 = h2d(colour_1.substr(i, 2)),
        v2 = h2d(colour_2.substr(i, 2))
        val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0))); 
		while (val.length < 2) {
			val = "0" + val;
		}
		colour += val;
	}
	return colour;
};
//Update loop
function upTea() {
	var milk = $("#milk").val();
	var sugar = $("#sugar").val();
	var teaColour = "#FFFFFF";
	var base = "";
	var front = "";
	//Determine second word from colour slider
	if (milk <= 50) {
		base = "DARK";
		teaColour = mix("825827", "552A14", Math.round(milk * 2));
	} else if (milk > 50 && milk <= 100) {
		base = "BUILDER'S";
		teaColour = mix("AD7F3F", "825827", Math.round((milk - 50) * 2));
	} else if (milk > 100 && milk <= 150) {
		base = "BRITISH";
		teaColour = mix("D2A25F", "AD7F3F", Math.round((milk - 100) * 2));
	} else {
		base = "MILKY";
		teaColour = mix("E6C28C", "D2A25F", Math.round((milk - 150) * 2));
	}
	$("#mug").css("background", teaColour);
	//Determine the first word based on number of sugars
	switch (sugar) {
		case "0":
			front = "CLASSIC";
			break;
		case "2":
			front = "FROSTED";
			break;
		default:
			front = "SWEET";
			break;
	}
	var whole = front + " " + base;
	$("#name").html(whole);
}   
setInterval(upTea, 1);
