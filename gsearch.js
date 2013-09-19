function searchGithubCode(input, callback) {
  $.ajax({url: 'https://api.github.com/search/code?q=' + input + '&sort=indexed', headers: {'Accept':'application/vnd.github.preview.text-match'}, complete: function(data) {
    callback(data.responseJSON);
  }});
}
var response;
function writeResults(jsonDump){
  response = jsonDump
  var container = $(".content-container");
  var responses = jsonDump["total_count"] > 30 ? 30 :  jsonDump["total_count"];
  var row = $("<div>").addClass("row");
  var rowIndex = 0;
  for(var i=0;i<responses;i++){
    response = jsonDump["items"][i]
    var item = $("<div>").addClass("container span4");
    if(rowIndex < 2){
      rowIndex+=1;
    } else {
      container.append(row);
      row = $("<div>").addClass("row");
      rowIndex=0;
    }
    item.append($("<h4>").append(
      $("<a>").text(response.repository.name)).attr('href',response.repository.url)
    );
    item.append($("<p>").text("by "+response.repository.owner.login));
    
    row.append(item);
  }
  container.append(row);
}

// set onclick to do the search
$(function(){
  $(".searchButton").on("click",function(){
    var searchQuery = $(".searchBox").val();
    if (! searchQuery) {stuff = $(".searchBox");throw "yo";}
    $(".searchBox").val("");
    var jsonDump = searchGithubCode(searchQuery, writeResults);    
  }) ;
});
