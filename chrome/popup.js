var default_options = {
  background: false
};

document.addEventListener("DOMContentLoaded", function() {
  var links = document.getElementsByTagName("a");
  for (var i=0; i < links.length; i++) {
    var link = links[i];
    if (link.href.substr(0,9) == "chrome://") {
      link.addEventListener("click", function() {
        chrome.tabs.create({ url: this.href });
      });
    }
  }

  chrome.commands.getAll(function(commands) {
    commands.forEach(function(command) {
      if (command.name == "duplicate-tab") {
        var shortcut = document.getElementById("shortcut");
        shortcut.textContent = command.shortcut || "not set";
      }
    });
  });

  var background = document.getElementById("background");
  chrome.storage.sync.get(default_options, function(items) {
    background.checked = items.background;
    background.addEventListener("change", function() {
      var new_options = {
        background: background.checked
      };
      chrome.storage.sync.set(new_options);
    });
  });
});
