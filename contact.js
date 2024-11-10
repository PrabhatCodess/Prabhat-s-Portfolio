<<<<<<< HEAD

function labelFocusAnimation(){
    const input = document.querySelectorAll(".contact-input");

input.forEach(ipt => {
    ipt.addEventListener("focus", () => {
        ipt.parentNode.classList.add("focus");
        ipt.parentNode.classList.add("not-empty");
    });
ipt.addEventListener("blur", () => {
    if (ipt.value == ""){
        ipt.parentNode.classList.remove("not-empty");
    }
    ipt.parentNode.classList.remove("focus");
});
});
}

function darkLightTogglebtn(){
const toggleBtn = document.querySelector(".theme-toggle")
const allElements = document.querySelectorAll("*")

toggleBtn.addEventListener("click", () =>{
 document.body.classList.toggle("dark");


allElements.forEach((el) =>{
    el.classList.add("transition");
    setTimeout(()=>{
        el.classList.remove("transition");
    }, 1000);
  });
});

}





labelFocusAnimation();
=======

function labelFocusAnimation(){
    const input = document.querySelectorAll(".contact-input");

input.forEach(ipt => {
    ipt.addEventListener("focus", () => {
        ipt.parentNode.classList.add("focus");
        ipt.parentNode.classList.add("not-empty");
    });
ipt.addEventListener("blur", () => {
    if (ipt.value == ""){
        ipt.parentNode.classList.remove("not-empty");
    }
    ipt.parentNode.classList.remove("focus");
});
});
}

function darkLightTogglebtn(){
const toggleBtn = document.querySelector(".theme-toggle")
const allElements = document.querySelectorAll("*")

toggleBtn.addEventListener("click", () =>{
 document.body.classList.toggle("dark");


allElements.forEach((el) =>{
    el.classList.add("transition");
    setTimeout(()=>{
        el.classList.remove("transition");
    }, 1000);
  });
});

}





labelFocusAnimation();
>>>>>>> 419462fc6d510f32a4a6e9a01f53d826b3fcd07b
darkLightTogglebtn();