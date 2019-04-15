$(document).ready(function() {
  $("#input1").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $.get("/api/user_data").then(function(data) {

      var newStock = {
        favstock1: $("#myInput").val(),
        email: data.email
      };

      // Send the POST request.
      $.ajax("/api/stock1", {
        type: "PUT",
        data: newStock
      }).then(
        function () {
          console.log("created new stock");
          // Reload the page to get the updated list
          location.reload();
        });
    });
  });
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
  function ready() {
    var query1 = "https://newsapi.org/v2/everything?q=stocks&from=2019-04-15&sortBy=popularity&apiKey=9d5561e285274379bd8c36f1241a89c7"
      $.ajax({
        url: query1,
        method: "GET",
      }).then(function (data) {
        console.log(data);
      })
    $.get("/api/user_data").then(function (data) {
      var sym = [];
      sym.push(data.favstock1, data.favstock2, data.favstock3, data.favstock4, data.favstock5, data.favstock6);
      if(data.favstock1===null){
        console.log("there is no favstock");
      }
     else{ $(".cardstart").empty();


    //  sym is gonna be an array produced from the favstock symbols in a specific users table********************* TO DO
  
    for (i = 0; i < sym.length; i++) {
      var query = "https://cloud.iexapis.com/beta/stock/" + sym[i] + "/quote?token=pk_193c5e7c831c41a2a9fdc3cba2372560"
      console.log(query);
      $.ajax({
        url: query,
        method: "GET",
      }).then(function (data) {
        
                 // Weather data                
 
                 var companyName = $("<span>").text(data.companyName).addClass("card-title");
                 var symbol = $("<p>").text(data.symbol);
                 var high = $("<p>").text("High: " + data.high);
                 var low = $("<p>").text("Low: " + data.low);
                 // Making a card for weather
                 var weatherdiv = $("<div class='col'>")
                 var wcardDiv = $("<div>").addClass("card blue-grey darken-1");
                 var wInfo = $("<div>").addClass("card-content white-text");
                 // Putting weather data on weather card
                     weatherdiv.append(wcardDiv);
                    
                     wInfo.append(companyName);
                     wInfo.append(symbol);
                     wInfo.append(high);
                     wInfo.append(low);
                     wcardDiv.append(wInfo);
                         $(".cardstart").append(weatherdiv);
        console.log(data);
        console.log(data.symbol);
        console.log(data.high);
        console.log(data.low)
        console.log(data.companyName);
      
        // We need to grab this data using jquery and display to the user on their page************************* TO DO *below is a list of possible data

        /*calculationPrice: "close"
        change: -0.45
        changePercent: -0.02606
        close: 16.82
        closeTime: 1555012800276
        companyName: "Fate Therapeutics, Inc."
        delayedPrice: 16.82
        delayedPriceTime: 1555012800276
        extendedChange: 1.27
        extendedChangePercent: 0.07551
        extendedPrice: 18.09
        extendedPriceTime: 1555021331041
        high: 17.49
        iexAskPrice: 0
        iexAskSize: 0
        iexBidPrice: 0
        iexBidSize: 0
        iexLastUpdated: 1555012793556
        iexMarketPercent: 0.007021995215192179
        iexRealtimePrice: 16.825
        iexRealtimeSize: 100
        iexVolume: 3393
        latestPrice: 16.82
        latestSource: "Close"
        latestTime: "April 11, 2019"
        latestUpdate: 1555012800276
        latestVolume: 483196
        low: 16.72
        marketCap: 1093838240
        open: 17.3
        openTime: 1554989400839
        peRatio: -14.04
        previousClose: 17.27
        symbol: "FATE"
        week52High: 19.11
        week52Low: 8.35
        ytdChange: 0.250363 */
        // Then we need a way to grab symbols put in through a form and push them into the user's favstock symbol column
      });
    }
  }
  })
  }
  ready();
});
