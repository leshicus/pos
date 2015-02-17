/**
 * при forceSelection значение пропадает из комбика
 */

Ext.define('Office.overrides.Combo',{
    override : 'Ext.form.field.ComboBox',
    getValue: function() {
        // If the user has not changed the raw field value since a value was selected from the list,
        // then return the structured value from the selection. If the raw field value is different
        // than what would be displayed due to selection, return that raw value.
        var me = this,
            picker = me.picker,
            rawValue = me.getRawValue(), //current value of text field
            value = me.value; //stored value from last selection or setValue() call

        if (me.getDisplayValue() !== rawValue) {
            me.displayTplData = undefined;
            if (picker) {
                // We do not need to hear about this clearing out of the value collection,
                // so suspend events.
                me.valueCollection.suspendEvents();
                picker.getSelectionModel().deselectAll();
                me.valueCollection.resumeEvents();
            }
            // If the raw input value gets out of sync in a multiple ComboBox, then we have to give up.
            // Multiple is not designed for typing *and* displaying the comma separated result of selection.
            // Same in the case of forceSelection.
            if (me.multiSelect || (me.forceSelection && me.queryMode == 'local')) { // * тут замена
                value = me.value = undefined;
            } else {
                value = me.value = rawValue;
            }
        }

        // Return null if value is undefined/null, not falsy.
        me.value = value == null ? null : value;
        return me.value;
    }
});