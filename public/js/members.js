var sym = require("/js/query.js");

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
for(i=0;i<sym.length;i++){
  var query = "https://cloud.iexapis.com/beta/stock/"+ i +"/quote?token=pk_193c5e7c831c41a2a9fdc3cba2372560"
  $.ajax({
    url: query,
    method: "GET",
  }).then(function(data){
console.log(data);
  })
}

});
