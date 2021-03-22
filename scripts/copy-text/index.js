const onCopyText = () => {
  if (textIsEmpty()) {
    let range = document.createRange();
    range.selectNode(textOutput);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect

    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied ";
  }
}

const onOutFunc = () => {
  let tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";

}