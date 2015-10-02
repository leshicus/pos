Ext.define('Office.view.accept.GridAcceptM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore'
    ],
    alias: 'viewmodel.gridaccept',
    stores: {
        yesNo: {
            fields: ['id', 'name'],
            data: [
                [2, "нет"],
                [1, "да"],
            ]
        },
        accept: {
            type: 'tree',
            fields: [],
            pageSize: Util.ITEMS_PER_PAGE,
            idProperty: 'slip_id',
            storeId: 'accept', // * чтобы в контроллере можно было обращаться
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Bets_Office',
                    token: '{token}',
                    params: {
                        cbDateType: '{filters.cbDateType}',
                        cbDateFrom: '{get_cbDateFrom}',
                        cbTimeFrom: '{get_cbTimeFrom}',
                        cbDateTo: '{get_cbDateTo}',
                        cbTimeTo: '{get_cbTimeTo}',
                        cbStateSlip: '{filters.cbStateSlip}',
                        cbPaid: '{filters.cbPaid}',
                        cbIsLive: '{filters.cbIsLive}', // формула берет из модели значение
                        cbByBets: '{filters.cbByBets}',
                        cbSport: '{filters.cbSport}',
                        cbSlipId: '{filters.cbSlipId}',
                        placeName: 'office',
                        //page: '1'
                    }
                }),
                reader: {
                    type: 'json'
                }
            },
            root: {
                expanded: true,
                loaded: true // * нужно, чтобы реагировало на autoLoad: false, а иначе все равно грузит
            },
            autoLoad: false,
            // autoLoad: {start: 0, limit: Util.ITEMS_PER_PAGE},
            listeners: {
                load: 'showBalance',
                // * этот beforeload для: если быстро щелкнуть на Обовить, то одни и те же данные загружаются несколько раз
                beforeload: function (store, operation, eOpts) {
                    if(store.isLoading()) return false;
                }
            },

            // * пейджинг
            load: function (options) {
                options = options || {};
                options.params = options.params || {};
                var me = this,
                    node = options.node || me.getRoot(),
                    root;
                if (!node) {
                    me.setRoot({
                        expanded: true
                    });
                }
                if (me.clearOnLoad) {
                    if (me.clearRemovedOnLoad) {
                        me.clearRemoved(node);
                    }
                    if (me.ownerTree) {
                        me.ownerTree.bufferedRenderer.grid.un('remove', me.onNodeRemove, me);
                        node.removeAll(false);
                        me.ownerTree.bufferedRenderer.grid.on('remove', me.onNodeRemove, me);
                    }
                }
                Ext.applyIf(options, {
                    node: node
                });
                /*options.params[me.proxy.limitParam]=options[me.proxy.limitParam]||me.pageSize
                 options.params[me.proxy.pageParam]=options[me.proxy.pageParam]||me.currentPage
                 options.params[me.nodeParam] = node ? node.getId() : 'root';*/

                options = Ext.applyIf(options, {
                    limit: options[me.proxy.limitParam] || me.pageSize,
                    page: options[me.proxy.pageParam] || me.currentPage,
                    node: node ? node.getId() : 'root'
                });
                if (node) {
                    node.set('loading', true);
                }

                //return me.callParent([options]);
                var callback = options.callback,
                    scope = options.scope,
                    clearOnLoad = me.getClearOnLoad(),
                // If we are loading the root, and clearing on load, then it is a whole
                // store reload.
                // This is handled efficiently in onProxyLoad by firing the refresh event
                // which will completely refresh any dependent views as would be expected
                // from a reload() call.
                    isReload = node && node.isRoot() && node.isLoaded() && clearOnLoad,
                    operation, doClear;

                // If there is not a node it means the user hasn't defined a root node yet. In this case let's just
                // create one for them. The expanded: true will cause a load operation, so return.
                if (!node) {
                    me.setRoot({
                        expanded: true
                    });
                    return;
                }

                // If this is not a root reload.
                // If the node we are loading was expanded, we have to expand it after the load
                if (node.data.expanded && !isReload) {
                    node.data.loaded = false;

                    // Must set expanded to false otherwise the onProxyLoad->fillNode->appendChild calls will update the view.
                    // We ned to update the view in the callback below.
                    if (clearOnLoad) {
                        node.data.expanded = false;
                    }
                    options.callback = function (loadedNodes, operation, success) {

                        // If newly loaded nodes are to be added to the existing child node set, then we have to collapse
                        // first so that they get removed from the NodeStore, and the subsequent expand will reveal the
                        // newly augmented child node set.
                        if (!clearOnLoad) {
                            node.collapse();
                        }
                        node.expand();

                        // Call the original callback (if any)
                        Ext.callback(callback, scope, [loadedNodes, operation, success]);
                    };
                }

                // Assign the ID of the Operation so that a ServerProxy can set its idParam parameter,
                // or a REST proxy can create the correct URL
                options.id = node.getId();
                options = Ext.apply({
                    filters: me.getFilters().items,
                    sorters: me.getSorters().items,
                    node: options.node || node,
                    internalScope: me,
                    internalCallback: me.onProxyLoad
                }, options);
                me.lastOptions = Ext.apply({}, options);
                // Must not be copied into lastOptions, otherwise it overrides next call.
                options.isReload = isReload;
                operation = me.createOperation('read', options);

                if (me.fireEvent('beforeload', me, operation) !== false) {

                    // Set the loading flag early
                    // Used by onNodeRemove to NOT add the removed nodes to the removed collection
                    me.loading = true;
                    me.clearLoadTask();

                    // If this is a full root reload, clear the root node and the flat data.
                    if (isReload) {
                        if (me.getClearRemovedOnLoad()) {
                            me.removedNodes.length = 0;
                        }
                        me.unregisterNode(node, true);
                        node.childNodes.length = 0;
                        doClear = true;
                    }
                    // If clear node on load, remove its children
                    else if (clearOnLoad) {
                        if (me.getTrackRemoved() && me.getClearRemovedOnLoad()) {
                            // clear from the removed array any nodes that were descendants of the node being reloaded so that they do not get saved on next sync.
                            me.clearRemoved(node);
                        }
                        node.removeAll(false);
                    }

                    if (me.loading && node) {
                        node.set('loading', true);
                    }
                    if (doClear) {
                        me.clearData(true);
                        // Readd the root we just cleared, since we're reloading it
                        if (me.getRootVisible()) {
                            me.suspendEvents();
                            me.add(node);
                            me.resumeEvents();
                        }
                    }

                    operation.execute();
                }

                return me;
            },
            onProxyLoad: function (operation) {
                var me = this,
                    resultSet = operation.getResultSet(),
                    successful = operation.wasSuccessful(),
                    records = operation.getRecords(),
                    node = operation.node;

                if (resultSet) {
                    me.totalCount = resultSet.total;
                }

                me.loading = false;
                node.set('loading', false);
                if (successful) {
                    records = me.fillNode(node, records);
                }
                // deprecate read?
                me.fireEvent('read', me, operation.node, records, successful);
                me.fireEvent('load', me, operation.node, records, successful);
                //this is a callback that would have been passed to the 'read' function and is optional
                Ext.callback(operation.callback, operation.scope || me, [records, operation, successful]);
            },

            getTotalCount: function () {
                return this.totalCount
            },
            currentPage: 1,
            loadPage: function (page, options) {
                var me = this;
                options = Ext.apply({}, options);
                me.currentPage = page;
                me.read(Ext.applyIf(options, {
                    page: page,
                    start: (page - 1) * me.pageSize,
                    limit: me.pageSize,
                    addRecords: !me.clearOnPageLoad
                }));
            },
            nextPage: function (options) {
                this.loadPage(this.currentPage + 1, options);
            },
            previousPage: function (options) {
                this.loadPage(this.currentPage - 1, options);
            },
            initComponent: function () {
                var me = this;
                me.callOverridden(arguments);
            }
        },
        result: {
            fields: [
                'id', 'value', 'checked'
            ],
            storeId: 'result',
            proxy: {
                type: 'ajax',
                //url: Ext.util.Format.format(Server.getFilterSlipState(), '{token}'),
                url: Server.getUrl({
                    class: 'Pos_Filters_Slipstate',
                    token: '{token}',
                    params: {
                        mode: 'office'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'slipstatefilter.types'
                }
            },
            pageSize: Util.pageSize,
            autoLoad: false
        },
        sport: {
            fields: ['id', 'value', 'checked', 'iconCls'],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Filters_Sport',
                    token: '{token}',
                    params: {
                        mode: 'office'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'sportfilter.types'
                }
            },
            storeId: 'sport',
            autoLoad: false
        },
        // * когда 2, тогда показываются и удаленные, со статусом -1
        paid: {
            fields: ['id', 'name'],
            data: [
                ['0', "[Все]"],
                ['1', "да"],
                ['2', "нет"]
            ]
        },
        live: {
            fields: ['id', 'name'],
            data: [
                ['-1', "[Все]"],
                ['0', "предматч"],
                ['1', "лайв"],
            ]
        },
        //basket_localstorage: {
        //    fields: ['id', 'query'],
        //    extend: 'Ext.data.Model',
        //    autoLoad: true,
        //    autoSync: true,
        //    proxy: {
        //        type: 'localstorage',
        //        id: 'newpos_basket'
        //    }
        //}
    },
    // * формулы берут из модели значение
    formulas: {
        get_cbIsLive: function (get) {
            if (get('cbIsLive_model') && !get('cbIsLive_model').phantom)
                return get('cbIsLive_model').get('id');
            else
                return '';
        },
        get_cbStateSlip: function (get) {
            if (get('cbStateSlip_model') && !get('cbStateSlip_model').phantom)
                return get('cbStateSlip_model').get('id');
            else
                return '';
        },
        get_cbPaid: function (get) {
            if (get('cbPaid_model') && !get('cbPaid_model').phantom)
                return get('cbPaid_model').get('id');
            else
                return '';
        },
        get_cbSport: function (get) {
            if (get('cbSport_model') && !get('cbSport_model').phantom)
                return get('cbSport_model').get('id');
            else
                return '';
        },
        get_cbDateFrom: function (get) {
            if (get('filters.cbDateType') == '0')
                return Ext.Date.format(get('filters.cbDateFromMade'), 'Y-m-d');
            else
                return Ext.Date.format(get('filters.cbDateFromCalc'), 'Y-m-d');
        },
        get_cbTimeFrom: function (get) {
            if (get('filters.cbDateType') == '0')
                return Ext.Date.format(get('filters.cbTimeFromMade'), 'H:i:s');
            else
                return Ext.Date.format(get('filters.cbTimeFromCalc'), 'H:i:s');
        },
        get_cbDateTo: function (get) {
            if (get('filters.cbDateType') == '0')
                return Ext.Date.format(get('filters.cbDateToMade'), 'Y-m-d');
            else
                return Ext.Date.format(get('filters.cbDateToCalc'), 'Y-m-d');
        },
        get_cbTimeTo: function (get) {
            if (get('filters.cbDateType') == '0')
                return Ext.Date.format(get('filters.cbTimeToMade'), 'H:i:s');
            else
                return Ext.Date.format(get('filters.cbTimeToCalc'), 'H:i:s');
        }
    }
});
