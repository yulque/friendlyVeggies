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
  let mealKitSmall = document.getElementsByClassName("mealKitSmall");
  if (mealKitSmall) {
    //console.log("script.js - mealKitSmall ", mealKitSmall[0]);
    //console.log("script.js - childnode19 ", mealKitSmall[0].childNodes[19]);
    let thisBtn = document.getElementsByClassName("editMealKitBtn");
    for (let i = 0; i < thisBtn.length; i++) {
      thisBtn[i].addEventListener("click", (event) => {
        event.preventDefault();
        //event.stopImmediatePropagation();
        let children = mealKitSmall[i].childNodes;
        let items = [];
        for (let j = 0; j < children.length; j++) {
          if (j % 2 != 0) {
            items.push(children[j].getAttribute("value"));
            console.log("children[j]", children[j].getAttribute("value"));
          }
        }
        mealKitSmall[i].innerHTML = `
        <form id="mealKitForm" method="POST">
        <h5 id="mealKitTitle">title : <input type="text" name="title" value="${items[0]}" /></h5>
        <h6 id="mealKitIngr">ingredients : <input type="text" name="ingredients" value="${items[1]}"/></h6>
        <h6 id="mealKitDesc">description : <input type="text" name="description" value="${items[2]}"/></h6>
        <h6 id="mealKitCat">category : <input type="text" name="category" value="${items[3]}"/></h6>
        <h6 id="mealKitPrice">price : <input type="number" name="price" value="${items[4]}"/></h6>
        <h6 id="mealKitCookingTime">cooking time : <input type="number" name="cookingTime" value="${items[5]}"/></h6>
        <h6 id="mealKitServings">servings : <input type="number" name="servings" value="${items[6]}"/></h6>
        <h6 id="mealKitCal">calories : <input type="number" name="calories" value="${items[7]}"/></h6>
        <h6 id="mealKitTopMeal">is Top meal? <select name="isTopMeal" value="${items[8]}"> 
        <option value="True"> Yes </option>
        <option value=""> No </option></h6>
        <input type="hidden" name="id" value="${items[9]}">
        </form></br>
        <button type="submit" form="mealKitForm" class="editMealKit">submit</button>
        <button type="button" class="editMealKit" onclick="window.location.reload()">cancel</button><br />
        `;
      });
    }
  }
};
