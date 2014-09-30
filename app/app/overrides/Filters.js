Ext.define('Office.overrides.Filters', {
    override: 'Ext.grid.filters.Filters',
    onMenuBeforeShow: function (menu) {
        var me = this,
            menuItem, filter, ownerGrid, ownerGridId;

        if (me.showMenu) {
            // In the case of a locked grid, we need to cache the 'Filters' menuItem for each grid since
            // there's only one Filters instance. Both grids/menus can't share the same menuItem!
            if (!me.menuItems) {
                me.menuItems = {};
            }

            // Don't get the owner grid if in a locking grid since we need to get the unique menuItems key.
            ownerGrid = menu.up('grid') || menu.up('treepanel');
            ownerGridId = ownerGrid.id;

            menuItem = me.menuItems[ownerGridId];

            if (!menuItem || menuItem.isDestroyed) {
                menuItem = me.createMenuItem(menu, ownerGridId);
            }

            me.activeFilterMenuItem = menuItem;

            filter = me.getMenuFilter(ownerGrid.headerCt);
            if (filter) {
                filter.showMenu(menuItem);
            }

            menuItem.setVisible(!!filter);
            me.sep.setVisible(!!filter);
        }
    },
    onCheckChange: function (item, value) {
        console.log('onCheckChange');
        // Locking grids must lookup the correct grid.
        var _item = item.up('grid') || item.up('treepanel'),
            grid = this.isLocked ? _item : this.grid,
            filter = this.getMenuFilter(grid.headerCt);
        console.log(filter, value);
        filter.setActive(value);
    },
    clearFilters: function (autoFilter) {
        var grid = this.grid,
            columns = grid.columnManager.getColumns(),
            store = grid.store,
            oldAutoFilter = store.getAutoFilter(),
            column, filter, i, len, filterCollection;

        if (autoFilter !== undefined) {
            store.setAutoFilter(autoFilter);
        }

        // We start with filters defined on any columns.
        for (i = 0, len = columns.length; i < len; i++) {
            column = columns[i];
            filter = column.filter;

            if (filter && filter.isGridFilter) {
                if (!filterCollection) {
                    filterCollection = store.getFilters();
                    filterCollection.beginUpdate();
                }

                filter.setActive(false);
            }
        }

        if (filterCollection) {
            filterCollection.endUpdate();
        }

        if (autoFilter !== undefined) {
            store.setAutoFilter(oldAutoFilter);
        }

        store.clearFilter(true);
    }
});