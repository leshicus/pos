/**
 * Created with PhpStorm.
 * http://www.sencha.com/forum/showthread.php?264228-Unwanted-data-qtip-attributes-on-gridpanel-rows
 */
// * убрать надоедливый tooltip в гриде
Ext.define('Office.overrides.TreeView', {
    override: 'Ext.tree.View',

    treeRowTpl: [
        '{%',
        'this.processRowValues(values);',
        'this.nextTpl.applyOut(values, out, parent);',
        '%}', {
            priority: 10,
            processRowValues: function(rowValues) {
                var record = rowValues.record,
                    view = rowValues.view;

                // We always need to set the qtip/qtitle, because they may have been
                // emptied, which means we still need to flush that change to the DOM
                // so the old values are overwritten
// * закомментил строчку ниже, чтобы убрать надоедливый tooltip в гриде
                //rowValues.rowAttr['data-qtip'] = record.get('qtip') || '';
                rowValues.rowAttr['data-qtitle'] = record.get('qtitle') || '';
                if (record.isExpanded()) {
                    rowValues.rowClasses.push(view.expandedCls);
                }
                if (record.isLeaf()) {
                    rowValues.rowClasses.push(view.leafCls);
                }
                if (record.isLoading()) {
                    rowValues.rowClasses.push(view.loadingCls);
                }
            }
        }
    ]
});
