window.onload = function () {
  //index.html - go to login
  let loginBtn = document.getElementById("logIn");
  loginBtn.onclick = function () {
    location.href = "login";
  };
  //index.html - go to signup
  let signUpBtn = document.getElementById("signUp");
  signUpBtn.onclick = function () {
    location.href = "signUp";
  };
  //index - go to onTheMenu
  let onTheMenuBtn = document.getElementById("onTheMenu-btn");
  onTheMenuBtn.onclick = function () {
    location.href = "onTheMenu";
  };
};
