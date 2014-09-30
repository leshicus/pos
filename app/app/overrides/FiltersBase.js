Ext.define('Office.overrides.FiltersBase', {
    override: 'Ext.grid.filters.filter.Base',
    setActive: function (active) {
        var me = this,
            owner = me.owner,
            menuItem = owner.activeFilterMenuItem,
            filterCollection,
            grid = menuItem.up('grid'),
            tree = menuItem.up('treepanel');

        if (grid){
            if (me.active !== active) {
                me.active = active;

                filterCollection = me.getStore().getFilters();

                filterCollection.beginUpdate();
                if (active) {
                    me.activate();
                } else {
                    me.deactivate();
                }

                filterCollection.endUpdate();

                // Make sure we update the 'Filters' menu item.
                if (menuItem && menuItem.activeFilter === me) {
                    menuItem.setChecked(active);
                }

                me.column[active ? 'addCls' : 'removeCls'](owner.filterCls);

                // TODO: fire activate/deactivate
            }
        }else if (tree){
            console.log('tree');
        }

    }
});