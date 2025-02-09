$(document).ready(function(){

  // AJAX call to fetch users - not for use now
  // $.ajax({
  //   url:'http://localhost:3000/api/users/all',
  //   type:'get',
  //   dataType:'JSON'
  // })
  // .done(function(response){
  //   // console.log(">>", response);
  //   let data = response.data;
  //   let status = response.status
    
  //   if (status) { 
  //       createTbody(data);
  //   } else {
  //       alert(false,'Error in finding owners ('+ data.message + ')');
  //       console.log(data);
  //   }
  // });

  // Add event listener for Update User
  $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

    const item = getUserFormData();
    submitUser(item, "post", "User inserted successfully.");
    return false;
  });


  // Add event listener for Delete user
  $('#userTable').off('click', '.btnDelete').on('click', '.btnDelete', function() {
    const username = $(this).val();

    if (confirm("Are you sure that you want to delete this user?")) {
      $.ajax({
          url: `http://localhost:3000/api/users/${username}`,
          type: "delete",
          dataType: "JSON"
      }).done(function(response) {
          if (response.status) {
              alert(true, "User deleted successfully.");
              window.location.reload();
          } else {
              alert(false, "Error in deleting user.");
          }
      });
    }
  });

  // Add event listener for Getting Vehcles
  $('#userTable').off('click', '.btnVehicles').on('click', '.btnVehicles', function() {
    const username = $(this).val();

    
    $.ajax({
        url: `http://localhost:3000/api/users/${username}`,
        type: "get",
        dataType: "JSON"
    }).done(function(response) {
        if (response.status) {
            window.location.assign(`http://localhost:3000/api/user-vehicle/${username}/vehicles`)
        } else {
            alert(false, "Error in getting vehicles.");
        }
    });
    
  });
});


function createTbody(data){
  $("#userTable > tbody").empty();

  const len = data.length;
  for (let i=0; i<len; i++){
    let username = data[i].username;
    let firstname = data[i].firstname;
    let lastname = data[i].lastname;
    let email = data[i].email;
    let phoneNumber = data[i].phoneNumber;
    let city = data[i].city;

    let tr_str = "<tr>" +
      "<td>" + username + "</td>" +
      "<td>" + firstname + "</td>" +
      "<td>" + lastname + "</td>" +
      "<td>" + email + "</td>" +
      "<td>" + phoneNumber + "</td>" +
      "<td>" + city + "</td>" +      
      "<td>" +
          "<button class='btnUpdate btn btn-primary' value=\'"+username+"\'>Edit</button> " +
          "<button class='btnDelete btn btn-primary' value=\'"+username+"\'>Delete</button>" +
          "<button class='btnVehicles btn btn-primary' value=\'"+username+"\'>View Vehicles</button>" +
      "</td>" + 
      "</tr>";

    $("#userTable tbody").append(tr_str);
  }
}

function getUserFormData() {
  return {
    username: $("#username").val(),
    password: $("#password").val(),
    role: $("#role").val(),
    firstname: $("#firstname").val(),
    lastname: $("#lastname").val(),
    email: $("#email").val(),
    phoneNumber: $("#phoneNumber").val(),
    city: $("#city").val()
  };
}

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

function alert(status, message){
  if (status){
      $('.alert').addClass('alert-success');
      $('.alert').removeClass('alert-danger');
  } else {
      $('.alert').addClass('alert-danger');
      $('.alert').removeClass('alert-success');
  }
  $('.alert').html(message);
}