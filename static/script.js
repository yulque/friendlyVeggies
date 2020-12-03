window.onload = function () {
  //home - go to login
  let loginBtn = document.getElementById("logIn");
  if (loginBtn) {
    loginBtn.onclick = function () {
      location.href = "/login";
    };
  }
  //home - log out button
  let logoutBtn = document.getElementById("logOut");
  if (logoutBtn) {
    logoutBtn.onclick = function () {
      location.href = "/logout";
    };
  }
  //home - go to signup
  let signUpBtn = document.getElementById("signUp");
  if (signUpBtn) {
    signUpBtn.onclick = function () {
      location.href = "/signup";
    };
  }
  //home - dash board
  let dashboardBtn = document.getElementById("dashboard");
  if (dashboardBtn) {
    dashboardBtn.onclick = function () {
      location.href = "/dashboard";
      console.log(request);
    };
  }
  //home - go to onTheMenu
  let onTheMenuBtn = document.getElementById("onTheMenu-btn");
  onTheMenuBtn.onclick = function () {
    location.href = "/onthemenu";
  };
  // create meal kit
  let createMealKit = document.getElementById("createMealKit");
  if (createMealKit) {
    createMealKit.onclick = function () {
      location.href = "/dashboard/dataclerk/createmealkit";
    };
  }
  // view meal kit list
  let viewAllMeals = document.getElementById("viewMealKits");
  if (viewAllMeals) {
    viewAllMeals.onclick = function () {
      location.href = "/dashboard/dataclerk/viewallmeals";
    };
  }

  let onTheMenuSmall = document.getElementsByClassName("onTheMenuSmall");
  if (onTheMenuSmall) {
    for (let i = 0; i < onTheMenuSmall.length; i++) {
      onTheMenuSmall[i].addEventListener("click", (e) => {
        e.preventDefault();
        location.href = "/onthemenu/description";
      });
    }
  }
  // edit meal kits
  let mealKitSmall = document.getElementsByClassName("mealKitSmall");
  if (mealKitSmall) {
    let thisBtn = document.getElementsByClassName("editMealKitBtn");
    for (let i = 0; i < thisBtn.length; i++) {
      thisBtn[i].addEventListener("click", (event) => {
        event.preventDefault();
        let children = mealKitSmall[i].childNodes;
        let items = [];
        for (let j = 0; j < children.length; j++) {
          if (j % 2 != 0) {
            items.push(children[j].getAttribute("value"));
          }
        }
        // when user clicks edit, it changes to edit
        mealKitSmall[i].innerHTML = `
        <form id="mealKitForm" method="POST" onsubmit="">
        <h5 id="mealKitTitle">title : <input type="text" name="title" value="${items[0]}" /></h5>
        <h6 id="mealKitIngr">ingredients : <input type="text" name="ingredients" value="${items[1]}"/></h6>
        <h6 id="mealKitDesc">description : <input type="text" name="description" value="${items[2]}"/></h6>
        <h6 id="mealKitCat">category : <select name="category" id="category" value="${items[3]}" title="category" /><br />
        <option value="classic meals">classic meals</option>
        <option value="vegan meals">vegan meals</option>
        <option value="snacks">snacks</option>
        </select></h6>
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

        // // I want to return form Data
        // let myForm = document.getElementById("mealKitForm");
        // myForm.addEventListener("submit", function (e) {
        //   e.preventDefault();

        //   const formData = new FormData(this);

        //   fetch("edit", {
        //     method: "post",
        //     mode: "no-cors",
        //     body: formData,
        //   })
        //     .then(function (response) {
        //       response
        //         .text()
        //         .then((form) => console.log(form))
        //         .catch((err) => console.log(err));
        //     })
        //     .catch((err) => consolš.log(err));
      }); //event listener ends here
    }
  }
};
