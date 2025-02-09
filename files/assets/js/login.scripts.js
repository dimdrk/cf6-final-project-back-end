$(document).ready(function(){  
    
    // Event listener for login user
    $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

        const item = getUserFormData();
        loginUser(item, "post", "User loged in successfully.");
        return false;
    });

    (() => {
        'use strict'
        const forms = document.querySelectorAll('.needs-validation')
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
        
            form.classList.add('was-validated')
            }, false)
        })
    })()
});


function getUserFormData() {
    return {
        username: $("#username").val(),
        password: $("#password").val()
    };
}

// toDo
function loginUser(){

}
