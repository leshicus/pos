Ext.define('Office.overrides.Table', {
    override : 'Ext.panel.Table',

    hasLockedColumns: function(columns) {
        var i,
            len,
            column;
        // Fully instantiated HeaderContainer
        if (columns.isRootHeader) {
            columns = columns.items.items;
        }
        // Config object with items
        else if (Ext.isObject(columns)) {
            columns = columns.items;
        }
        /*for (i = 0, len = columns.length; i < len; i++) {
            column = columns[i];
            if (!column.processed && column.locked) {
                return true;
            }
        }*/
    }
});