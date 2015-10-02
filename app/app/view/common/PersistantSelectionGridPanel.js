Ext.define('Office.view.common.PersistantSelectionGridPanel', {
    extend: 'Ext.grid.Panel',
    selectedRecords: [],
    initComponent: function() {
        this.callParent(arguments);
console.info(this.getBind());
        this.getBind().store.on('beforeload', this.rememberSelection, this);
       // this.getView().on('refresh', this.refreshSelection, this);
        this.getBind().store.on('datachanged', this.refreshSelection, this);
    },
    rememberSelection: function(selModel, selectedRecords) {
        console.info('rememberSelection');
        if (!this.rendered || Ext.isEmpty(this.el)) {
            return;
        }

        this.selectedRecords = this.getSelectionModel().getSelection();
        this.getView().saveScrollState();
    },
    refreshSelection: function() {
        console.info('refreshSelection');
        if (0 >= this.selectedRecords.length) {
            return;
        }

        var newRecordsToSelect = [];
        for (var i = 0; i < this.selectedRecords.length; i++) {
            record = this.getStore().getById(this.selectedRecords[i].getId());
            if (!Ext.isEmpty(record)) {
                newRecordsToSelect.push(record);
            }
        }

        this.getSelectionModel().select(newRecordsToSelect);
        Ext.defer(this.setScrollTop, 30, this, [this.getView().scrollState.top]);
    }
});