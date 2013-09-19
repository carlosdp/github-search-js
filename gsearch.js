function searchGithubCode(input, callback) {
  $.ajax({url: 'https://api.github.com/search/code?q=' + input + '&sort=indexed', headers: {'Accept':'application/vnd.github.preview'}, complete: function(data) {
    callback(data.responseJSON);
  }});
}
var response;
function writeResults(jsonDump){
  var container = $(".content-container");
  var responses = jsonDump["total_count"] > 30 ? 30 :  jsonDump["total_count"];
  var row = $("<div>").addClass("row");
  var rowIndex = 0;
  for(var i=0;i<responses;i++){
    response = jsonDump["items"][i]
    if(rowIndex < 4){
      var item = $("<div>").addClass("container span3");
      rowIndex+=1;
    } else {
      container.append(row);
      row = $("<div>").addClass("row");
      rowIndex=0;
      var item = $("<div>").addClass("container span3");
    }
    item.append($("<h4>").text(response["name"]));
    item.append($("<p>").text(response["field"]));
    
    row.append(item);
  }
  container.append(row);
  container.append(responses);
}

// set onclick to do the search
$(function(){
  $(".searchButton").on("click",function(){
    var searchQuery = $(".searchBox").val();
    if (! searchQuery) {stuff = $(".searchBox");throw "yo";}
    $(".searchBox").val("");
    var jsonDump = searchGithubCode(searchQuery, writeResults);    
  }) ;

  $(".aboutTab").on("click", function() {
    var aboutInfo = $.get('about.txt', function(data) {
      $('body').append("\
        <div class='modal'>\
          <div class='modal-header'>\
            <button type='button' class='close'>&times;</button>\
            <h3>About</h3>\
            <div class='modal-body'>" + data + "\
            </div>\
          </div>\
        </div>\
      ");

      $('.close').on("click", function() {
        $('.modal').addClass("fade").remove();
      });
    });
  });
});
