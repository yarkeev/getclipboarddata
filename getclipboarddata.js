getClipboardData = function (event, callback) {
    var textElement = event.target,
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
        selectionStart = textElement.selectionStart;
        oldTextLength = textElement.length;
        setTimeout(function () {
            newText = textElement.value;
            selectionEnd = selectionStart + newText.length - oldTextLength;
            text = newText.slice(selectionStart, selectionEnd);
            textElement.value = newText.slice(0, selectionStart) + newText.slice(selectionEnd);
            textElement.setSelectionRange(selectionStart, selectionStart);
            callback && callback(text);
            setTimeout(function () {
                cursorPosition = selectionStart + text.length;
                textElement.setSelectionRange(cursorPosition, cursorPosition);
            });
        });
    }
}