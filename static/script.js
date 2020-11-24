window.onload = function () {
  //index.html - go to login
  let loginBtn = document.getElementById("logIn");
  if (loginBtn) {
    loginBtn.onclick = function () {
      location.href = "/login";
    };
  }
  //log out
  let logoutBtn = document.getElementById("logOut");
  if (logoutBtn) {
    logoutBtn.onclick = function () {
      location.href = "/logOut";
    };
  }
  //index.html - go to signup
  let signUpBtn = document.getElementById("signUp");
  if (signUpBtn) {
    signUpBtn.onclick = function () {
      location.href = "/signUp";
    };
  }
  //index - go to onTheMenu
  let onTheMenuBtn = document.getElementById("onTheMenu-btn");
  onTheMenuBtn.onclick = function () {
    location.href = "/onTheMenu";
  };
  // create meal kit
  let createMealKit = document.getElementById("createMealKit");
  if (createMealKit) {
    createMealKit.onclick = function () {
      location.href = "/dashboard/dataClerk/createMealKit";
    };
  }
};
