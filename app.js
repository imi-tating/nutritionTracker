var sodiumIntake = 0;
var restaurants = {
  starbucks: {
    toffeeNutLatte: {
      name: "Iced Grande ToffeeNut Latte",
      sodium: 115
    },

    caramelMacchiato: {
      name: "Iced Grande Caramel Macchiato",
      sodium: 150
    },

    classicOatmeal: {
      name: "Classic Oatmeal",
      sodium: 125
    },

    cinnamonRaisinBagel: {
      name: "Cinnamon Raisin Bagel + Cream Cheese",
      sodium: 370
    },

    everthingBagel: {
      name: "Everything Bagel + Cream Cheese",
      sodium: 500
    },

    // recommendations: "Swap Everything Bagel (500mg) for Cinnamon Raisin Bagel (370mg) - or better yet, Oatmeal (125mg)."
  },

  chipotle: {
    vegBurrito: {
      name: "Fajita Vegetable Burrito",
      sodium: 2180
    },

    sofBurrito: {
      name: "Sofritas Vegetable Burrito",
      sodium: 2740
    },

    vegBurritoBowl: {
      name: "Fajita Vegetable Burrito Bowl",
      sodium: 1580
    },

    sofBurritoBowl: {
      name: "Sofritas Vegetable Burrito Bowl",
      sodium: 1580
    },

    cheeseQuesadilla: {
      name: "Cheese Quesadilla",
      sodium: 790
    },

    smChips: {
      name: "Small Chips",
      sodium: 390
    },

    lgChips: {
      name: "Large Chips",
      sodium: 590
    },

    guacamole: {
      name: "Guacamole",
      sodium: 370
    },

    // recommendations: "Swap Fresh Tomato Salsa (550mg) for Roasted Chili-Corn Salsa (330mg). Cut out the tortilla (600mg) by having a Burrito Bowl instead of the Burrito."
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
      var newCardBody = $('<div class="card-body">');

      var menuItem = chosenRestaurantMenu[Object.keys(chosenRestaurantMenu)[i]]
      var itemName = menuItem.name;
      var itemSodium = menuItem.sodium;

      var nameSpan= $('<span>' + itemName + '</span>')
      var sodiumSpan= $('<span class="text-muted float-right sodium-mg">' + itemSodium + '</span>');

      newCardBody.append(nameSpan).append(sodiumSpan);
      newCard.append(newCardBody);
      newCard.attr("data-sodium", itemSodium).attr("data-name", itemName);
      $("#menu-items-bin").append(newCard);
    }
  } else {
    $(this).attr("data-toggle", "closed");
  }

}

function countSodium() {
  var itemSodium = parseInt($(this).attr("data-sodium"));
  var itemName = $(this).attr("data-name");

  sodiumIntake += itemSodium;
  $("#running-total").text(sodiumIntake);

  var newLi = $('<li class="list-group-item">');
  var nameSpan= $('<span>' + itemName + '</span>')
  var sodiumSpan= $('<span class="text-muted float-right sodium-mg">' + itemSodium + '</span>');

  newLi.append(nameSpan).append(sodiumSpan);
  $("#sodium-items").append(newLi);
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

$(document).ready(function(){
  $("#running-total").append(sodiumIntake);
  $("#sodium-items").hide();


  $(document).on("click", ".restaurant-image", showMenuItems);
  $(document).on("click", ".menu-item", countSodium);
  $(document).on("click", "#total-card", showSodiumCount);
});