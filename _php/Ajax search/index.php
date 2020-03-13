<!DOCTYPE html>
<html>
<head>
	<title>AJAX Search Suggestions Dropdown List</title>
	<link rel="stylesheet" type="text/css" href="styles.css">
	<style>
	ul#results{
		list-style: none;
    width: 90%;
    margin: 0px;
    padding: 0px;
    display: none;
	}

	ul#results li a {
			color: #000;
			background: #ccc;
			display: block;
			text-decoration: none;
	}
	ul#results li a:hover {
		background: #aaa;
	}
	</style>
</head>
<body>
<center>
<input type="text" id="search" name="search">
<input type="button" name="" value="Search">
<ul id="results"></ul>
</center>

<script type="text/javascript">
	var results = document.getElementById("results");
	var search = document.getElementById("search");

	function getSearchResults(){
		var searchVal = search.value;

		if(searchVal.length < 1){
			results.style.display='none';
			return;
		}

		console.log('searchVal : ' + searchVal);
		var xhr = new XMLHttpRequest();
		var url = 'searchresults.php?search=' + searchVal;

		// var url = 'searchresults.php';

		// open function
		xhr.open('GET', url, true);

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				var text = xhr.responseText;
				//console.log('response from searchresults.php : ' + xhr.responseText);
				results.innerHTML = text;
				results.style.display='block';
			}
		}

		xhr.send();
	}

	search.addEventListener("input", getSearchResults);
</script>
</body>
</html>