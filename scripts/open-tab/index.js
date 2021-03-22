const openTab = (evt, tab) => {
  let i, x, tablinks;

  x = document.getElementsByClassName("tab-column");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" selected-tab", "");
  }

  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " selected-tab";
}