var next_click = document.querySelectorAll(".next_button");
var main_form = document.querySelectorAll(".main");
var step_list = document.querySelectorAll(".progress-bar li");
var num = document.querySelector(".step-number");
let formnumber = 0;

next_click.forEach(function(next_click_form) {
    next_click_form.addEventListener('click', function() {
        if (!validateform()) {
            return false;
        }
        formnumber++;
        updateform();
        progress_forward();
        contentchange();
    });
});

var back_click = document.querySelectorAll(".back_button");
back_click.forEach(function(back_click_form) {
    back_click_form.addEventListener('click', function() {
        formnumber--;
        updateform();
        progress_backward();
        contentchange();
    });
});

var username = document.querySelector("#user_name");
var shownname = document.querySelector(".shown_name");

var submit_click = document.querySelectorAll(".submit_button");
submit_click.forEach(function(submit_click_form) {
    submit_click_form.addEventListener('click', function() {
        if (!validateform()) {
            return false;
        }
        shownname.innerHTML = username.value;
        formnumber++;
        updateform();
    });
});

var heart = document.querySelector(".fa-heart");
heart.addEventListener('click', function() {
    heart.classList.toggle('heart');
});

var share = document.querySelector(".fa-share-alt");
share.addEventListener('click', function() {
    share.classList.toggle('share');
});

function updateform() {
    main_form.forEach(function(mainform_number) {
        mainform_number.classList.remove('active');
    });
    main_form[formnumber].classList.add('active');
}

function progress_forward() {
    num.innerHTML = formnumber + 1;
    step_list[formnumber].classList.add('active');
}

function progress_backward() {
    var form_num = formnumber + 1;
    step_list[form_num].classList.remove('active');
    num.innerHTML = form_num;
}

var step_num_content = document.querySelectorAll(".step-number-content");

function contentchange() {
    step_num_content.forEach(function(content) {
        content.classList.remove('active');
        content.classList.add('d-none');
    });
    step_num_content[formnumber].classList.add('active');
    step_num_content[formnumber].classList.remove('d-none');
}

function validateform() {
    let validate = true;
    var validate_inputs = document.querySelectorAll(".main.active input, .main.active select");
    validate_inputs.forEach(function(validate_input) {
        validate_input.classList.remove('warning');

        if (validate_input.hasAttribute('required')) {
            if (validate_input.tagName === 'SELECT' && validate_input.value === '') {
                validate = false;
                validate_input.classList.add('warning');
                alert("Please select a sub-theme.");
            } else if (validate_input.value.length == 0) {
                validate = false;
                validate_input.classList.add('warning');
                alert("Please fill out all required fields.");
            } else if (validate_input.type === 'email' && !validate_input.checkValidity()) {
                validate = false;
                validate_input.classList.add('warning');
                alert("Please enter a valid email address");
            } else if (validate_input.type === 'tel' && !validate_input.checkValidity()) {
                validate = false;
                validate_input.classList.add('warning');
                alert("Please enter a valid Phone Number");
            }  else if (validate_input.id === 'Photo') { 
                const photoInput = validate_input;
                if (photoInput.files && photoInput.files.length > 3) {
                  validate = false;
                  photoInput.classList.add('warning');
                  alert("You can only upload a maximum of 3 photos.");
                }
            }
        }
    });
    return validate;
}
