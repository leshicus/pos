// * лечит грид, который после рефреша имеет отступ сверху при скроллинге
// * https://www.sencha.com/forum/showthread.php?297553-BUG-in-quot-Grid-with-Filtered-and-Buffered-Store-quot-ExtJS-5.1.0
Ext.define('Office.overrides.BufferedRenderer', {
    override: 'Ext.grid.plugin.BufferedRenderer',
    onStoreClear: function() {
        var me = this,
            view = me.view;

        if (view.rendered && !me.store.isDestroyed) {
            me.bodyTop = me.scrollTop = me.position = me.scrollHeight = 0;
            if (me.scrollTop !== 0) {
                me.view.setScrollY(0);
            }
            me.lastScrollDirection = me.scrollOffset = null;


            if (!view.hasOwnProperty('rowHeight')) {
                delete me.rowHeight;
            }
        }
    },
    //refreshView: function(startIndex) {
    //    var me = this,
    //        rows = me.view.all,
    //        store = me.store,
    //        maxIndex = (store.isBufferedStore ? store.getTotalCount() : store.getCount()) - 1,
    //        endIndex;
    //
    //    startIndex = Math.max(0, Math.min(startIndex == null ? rows.startIndex : startIndex, maxIndex - (me.viewSize - me.leadingBufferZone) + 1));
    //
    //    endIndex = Math.min(startIndex + me.viewSize - 1, maxIndex);
    //
    //    store.getRange(startIndex, endIndex, {
    //        callback: me.doRefreshView,
    //        scope: me
    //    });
    //}
});