getClipboardData = function (event, callback) {
    var textElement = $(event.target),
        text = '',
        newText,
        selectionStart,
        selectionEnd,
        cursorPosition,
        oldTextLength;

    if (event.originalEvent.clipboardData) {
        text = event.originalEvent.clipboardData.getData('text/html') || event.originalEvent.clipboardData.getData('text/plain');
        callback && callback(text);
    } else if (window.clipboardData && window.clipboardData.getData) {
        text = window.clipboardData.getData('Text');
        callback && callback(text);
    } else {
        selectionStart = textElement.get(0).selectionStart;
        oldTextLength = self.getLength();
        setTimeout(function () {
            newText = self.get();
            selectionEnd = selectionStart + self.getLength() - oldTextLength;
            text = newText.slice(selectionStart, selectionEnd);
            textElement.val( newText.slice(0, selectionStart) + newText.slice(selectionEnd) );
            textElement.get(0).setSelectionRange(selectionStart, selectionStart);
            callback && callback(text);
            setTimeout(function () {
                cursorPosition = selectionStart + text.length;
                textElement.get(0).setSelectionRange(cursorPosition, cursorPosition);
            });
        });
    }
}