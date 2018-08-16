var sodiumIntake = 0;
var todaysMenuItems = [];
var restaurants = {
  starbucks: {
    toffeeNutLatte: {
      name: "Iced Grande ToffeeNut Latte",
      sodium: 115,
      portion: 1
    },

    caramelMacchiato: {
      name: "Iced Grande Caramel Macchiato",
      sodium: 150,
      portion: 1
    },

    classicOatmeal: {
      name: "Classic Oatmeal",
      sodium: 125,
      portion: 1
    },

    cinnamonRaisinBagel: {
      name: "Cinnamon Raisin Bagel + Cream Cheese",
      sodium: 370,
      portion: 1
    },

    everthingBagel: {
      name: "Everything Bagel + Cream Cheese",
      sodium: 500,
      portion: 1
    },

    // recommendations: "Swap Everything Bagel (500mg) for Cinnamon Raisin Bagel (370mg) - or better yet, Oatmeal (125mg)."
  },

  chipotle: {
    vegBurrito: {
      name: "Fajita Vegetable Burrito",
      sodium: 1630,
      portion: 1
    },

    sofBurrito: {
      name: "Sofritas Vegetable Burrito",
      sodium: 2190,
      portion: 1
    },

    vegBurritoBowl: {
      name: "Fajita Vegetable Burrito Bowl",
      sodium: 1030,
      portion: 1
    },

    sofBurritoBowl: {
      name: "Sofritas Vegetable Burrito Bowl",
      sodium: 1590,
      portion: 1
    },

    cheeseQuesadilla: {
      name: "Cheese Quesadilla",
      sodium: 980,
      portion: 1
    },

    smChips: {
      name: "Small Chips",
      sodium: 390,
      portion: 1
    },

    lgChips: {
      name: "Large Chips",
      sodium: 590,
      portion: 1
    },

    guacamole: {
      name: "Guacamole",
      sodium: 370,
      portion: 1
    },

    // recommendations: "Swap Fresh Tomato Salsa (550mg) for Roasted Chili-Corn Salsa (330mg). Cut out the tortilla (600mg) by having a Burrito Bowl instead of the Burrito."
  },

  jambajuice: {
    mandoAGoGo: {
      name: "Mango-A-Go-Go",
      sodium: 60,
      portion: 1
    },

    orangeC: {
      name: "Orange C-Booster",
      sodium: 30,
      portion: 1
    },

    orangeCarrot: {
      name: "Orange Carrot Karma",
      sodium: 150,
      portion: 1
    },

    acai: {
      name: "Açaí Super Antioxidant",
      sodium: 115,
      portion: 1
    },

    pBMood: {
      name: "Peanut Butter Moo'd",
      sodium: 480,
      portion: 1
    },

    oatmeal: {
      name: "Steel-Cut Oatmeal + Banana/BrownSugar",
      sodium: 15,
      portion: 1
    }
  },

  brueggers: {
    blueberryBagel: {
      name: "Blueberry Bagel + Cream Cheese",
      sodium: 625,
      portion: 1
    },

    cranberryBagel: {
      name: "Cranberry Bagel + Cream Cheese",
      sodium: 625,
      portion: 1
    },

    cinnamonRaisinBagel: {
      name: "Cinnamon Raisin Bagel + Cream Cheese",
      sodium: 605,
      portion: 1
    },

    RosemaryOliveOilBagel: {
      name: "Rosemary Olive Oil Bagel + Cream Cheese",
      sodium: 635,
      portion: 1
    },

    eggCheeseCranberryBagel: {
      name: "Egg Cheese on Cranberry Bagel",
      sodium: 940,
      portion: 1
    },

    eggCheeseRosemaryOliveOilBagel: {
      name: "Egg Cheese on Rosemary Olive Oil Bagel",
      sodium: 950,
      portion: 1
    }
  }
}

function showMenuItems() {
  $("#menu-items-bin").empty();
  var chosenRestaurantMenu = restaurants[$(this).attr("id")];

  if ($(this).attr("data-toggle") === "closed") {
    $(".restaurant-image").attr("data-toggle", "closed");
    $(this).attr("data-toggle", "open");
    for (var i = 0; i < Object.keys(chosenRestaurantMenu).length; i++) {
      var newCard = $('<div class="card clickable menu-item">');
      var newCardBody = $('<div class="row align-items-center card-body">');

      var menuItem = chosenRestaurantMenu[Object.keys(chosenRestaurantMenu)[i]]
      var itemName = menuItem.name;
      var itemSodium = menuItem.sodium;
      var itemPortion = menuItem.portion;

      var nameSpan= $('<div class="col">' + itemName + '</div>');
      var iconSpan = $('<div class="col-xs-1"><i class="fas fa-cookie cookie-icon clickable" style="display: block"></i><i class="fas fa-cookie-bite cookie-icon clickable" style="display: none"></i></div>');
      var sodiumSpan= $('<div class="col-xs-1 text-right text-muted sodium-mg">' + itemSodium + '</div>');

      newCardBody.append(nameSpan).append(iconSpan).append(sodiumSpan);
      newCard.append(newCardBody);
      newCard.attr("data-sodium", itemSodium).attr("data-name", itemName).attr("data-portion", itemPortion);
      $("#menu-items-bin").append(newCard);
    }
  } else {
    $(this).attr("data-toggle", "closed");
  }

}

function addSodium(itemSodium, itemName, itemId) {
  sodiumIntake += itemSodium;
  $("#running-total").text(sodiumIntake);

  // ADDS COUNTED ITEM TO DAILY OVERVIEW:
  var newLi = $('<li class="list-group-item">').attr({
    "data-id": itemId,
    "data-sodium": itemSodium,
    "data-name": itemName
  });

  var closeSpan = $('<span id="close-button" class="close float-left">&times;</span>');
  var nameSpan= $('<span class="float-center item-name">' + itemName + '</span>');
  var sodiumSpan= $('<span class="text-muted float-right sodium-mg">' + itemSodium + '</span>');

  newLi.append(closeSpan).append(nameSpan).append(sodiumSpan);
  $("#sodium-items").append(newLi);

  //ADD COUNTED ITEM TO LOCAL STORAGE:
  todaysMenuItems.push({itemSodium: itemSodium, itemName: itemName, itemId: itemId});
  localStorage.setItem("menuItems", JSON.stringify(todaysMenuItems));
}

function handleMenuItemClick() {
  var itemSodium = parseInt($(this).attr("data-sodium"));
  var itemName = $(this).attr("data-name");
  var itemPortion = parseFloat($(this).attr("data-portion"));
  var itemId =  Date.now();
  addSodium(Math.ceil(itemSodium * itemPortion), itemName, itemId)
}

function cookieClick(event) {
  event.stopPropagation();
  if ($(this).hasClass("fa-cookie")) {
    $(this).css("display", "none");
    $(this).siblings('.fa-cookie-bite').css("display", "block");
    $(this).parents(".card").attr("data-portion", .5);
    var halfSodium = Math.ceil(parseFloat($(this).parents(".card").attr("data-portion"))
    * parseInt($(this).parents(".card").attr("data-sodium")))
    $(this).parents(".row").children(".sodium-mg").text(halfSodium);
  } else {
    $(this).css("display", "none");
    $(this).siblings('.fa-cookie').css("display", "block");
    $(this).parents(".card").attr("data-portion", 1);
    var fullSodium = $(this).parents(".card").attr("data-sodium");
    $(this).parents(".row").children(".sodium-mg").text(fullSodium);

  }
}

function subtractSodium() {
  var itemSodium = $(this).parent('li').attr("data-sodium");
  var itemId = $(this).parent('li').attr("data-id");


  sodiumIntake -= itemSodium;
  $("#running-total").text(sodiumIntake);
  $(this).parent().remove();

  //REMOVE COUNTED ITEM TO LOCAL STORAGE:
  todaysMenuItems = todaysMenuItems.filter(function(eachItem) {
    return itemId != eachItem.itemId
  });
  localStorage.setItem("menuItems", JSON.stringify(todaysMenuItems));
}

function showSodiumCount() {
  if ($(this).attr("data-toggle") === "closed") {
    $(this).attr("data-toggle", "open");
    $("#sodium-items").show();

  } else {
    $(this).attr("data-toggle", "closed");
    $("#sodium-items").hide();
  }
}

function addFromLocalStorage() {
  var previousMenuItems = JSON.parse(localStorage.getItem("menuItems"));
  if (previousMenuItems) {
    previousMenuItems.forEach(function(eachItem){
      addSodium(eachItem.itemSodium, eachItem.itemName, eachItem.itemId)
    });
    todaysMenuItems = previousMenuItems;
  }
}

$(document).ready(function(){
  $("#running-total").append(sodiumIntake);
  $("#sodium-items").hide();

  addFromLocalStorage();


  $(document).on("click", ".restaurant-image", showMenuItems);
  $(document).on("click", ".card-header", showSodiumCount);
  $(document).on("click", ".menu-item", handleMenuItemClick);
  $(document).on("click", "#close-button", subtractSodium);
  $(document).on("click", ".cookie-icon", cookieClick);
});
