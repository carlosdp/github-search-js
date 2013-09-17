function searchGithubCode(input, callback) {
  $.ajax({url: 'https://api.github.com/search/code?q=' + input + '&sort=indexed', headers: {'Accept':'application/vnd.github.preview'}, complete: function(data) {
    callback(data.responseJSON);
  }});
}
