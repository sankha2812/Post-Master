console.log("Hello World!");

// utility functions
// 1. function to get dom element from string
function getElementFromString(string) {
	let div = document.createElement("div");
	div.innerHTML = string;
	return div.firstElementChild;
}

// initialize no of parameters
let addedParamsCount = 0;

// hide the parameters box initially
let parametersbox = document.getElementById("parametersBox");
parametersbox.style.display = "none";

// if the user clicks on params box, hide json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
	document.getElementById("requestJsonBox").style.display = "none";
	document.getElementById("parametersBox").style.display = "block";
});

// if the user clicks on json box, hide params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
	document.getElementById("parametersBox").style.display = "none";
	document.getElementById("requestJsonBox").style.display = "block";
});

// adding plus button functionality
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
	let params = document.getElementById("params");
	let string = `<div class="form-row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${
					addedParamsCount + 2
				}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${
						addedParamsCount + 2
					}" placeholder="Enter Parameter ${
		addedParamsCount + 2
	} key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${
						addedParamsCount + 2
					}" placeholder="Enter Parameter ${
		addedParamsCount + 2
	} Value">
                </div>
                <button class="btn btn-primary deleteParam"> - </button>
                </div>`;

	// convert the string element to dom element
	let paramElement = getElementFromString(string);
	params.appendChild(paramElement);

	// adding minus button functionality
	let deleteParam = document.getElementsByClassName("deleteParam");
	for (item of deleteParam) {
		item.addEventListener("click", (e) => {
			e.target.parentElement.remove();
		});
	}

	addedParamsCount++;
});

// adding submit button functionality
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
	document.getElementById("responseJsontext").value =
		"Please wait...fetching response...";

	// fetching all user entered values
	let url = document.getElementById("url").value;
	let requestType = document.querySelector(
		"input[name='requestType']:checked"
	).value;
	let contentType = document.querySelector(
		"input[name='contentType']:checked"
	).value;

	// if user has used params option instead of json, collect all the parameters in an object
	if (contentType == "params") {
		data = {};
		for (i = 0; i < addedParamsCount + 1; i++) {
			if (
				document.getElementById("parameterKey" + (i + 1)) != undefined
			) {
				let key = document.getElementById(
					"parameterKey" + (i + 1)
				).value;
				let value = document.getElementById(
					"parameterValue" + (i + 1)
				).value;
				data[key] = value;
			}
		}
		data = JSON.stringify(data);
	} else {
		data = document.getElementById("requestJsonText").value;
	}

	// log all the values for debugging
	console.log("URL is ", url);
	console.log("requestType is ", requestType);
	console.log("contentType is ", contentType);
	console.log("data is ", data);

	// if the request is get
	if (requestType == "GET") {
		fetch(url, {
			method: "GET",
		})
			.then((response) => response.text())
			.then((text) => {
				document.getElementById("responseJsontext").value = text;
			});
	}

	// for post request
	else {
		fetch(url, {
			method: "POST",
			body: data,
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			}
		})
			.then((response) => response.text())
			.then((text) => {
				document.getElementById("responseJsontext").value = text;
			});
	}
});
