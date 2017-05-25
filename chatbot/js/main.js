var client = camisdk.Client("", true);

function getCaret(el) {
   if (el.selectionStart) {
      return el.selectionStart;
   }
   else if (document.selection)
   {
      el.focus();
      var r = document.selection.createRange();
      if (r == null)
      {
         return 0;
      }
      var re = el.createTextRange(), rc = re.duplicate();
      re.moveToBookmark(r.getBookmark());
      rc.setEndPoint('EndToStart',re);
      return rc.text.length;
   }
   return 0;
}

function postInput(content)
{
    var msg = "<tr class=\"input-msg\"><td><div class=\"bubble-right\">" + content + "</div></td></tr>";
    $("#msg-table").append(msg);
    
    
    client.penny.sendMessage({}, content, function(resp)
    {
        if (resp.status == 200) postResponse(resp.message);
    });
}

function postResponse(content)
{
    var msg = "<tr class=\"response-msg\"><td><div class=\"bubble-left\">" + content  + "</div></td></tr>";
    $("#msg-table").append(msg);
}

$("#msgbox").keyup(function (event)
{
   if (event.keyCode == 13) {
      var content = this.value;
      var msg = "<tr class=\"input-msg\">" + content + "</tr>";
      $("#msg-table").append(msg);
      var caret = getCaret(this);
      if (event.shiftKey)
      {
         this.value = content.substring(0,caret - 1) + "\n" + content.substring(caret, content.length);
         event.stopPropagation();
      }
      else
      {
         this.value = content.substring(0,caret - 1) + content.substring(caret, content.length);
         postInput(this.value);
         this.value = '';
      }
   }
});
  

