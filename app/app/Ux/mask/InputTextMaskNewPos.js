/**
 * InputTextMask script used for mask/regexp operations.
 * Mask Individual Character Usage:
 * 9 - designates only numeric values
 * L - designates only uppercase letter values
 * l - designates only lowercase letter values
 * A - designates only alphanumeric values

 * X - denotes that a custom client script regular expression is specified</li>
 * All other characters are assumed to be "special" characters used to mask the input component.
 * Example 1:
 * (999)999-9999 only numeric values can be entered where the the character
 * position value is 9. Parenthesis and dash are non-editable/mask characters.
 * Example 2:
 * 99L-ll-X[^A-C]X only numeric values for the first two characters,
 * uppercase values for the third character, lowercase letters for the
 * fifth/sixth characters, and the last character X[^A-C]X together counts
 * as the eighth character regular expression that would allow all characters
 * but "A", "B", and "C". Dashes outside the regular expression are non-editable/mask characters.
 * S - any char
 * @constructor
 * @param (String) mask The InputTextMask
 * @param (boolean) clearWhenInvalid True to clear the mask when the field blurs and the text is invalid. Optional, default is true.
 */

Ext.define('Ux.InputTextMaskNewPos', {
    extend: 'Ux.InputTextMask',
    constructor: function (field, mask, clearWhenInvalid) {
        this.setInputMask(field, mask, clearWhenInvalid);
        //if (clearWhenInvalid === undefined)
        //    this.clearWhenInvalid = true;
        //else
        //    this.clearWhenInvalid = clearWhenInvalid;
        //this.rawMask = mask;
        //this.viewMask = '';
        //this.maskArray = new Array();
        //var mai = 0;
        //var regexp = '';
        //for (var i = 0; i < mask.length; i++) {
        //    if (regexp) {
        //        if (regexp == 'X') {
        //            regexp = '';
        //        }
        //        if (mask.charAt(i) == 'X') {
        //            this.maskArray[mai] = regexp;
        //            mai++;
        //            regexp = '';
        //        } else {
        //            regexp += mask.charAt(i);
        //        }
        //    } else if (mask.charAt(i) == 'X') {
        //        regexp += 'X';
        //        this.viewMask += '_';
        //    } else if (mask.charAt(i) == '9' || mask.charAt(i) == 'L' || mask.charAt(i) == 'l' || mask.charAt(i) == 'A' || mask.charAt(i) == 'R' || mask.charAt(i) == 'Б' || mask.charAt(i) == 'S') {
        //        this.viewMask += '_';
        //        this.maskArray[mai] = mask.charAt(i);
        //        mai++;
        //    } else {
        //        this.viewMask += mask.charAt(i);
        //        this.maskArray[mai] = RegExp.escape(mask.charAt(i));
        //        mai++;
        //    }
        //}
        //
        //this.specialChars = this.viewMask.replace(/(L|l|9|A|_|X)/g, '');
        return this;
    },

    setInputMask: function (mask, clearWhenInvalid) {
        if (clearWhenInvalid === undefined)
            this.clearWhenInvalid = false;
        else
            this.clearWhenInvalid = clearWhenInvalid;

        this.rawMask = mask;
        this.viewMask = '';
        this.maskArray = new Array();
        var mai = 0;
        var regexp = '';
        for (var i = 0; i < mask.length; i++) {
            if (regexp) {
                if (regexp == 'X') {
                    regexp = '';
                }
                if (mask.charAt(i) == 'X') {
                    this.maskArray[mai] = regexp;
                    mai++;
                    regexp = '';
                } else {
                    regexp += mask.charAt(i);
                }
            } else if (mask.charAt(i) == 'X') {
                regexp += 'X';
                this.viewMask += '_';
            } else if (mask.charAt(i) == '0' || mask.charAt(i) == '9' || mask.charAt(i) == 'L' || mask.charAt(i) == 'l' || mask.charAt(i) == 'A' || mask.charAt(i) == 'R' || mask.charAt(i) == 'Б' || mask.charAt(i) == 'S') {
                this.viewMask += '_';
                this.maskArray[mai] = mask.charAt(i);
                mai++;
            } else {
                this.viewMask += mask.charAt(i);
                this.maskArray[mai] = RegExp.escape(mask.charAt(i));
                mai++;
            }
        }

        this.specialChars = this.viewMask.replace(/(L|l|9|A|_|X)/g, '');
    },

    init: function (field) {
        this.field = field;

        if (field.rendered) {
            this.assignEl();
        } else {
            field.on('render', this.assignEl, this);
        }

        field.on('blur', this.removeValueWhenInvalid, this);
        //field.on('keydown',this.removeValueWhenInvalid, this);
        this.addTooltip(field);
        field.on('focus', this.processMaskFocus, this);
    },

    assignEl: function () {
        this.inputTextElement = this.field.inputEl.dom;

        this.field.inputEl.on('keypress', this.processKeyPress, this);
        this.field.inputEl.on('keydown', this.processKeyDown, this);

        //if(Ext.isSafari || Ext.isIE){
        //    this.field.inputEl.on('paste',this.startTask,this);
        //    this.field.inputEl.on('cut',this.startTask,this);
        //    this.field.inputEl.on('cut',this.startTask,this);
        //}
        //if(Ext.isGecko || Ext.isOpera){
        //    this.field.inputEl.on('mousedown',this.setPreviousValue,this);
        //}
        //if(Ext.isGecko){
        //    this.field.inputEl.on('input',this.onInput,this);
        //}
        //if(Ext.isOpera){
        //    this.field.inputEl.on('input',this.onInputOpera,this);
        //}
    },


    //onInput: function(){
    //    this.startTask(false);
    //},
    //onInputOpera: function(){
    //    if(!this.prevValueOpera){
    //        this.startTask(false);
    //    }else{
    //        this.manageBackspaceAndDeleteOpera();
    //    }
    //},

    manageBackspaceAndDeleteOpera: function () {
        this.inputTextElement.value = this.prevValueOpera.cursorPos.previousValue;
        this.manageTheText(this.prevValueOpera.keycode, this.prevValueOpera.cursorPos);
        this.prevValueOpera = null;
    },

    //setPreviousValue: function(event){
    //    this.oldCursorPos=this.getCursorPosition();
    //},

    getValidatedKey: function (keycode, cursorPosition) {
        return this.validateSymbol(keycode.pressedKey, cursorPosition);
    },

    // * onBlur
    removeValueWhenInvalid: function (field, e) {
        if (this.clearWhenInvalid && this.inputTextElement.value.indexOf('_') > -1) {
            this.inputTextElement.value = '';
        } else { // * blur
            // * пустое поле- только маска: удалим маску
            this.inputTextElement.value=this.removeMask(this.inputTextElement.value);
        }
    },

    removeMask: function (str) {
        if (str.match(/(_)/gi) && str.length == str.match(/(_)/gi).length) {
            str = str.replace(/(_)/gi, ' ').trim();
        } else {// * есть значения, но не все: внедрим маску
            str = this.applyMaskToString(str);
        }
        return str;
    },
    
    managePaste: function () {
        if (this.oldCursorPos == null) {
            return;
        }
        var valuePasted = this.inputTextElement.value.substring(this.oldCursorPos.start, this.inputTextElement.value.length - (this.oldCursorPos.previousValue.length - this.oldCursorPos.end));
        if (this.oldCursorPos.start < this.oldCursorPos.end) {
            this.oldCursorPos.previousValue =
                this.oldCursorPos.previousValue.substring(0, this.oldCursorPos.start) +
                this.viewMask.substring(this.oldCursorPos.start, this.oldCursorPos.end) +
                this.oldCursorPos.previousValue.substring(this.oldCursorPos.end, this.oldCursorPos.previousValue.length);
            valuePasted = valuePasted.substr(0, this.oldCursorPos.end - this.oldCursorPos.start);
        }
        this.inputTextElement.value = this.oldCursorPos.previousValue;
        keycode = {
            unicode: '',
            isShiftPressed: false,
            isTab: false,
            isBackspace: false,
            isLeftOrRightArrow: false,
            isDelete: false,
            pressedKey: ''
        }
        var charOk = false;
        for (var i = 0; i < valuePasted.length; i++) {
            keycode.pressedKey = valuePasted.substr(i, 1);
            keycode.unicode = valuePasted.charCodeAt(i);
            this.oldCursorPos = this.skipMaskCharacters(keycode, this.oldCursorPos);
            if (this.oldCursorPos === false) {
                break;
            }
            if (this.injectValue(keycode, this.oldCursorPos)) {
                charOk = true;
                this.moveCursorToPosition(keycode, this.oldCursorPos);
                this.oldCursorPos.previousValue = this.inputTextElement.value;
                this.oldCursorPos.start = this.oldCursorPos.start + 1;
            }
        }
        if (!charOk && this.oldCursorPos !== false) {
            this.moveCursorToPosition(null, this.oldCursorPos);
        }
        this.oldCursorPos = null;
    },

    processKeyDown: function (e) {
        this.processMaskFormatting(e, 'keydown');
    },

    processKeyPress: function (e) {
        this.processMaskFormatting(e, 'keypress');
    },

    startTask: function (setOldCursor) {
        if (this.task == undefined) {
            this.task = new Ext.util.DelayedTask(this.managePaste, this);
        }
        if (setOldCursor !== false) {
            this.oldCursorPos = this.getCursorPosition();
        }
        this.task.delay(0);
    },

    skipMaskCharacters: function (keycode, cursorPos) {
        if (cursorPos.start != cursorPos.end && (keycode.isDelete || keycode.isBackspace))
            return (cursorPos);
        while (this.specialChars.match(RegExp.escape(this.viewMask.charAt(((keycode.isBackspace) ? cursorPos.start - 1 : cursorPos.start))))) {
            if (keycode.isBackspace) {
                cursorPos.dec();
            } else {
                cursorPos.inc();
            }
            if (cursorPos.start >= cursorPos.previousValue.length || cursorPos.start < 0) {
                return false;
            }
        }
        return (cursorPos);
    },

    isManagedByKeyDown: function (keycode) {
        if (keycode.isDelete || keycode.isBackspace) {
            return (true);
        }
        return (false);
    },

    processMaskFormatting: function (e, type) {
        this.oldCursorPos = null;
        var cursorPos = this.getCursorPosition();
        var keycode = this.getKeyCode(e, type);

        if (!this.field.readOnly) {
            if (keycode.unicode == 0) {//?? sometimes on Safari
                return;
            }
            if ((keycode.unicode == 67 || keycode.unicode == 99) && e.ctrlKey) {//Ctrl+c, let's the browser manage it!
                return;
            }
            if ((keycode.unicode == 88 || keycode.unicode == 120) && e.ctrlKey) {//Ctrl+x, manage paste
                this.startTask();
                return;
            }
            if ((keycode.unicode == 86 || keycode.unicode == 118) && e.ctrlKey) {//Ctrl+v, manage paste....
                this.startTask();
                return;
            }
            if ((keycode.isBackspace || keycode.isDelete) && Ext.isOpera) {
                this.prevValueOpera = {cursorPos: cursorPos, keycode: keycode};
                return;
            }
            if (type == 'keydown' && !this.isManagedByKeyDown(keycode)) {
                return true;
            }
            if (type == 'keypress' && this.isManagedByKeyDown(keycode)) {
                return true;
            }
            if (this.handleEventBubble(e, keycode, type)) {
                return true;
            }
            return (this.manageTheText(keycode, cursorPos));
        }
    },

    manageTheText: function (keycode, cursorPos) {
        //console.info(arguments);
        if (this.inputTextElement.value.length === 0) {
            this.inputTextElement.value = this.viewMask;
        } else {
            //this.inputTextElement.value = this.applyMaskToString(this.inputTextElement.value);
            //console.info(this.inputTextElement.value);
        }
        cursorPos = this.skipMaskCharacters(keycode, cursorPos);
        if (cursorPos === false) {
            return false;
        }
        if (this.injectValue(keycode, cursorPos)) {
            this.moveCursorToPosition(keycode, cursorPos);
        }
        return (false);
    },

    processMaskFocus: function ( e) {
        if (this.inputTextElement.value.length == 0) {
            var cursorPos = this.getCursorPosition();
            this.inputTextElement.value = this.viewMask;
            //this.moveCursorToPosition(null, cursorPos);
        } else { // *
            //if(this.inputTextElement.value.length < this.viewMask.length){
            //    var substViewMask= this.viewMask.substr(-this.inputTextElement.value.length);
            //    this.inputTextElement.value=this.inputTextElement.value+substViewMask;
            //}

        }
        this.focusStart(this.field, e);
    },

    isManagedByBrowser: function (keyEvent, keycode, type) {
        if (((type == 'keypress' && keyEvent.charCode === 0) ||
            type == 'keydown') && (keycode.unicode == Ext.EventObject.TAB ||
            keycode.unicode == Ext.EventObject.RETURN ||
            keycode.unicode == Ext.EventObject.ENTER ||
            keycode.unicode == Ext.EventObject.SHIFT ||
            keycode.unicode == Ext.EventObject.CONTROL ||
            keycode.unicode == Ext.EventObject.ESC ||
            keycode.unicode == Ext.EventObject.PAGEUP ||
            keycode.unicode == Ext.EventObject.PAGEDOWN ||
            keycode.unicode == Ext.EventObject.END ||
            keycode.unicode == Ext.EventObject.HOME ||
            keycode.unicode == Ext.EventObject.LEFT ||
            keycode.unicode == Ext.EventObject.UP ||
            keycode.unicode == Ext.EventObject.RIGHT ||
            keycode.unicode == Ext.EventObject.DOWN)) {
            return (true);
        }
        return (false);
    },

    handleEventBubble: function (keyEvent, keycode, type) {
        try {
            if (keycode && this.isManagedByBrowser(keyEvent, keycode, type)) {
                return true;
            }
            keyEvent.stopEvent();
            return false;
        } catch (e) {
            alert(e.message);
        }
    },

    getCursorPosition: function () {
        var s, e, r;
        if (this.inputTextElement.createTextRange) {
            r = document.selection.createRange().duplicate();
            r.moveEnd('character', this.inputTextElement.value.length);
            if (r.text === '') {
                s = this.inputTextElement.value.length;
            } else {
                s = this.inputTextElement.value.lastIndexOf(r.text);
            }
            r = document.selection.createRange().duplicate();
            r.moveStart('character', -this.inputTextElement.value.length);
            e = r.text.length;
        } else {
            s = this.inputTextElement.selectionStart;
            e = this.inputTextElement.selectionEnd;
        }
        return this.CursorPosition(s, e, r, this.inputTextElement.value);
    },

    moveCursorToPosition: function (keycode, cursorPosition) {
        var p = (!keycode || (keycode && keycode.isBackspace )) ? cursorPosition.start : cursorPosition.start + 1;
        if (this.inputTextElement.createTextRange) {
            cursorPosition.range.move('character', p);
            cursorPosition.range.select();
        } else {
            this.inputTextElement.selectionStart = p;
            this.inputTextElement.selectionEnd = p;
        }
    },

    injectValue: function (keycode, cursorPosition) {
        if (!keycode.isDelete && keycode.unicode == cursorPosition.previousValue.charCodeAt(cursorPosition.start))
            return true;
        var key;
        if (!keycode.isDelete && !keycode.isBackspace) {
            key = this.getValidatedKey(keycode, cursorPosition);
        } else {
            if (cursorPosition.start == cursorPosition.end) {
                key = '_';
                if (keycode.isBackspace) {
                    cursorPosition.dec();
                }
            } else {
                key = this.viewMask.substring(cursorPosition.start, cursorPosition.end);
            }
        }
        if (key) {
            this.inputTextElement.value = cursorPosition.previousValue.substring(0, cursorPosition.start)
            + key +
            cursorPosition.previousValue.substring(cursorPosition.start + key.length, cursorPosition.previousValue.length);
            return true;
        }
        return false;
    },

    getKeyCode: function (onKeyDownEvent, type) {
        var keycode = {};
        keycode.unicode = onKeyDownEvent.getKey();
        keycode.isShiftPressed = onKeyDownEvent.shiftKey;

        keycode.isDelete = ((onKeyDownEvent.getKey() == Ext.EventObject.DELETE && type == 'keydown') || ( type == 'keypress' && onKeyDownEvent.charCode === 0 && onKeyDownEvent.keyCode == Ext.EventObject.DELETE)) ? true : false;
        keycode.isTab = (onKeyDownEvent.getKey() == Ext.EventObject.TAB) ? true : false;
        keycode.isBackspace = (onKeyDownEvent.getKey() == Ext.EventObject.BACKSPACE) ? true : false;
        keycode.isLeftOrRightArrow = (onKeyDownEvent.getKey() == Ext.EventObject.LEFT || onKeyDownEvent.getKey() == Ext.EventObject.RIGHT) ? true : false;
        keycode.pressedKey = String.fromCharCode(keycode.unicode);
        return (keycode);
    },

    CursorPosition: function (start, end, range, previousValue) {
        var cursorPosition = {};
        cursorPosition.start = isNaN(start) ? 0 : start;
        cursorPosition.end = isNaN(end) ? 0 : end;
        cursorPosition.range = range;
        cursorPosition.previousValue = previousValue;
        cursorPosition.inc = function () {
            cursorPosition.start++;
            cursorPosition.end++;
        };
        cursorPosition.dec = function () {
            cursorPosition.start--;
            cursorPosition.end--;
        };
        return (cursorPosition);
    },

    // * при фокусе курсор в начало
    focusStart: function (field, e) {
        setTimeout(function () {
            field.selectText(0, 0);
        }, 10);

        if (e && e.isEvent) {
            e.preventDefault();
        }
    },

    validateSymbol: function (symbol, cursorPosition) {
        var maskKey = this.maskArray[cursorPosition.start];
        if (maskKey == '9') {
            return symbol.match(/[0-9]/);
        } else if (maskKey == '0') {
            return symbol.match(/[0-9 ]/);
        } else if (maskKey == 'L') {
            return (symbol.match(/[A-Za-z]/)) ? symbol.toUpperCase() : null;
        } else if (maskKey == 'l') {
            return (symbol.match(/[A-Za-z]/)) ? symbol.toLowerCase() : null;
        } else if (maskKey == 'A') {
            return symbol.match(/[A-Za-z0-9]/);
        } else if (maskKey == 'Б') {
            return symbol.match(/[А-Я]/);
        } else if (maskKey == 'R') {
            return symbol.match(/[IVXLC]/);
        } else if (maskKey == 'S') {
            return symbol.match(/[A-Za-zА-Яа-я0-9 ]/);
        } else if (maskKey) {
            return (symbol.match(new RegExp(maskKey)));
        }
        return (null);
    },

    applyMaskToString: function (str) {
        var i = 0;
        var maskKey, symbol;
        while (i < str.length) {
            maskKey = this.maskArray[i];
            symbol = str[i];
            if (maskKey == '9') {
                symbol.match(/[0-9]/) ? null : str = str.replaceAt(i, "_");
            } else if (maskKey == '0') {
                symbol.match(/[0-9 ]/) ? null : str = str.replaceAt(i, " ");
            } else if (maskKey == 'Б') {
                symbol.match(/[А-Я]/) ? null : str = str.replaceAt(i, "_");
            } else if (maskKey == 'R') {
                symbol.match(/[IVXLC]/) ? null : str = str.replaceAt(i, "_");
            } else if (maskKey == 'S') {
                symbol.match(/[A-Za-zА-Яа-я0-9 ]/) ? null : str = str.replaceAt(i, " ");
            }

            i++;
        }
        str = str.trim();
        return str;
    },

    applyFormatToString: function (str) {
        var i = 0;
        var maskKey, symbol;
        while (i < Util.count(this.maskArray)) {
            maskKey = this.maskArray[i];

            if (str.length - 1 < i) {
                if (this.maskArray[i] == ' ') {
                    str = str + ' ';
                } else {
                    str = str + '_';
                }
            }

            symbol = str[i];
            if (maskKey == '9') {
                symbol.match(/[0-9]/) ? null : str = str.replaceAt(i, "_");
            } else if (maskKey == '0') {
                symbol.match(/[0-9 ]/) ? null : str = str.replaceAt(i, " ");
            } else if (maskKey == 'Б') {
                symbol.match(/[А-Я]/) ? null : str = str.replaceAt(i, "_");
            } else if (maskKey == 'R') {
                symbol.match(/[IVXLC]/) ? null : str = str.replaceAt(i, "_");
            } else if (maskKey == 'S') {
                symbol.match(/[A-Za-zА-Яа-я0-9]/) ? null : str = str.replaceAt(i, "_");
            } else if (maskKey == ' ') {
                if (!symbol.match(/ /)) {
                    str = str.substr(0, i) + ' ' + str.substr(i);
                    continue;
                }
            }

            i++;
        }
        str = str.substr(0, i).trim();
        return str;
    },

    validateSting: function (str) {
        var i = 0;
        var symbol;

        str = str.substr(0, Util.count(this.maskArray));

        while (i < str.length) {
            if(str[i] == '_'){
                symbol=' ';
            }else{
                symbol = str[i];
            }

            if (!this.validateSymbol(symbol, {start:i}))
                return false;

            i++;
        }
        return true;
    },

    // * добавляет подсказку к полю
    addTooltip: function (field) {
        var fieldId = field.getItemId(),
            tipId = 'tip_' + fieldId,
            mask = field._mask,
            field_tip = Ext.ComponentQuery.query('#' + tipId)[0];
        if (mask) {
            field._tooltip = 'Формат: ' + mask;

            if (!field_tip) {
                var tip = Ext.create('Ext.tip.ToolTip', {
                    target: field.el,
                    anchor: 'top',
                    trackMouse: false,
                    itemId:  tipId,
                    closeAction: 'destroy',
                    html: field._tooltip
                });
            } else {
                field_tip.update(field._tooltip);
            }
        } else {
            field._tooltip = '';

            if (field_tip)
                field_tip.close();
        }
    }
});

Ext.applyIf(RegExp, {
    escape: function (str) {
        return new String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }
});