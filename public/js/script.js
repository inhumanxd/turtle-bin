document.onkeydown = function (e) {
  if (e.ctrlKey == true && (e.key == "a" || e.key == "A")) {
    if (document.getElementById("text"))
      document.getElementById("text").select();

    if (document.getElementById("code-display")) {
      node = document.getElementById("code-display");

      if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
      } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        console.warn("Could not select text in node: Unsupported browser.");
      }
    }

    e.Handled = e.SuppressKeyPress = true;
    return false;
  }
};

const copyUrl = () => {
  toastr.options.closeButton = true;
  toastr.options.preventDuplicates = true;
  toastr.options.positionClass = "toast-bottom-full-width";
  let dummy = document.createElement("input"),
    text = window.location.href;
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  toastr.success("Url has been copied to your clipboard!");
};
