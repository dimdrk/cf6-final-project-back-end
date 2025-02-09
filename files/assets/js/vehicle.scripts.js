$(document).ready(function(){

    // AJAX call to fetch vehicles
    $.ajax({
      url:`http://localhost:3000/api/user-vehicle/${username}/vehicles`,
      type:'get',
      dataType:'JSON'
    })
    .done(function(response){
      // console.log(">>", response);
      let data = response.data;
      let status = response.status
      
      if (status) { 
          createTbody(data);
      } else {
          alert(false,'Error in finding vehicles ('+ data.message + ')');
          console.log(data);
      }
    });


});

// functions to use
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