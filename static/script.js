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

  let viewAllMeals = document.getElementById("viewMealKits");
  if (viewAllMeals) {
    viewAllMeals.onclick = function () {
      location.href = "/dashboard/dataClerk/viewAllMeals";
    };
  }
  function fixMeal() {
    console.log("this is in fixMeal function");
    // hey i want this file from server --request
    // fetch("/dashboard/dataClerk/viewAllMeals", {
    //   //what kind of method we use
    //   method: "POST",
    // })
    //   .then((response) => console.log("this is response", response)) // wrap it with json
    //   .catch((err) => console.log("error while fetching ", err));
  }
  let mealKitSmall = document.getElementsByClassName("mealKitSmall");
  if (mealKitSmall) {
    console.log("script.js - mealKitSmall ", mealKitSmall[0]);
    console.log("script.js - childnode17 ", mealKitSmall[0].childNodes[17]);
    let editBtn = mealKitSmall[0].childNodes[19];
    editBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      let title = mealKitSmall[0].childNodes[1].getAttribute("value");
      let ing = mealKitSmall[0].childNodes[3].getAttribute("value");
      let id = mealKitSmall[0].childNodes[17].getAttribute("value");
      console.log("what is id ", id);
      mealKitSmall[0].innerHTML = `
      <form id="mealKitForm" method="POST">
      <h5 id="mealKitTitle">title : <input type="text" name="title" value="${title}" /></h5>
      <h6 id="mealKitIngr">ingredients : <input type="text" name="ingredients" value="${ing}"/></h6>
      <h6 id="mealKitDesc">description : <input type="text" name="description" /></h6>
      <h6 id="mealKitCat">category : <input type="text" name="category" /></h6>
      <h6 id="mealKitPrice">price : <input type="number" name="price" /></h6>
      <h6 id="mealKitCookingTime">cooking time : <input type="number" /></h6>
      <h6 id="mealKitCal">calories : <input type="number" /></h6>
      <h6 id="mealKitTopMeal">is Top meal? <input type="text" /></h6>
      <input type="hidden" name="id" value="${id}">
      </form>
      <button type="submit" form="mealKitForm" class="editMealKit">submit</button><br />
      `;
    });
  }
};
