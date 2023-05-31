jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Only alphabetical characters");
$("#userForm").validate({
    rules:{
        name:{
            required: true,
            lettersonly: true,
            minlength: 3
        },
        address:{
            required: true,
            lettersonly: true,
            minlength: 5,
            maxlength:200
        },
        email: {
            required: true,
            email: true
        },
        
        password:{
            required: true,
            minlength: 5
        },
        confirm_password:{
            required: true,
            equalTo: '#password'
        },
        p_number:{
            required: true,
            digits: true,
            number:true,
            
            maxlength: 10
            },
    },
    messages:{
        name:{
            required: 'The Name field is required',
            minlength: 'You must enter at least 3 characters',
            lettersonly:"letters only allow"
        },
        address:{
            required: 'The address field is required',
            minlength: 'You must enter at least 5 characters',
            maxlength:'You must enter at max 200 characters',
        },
        email: {
            required: 'The Email field is required',
            email: 'You must enter a valid email address'
        },
        password:{
            required: 'The Password field is required',
            minlength: 'You must enter at least 5 characters'
        },
        confirm_password:{
            required: 'The Confirm password field is required',
            equalTo: 'The Confirm password field must match with Password'
        },
        p_number:{
           
            required: "Please Enter Your Mobile Number",
            number:"Please enter numbers Only",
           
            maxlength: 'min and max 10 digits number',
            
        },
    },
  
   
})