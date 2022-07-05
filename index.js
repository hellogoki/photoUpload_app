
const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUpPage = document.querySelector(".signup-link"),
      loginPage = document.querySelector(".login-link"),
      emailLogin = document.getElementById('email-login'),
      passwordLogin = document.getElementById('password-login'),
      nameSignup = document.getElementById('name'),
      emailSignup = document.getElementById('email-signup'),
      passwordSignup = document.getElementById('password-signup'),
      passwordConfirm = document.getElementById('password-signup-confirm'),
    //   buttonLogin = document.getElementById('btn-login'),
    //   buttonSignup = document.getElementById('btn-signup'),
      formSignup = document.getElementById('form-signup'),
      formLogin = document.getElementById('form-login');


// user.html photo upload
const input = document.querySelector('input');
const preview = document.querySelector('.preview');
const formImages = document.getElementById('form-images');
// input.style.opacity = 0;
input.addEventListener('change', previewImage);
const share = document.getElementById('share');
if(share) {
    share.addEventListener('click', profile);
}
// if(formImages) {
//     formImages.addEventListener('change', displayImages);
// }

const gallery = document.querySelectorAll(".gallery");


if(formLogin) {
    formLogin.addEventListener('submit', login);
}
if(formSignup) {
    formSignup.addEventListener('submit', signup);
}

function previewImage() {
    while(preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
    const curFiles = input.files;
    console.log(curFiles);
  
    for(const file of curFiles) {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        preview.appendChild(image);
    } 
    
} 


const pics = [];

async function profile(e) {
    e.preventDefault();
    let pic = document.createElement('img');
    let picB = document.createElement('img');
    // picB.src = '';

    //for base64 
    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onloadend = async function () {
        pic.src = reader.result;
        // const picBase = pic.src;
        const user = {
            imageUploads: pic.src,
        }
        res = await fetch("/user.html",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(user)});
        body = await res.json();
        console.log(body);
        for(let p of body) {
            // pics.push(p); // her seferinde tekrar ekliyo
            picB.src = p.img;
            // console.log(picB);
            gallery[0].appendChild(picB); 
            
        }
        pics.push(picB);    
        // let path = `<img src="${pics[0].img}">`;
        // console.log(`<img src="${pics[0].img}">`);
        // gallery[0].appendChild(path); 
    }   
}


if((window.location.href == "http://127.0.0.1:5500/user.html") || (window.location.href == "http://localhost:3000/user.html") ) {
    console.log("zzzzzzzzzzzzzzzzz");
    console.log(pics);
}

// function displayImages() {
//     console.log("ZZZZZZZZZZZZZZZZZZZZZ");
// }


async function login(e) {
    e.preventDefault();
    const user = {
       emailLogin: emailLogin.value,
       passwordLogin: passwordLogin.value
    }
    
    console.log(user);
    res = await fetch("/login.html",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(user)});
    body = await res.text();
    
        
    if (body === "s") {
        (window.location.href = '/user.html'); 
    } else if (body === "lf") {
        alert("The Email Address or Password is Incorrect");
    } else {

        alert("Unexpected Error");
    }
    emailLogin.value = '';
    passwordLogin.value = '';
}

async function signup(e) {
    e.preventDefault();
    const user = {
        name: nameSignup.value,
        emailSignup: emailSignup.value,
        passwordSignup: passwordSignup.value,
        passwordConfirm: passwordConfirm.value
     }
     console.log(user);
     res = await fetch("/signup.html",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(user)});
     body = await res.text();
     if(body === "f") {
         alert("Email has already been taken.");
     } else if(body === "x") {
        alert("Unexpected Error");
     } else if(body === "pf") {
         alert("Passwords Do Not Match");
     } else if(body === "ef") {
        alert("Please Enter a Valid Email")
     }
     else {
         console.log("User Added");
         alert("User Added");
     }
    
     console.log(body);
    nameSignup.value = '';
    emailSignup.value = '';
    passwordSignup.value = '';
    passwordConfirm.value = '';

}


    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    });

    // js code to appear signup and login form
    // signUpPage.addEventListener("click", ( )=>{
    //     container.classList.add("active");
    // });
    
    // loginPage.addEventListener("click", ( )=>{
    //     container.classList.remove("active");
    // });

    if((window.location.href == "http://127.0.0.1:5500/signup.html") || (window.location.href == "http://localhost:3000/signup.html") ) {
        container.classList.add("active");
    } else if ((window.location.href == "http://127.0.0.1:5500/login.html") || (window.location.href == "http://localhost:3000/login.html") ) {
        container.classList.remove("active");
    }
    

    

