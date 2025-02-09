$(document).ready(function(){  

    // Event listener for Create user - move to register page
  $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

    const item = getUserFormData();
    submitUser(item, "post", "User inserted successfully.");
    return false;
  });

});

// Helper functions
function submitUser(item, method, successMessage) {
    const url = method === "post" ? "http://localhost:3000/api/users" : `http://localhost:3000/api/users/${item.username}`;
    $.ajax({
        url: url,
        type: method,
        data: item,
        dataType: "JSON"
    }).done(function(response) {
        if (response.status) {
            alert(true, successMessage);
            window.location.reload();
        } else {
            alert(false, `Error in inserting user (${response.data.message})`);
        }
    });
  }