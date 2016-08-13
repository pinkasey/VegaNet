$(function() {
    $("#formContainer").hide();
    addRow();
});


function updateAddRowState() {
	if ($(".formLine").length <= 6)
	{
		$('#addRow').show();			
	}
	else
	{
		$('#addRow').hide();			
	}
	
}

function addRow() {
	var line=$('#formLine').clone().show().prop("id",'').insertBefore('#addRow');
    line.find('.removeRow').click( removeRow );
    updateAddRowState();
    setTimeout(function() {line.addClass("visible") },0);
}

function removeRow( event ) {
    var line = $(event.target.closest('.formLine'));
    line.removeClass("visible");
    setTimeout(function() {
		updateAddRowState();
		line.remove() 
		},200);
    
}

function submit() {
    $.post(
        "",
        $('#addRelationForm').serialize(),
        function (data, status) {
            console.log("submit status: " + status + ", data: " + data);
            alert( data );
        }
    );
}

////////////////////////////////////////////////////////////////////////////
// Facebook stuff

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
        $("#formContainer").show();
        $("#FbLoginButton").hide();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('FbStatus').innerHTML = 'Please log ' +
            'into this app.';
        $("#formContainer").hide();
        $("#FbLoginButton").show();
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('FbStatus').innerHTML = 'Please log ' +
            'into Facebook.';
        $("#formContainer").hide();
        $("#FbLoginButton").show();
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('FbStatus').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}

// Facebook stuff
////////////////////////////////////////////////////////////////////////////
