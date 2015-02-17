// * исправление комбо, нельзя нажать первую запись
Ext.define("Office.overrides.NavigationModel", {
    override: "Ext.view.NavigationModel",
    setPosition: function(recordIndex, keyEvent, suppressEvent, preventNavigation) {
        var me = this,
            view = me.view,
            selModel = view.getSelectionModel(),
            dataSource = view.dataSource,
            newRecord,
            newRecordIndex;

        if (recordIndex == null || !view.all.getCount()) {
            me.record = me.recordIndex = null;
        } else {
            if (typeof recordIndex === 'number') {
                newRecordIndex = Math.max(Math.min(recordIndex, dataSource.getCount() - 1), 0);
                newRecord = dataSource.getAt(recordIndex);
            }
            // row is a Record
            else if (recordIndex.isEntity) {
                newRecord = recordIndex;
                newRecordIndex = dataSource.indexOf(recordIndex);

                // Previous record is no longer present; revert to first.
                if (newRecordIndex === -1) {
                    newRecordIndex = dataSource.indexOfId(newRecord.id);
                    if (newRecordIndex === -1) {
                        // Change recordIndex so that the "No movement" test is bypassed if the record is not found
                        me.recordIndex = -1;
                        newRecord = dataSource.getAt(0);
                        newRecordIndex = 0;
                    }
                    else {
                        newRecord = dataSource.getAt(newRecordIndex);
                    }
                }
            }
            // row is a grid row
            else if (recordIndex.tagName) {
                newRecord = view.getRecord(recordIndex);
                newRecordIndex = dataSource.indexOf(newRecord);
            }
            else {
                newRecord = newRecordIndex = null;
            }
        }
//Override http://www.sencha.com/forum/showthread.php?291487-Combobox-Bug-in-5.0.2.1323-Can-t-select-record-from-dropdown&p=1078709#post1078709
        // No movement; just ensure the correct item is focused and return early.
        // Do not push current position into previous position, do not fire events.
        if (newRecordIndex === me.recordIndex && newRecord === me.record) {
            return;
        }

        if (me.item) {
            me.item.removeCls(me.focusCls);
        }

        // Track the last position.
        // Used by SelectionModels as the navigation "from" position.
        me.previousRecordIndex = me.recordIndex;
        me.previousRecord = me.record;
        me.previousItem = me.item;

        // Update our position
        me.recordIndex = newRecordIndex;
        me.record      = newRecord;

        // Prevent navigation if focus has not moved
        preventNavigation = preventNavigation || me.record !== me.lastFocused;

        // Maintain lastFocused, so that on non-specific focus of the View, we can focus the correct descendant.
        if (newRecord) {
            me.focusPosition(me.recordIndex);
        } else {
            me.item = null;
        }

        if (!suppressEvent) {
            selModel.fireEvent('focuschange', selModel, me.previousRecord, me.record);
        }

        // If we have moved, fire an event
        if (!preventNavigation && keyEvent) {
            me.fireNavigateEvent(keyEvent);
        }
    }
});