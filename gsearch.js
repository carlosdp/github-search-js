function searchGithubCode(input, callback) {
  $.ajax({url: 'https://api.github.com/search/code?q=' + input + '&sort=indexed', headers: {'Accept':'application/vnd.github.preview.text-match'}, complete: function(data) {
    callback(data.responseJSON);
  }});
}
var response;
var results
function writeResults(jsonDump){
  results = jsonDump
  var container = $(".main-content");
  var responses = jsonDump["total_count"] > 30 ? 30 :  jsonDump["total_count"];
//  var row = $("<div>").addClass("row");
//  var rowIndex = 0;
  for(var i=0;i<responses;i++){
    response = jsonDump["items"][i]
    var item = $("<blockquote>").addClass("hero-unit");
//  hero-unit replaces rows
//    if(rowIndex < 2){
//      rowIndex+=1;
//    } else {
//      container.append(row);
//      row = $("<div>").addClass("row");
//      rowIndex=0;
//    }
    var curseList = $("<div>");
    for(var j = 0; j < response.text_matches.length;j++){
      if(response.text_matches[j].fragment.length <= 140){ // tweet length seems appropriate
        curseList.append($("<code>").text(response.text_matches[j].fragment).addClass('curse-code'));
        curseList.append($("<br>"));
      } else {
        curseList.append($("<pre>").text(response.text_matches[j].fragment).addClass('curse-code'));
        curseList.append($("<br>"));
      }
    }
    item.append(curseList);
    item.append($("<cite>").append(
      $("<a>").text(response.repository.name))
              .attr('href',response.repository.url)
              .attr('title','Source Title')
    ).append(
      $("<p>").text("by ").append(
        $("<a>").text(response.repository.owner.login)
          .attr('href',response.repository.owner.url)
          .attr('title','Source Title')
      )
    );
    
    container.append(item);
  }
}

// set onclick to do the search
$(function(){
  $(".searchButton").on("click",function(){
    var searchQuery = $(".searchBox").val();
    if (! searchQuery) {stuff = $(".searchBox");throw "yo";}
    $(".searchBox").val("");
    var jsonDump = searchGithubCode(searchQuery, writeResults);    
  }) ;

  $(".searchBox").keypress(function(e){
    if(e.keyCode == 13){
      $(".searchButton").click();
      e.stopPropagation();
      e.preventDefault();
    }
  });

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
