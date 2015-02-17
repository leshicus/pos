Ext.define('Office.overrides.TreeStore', {
    override: 'Ext.data.TreeStore',
    /*load:function (options) {
        options = options || {};
        options.params = options.params || {};
        var me = this,
            node = options.node || me.tree.getRootNode(),
            root;
        if (!node) {
            node = me.setRootNode({
                expanded: true
            }, true);
        }
        if (me.clearOnLoad) {
            if(me.clearRemovedOnLoad) {
                me.clearRemoved(node);
            }
            me.tree.un('remove', me.onNodeRemove, me);
            node.removeAll(false);
            me.tree.on('remove', me.onNodeRemove, me);
        }
        Ext.applyIf(options, {
            node: node
        });
        options.params[me.proxy.limitParam]=options[me.proxy.limitParam]||me.pageSize
        options.params[me.proxy.pageParam]=options[me.proxy.pageParam]||me.currentPage
        options.params[me.nodeParam] = node ? node.getId() : 'root';
        if (node) {
            node.set('loading', true);
        }
        return me.callParent([options]);
    },*/
    load: function(options) {
        options = options || {};
        options.params = options.params || {};

        var me = this,
            node = options.node || me.getRoot(),
            proxy = me.getProxy(),
            callback = options.callback,
            scope = options.scope,
            operation;
        options.params[me.proxy.limitParam]=options[me.proxy.limitParam]||me.pageSize
        options.params[me.proxy.pageParam]=options[me.proxy.pageParam]||me.currentPage
        options.params[me.nodeParam] = node ? node.getId() : 'root';
        // If there is not a node it means the user hasn't defined a root node yet. In this case let's just
        // create one for them. The expanded: true will cause a load operation, so return.
        if (!node) {
            me.setRoot({
                expanded: true
            });
            return;
        }

        // If the node we are loading was expanded, we have to expand it after the load
        if (node.data.expanded) {
            node.data.loaded = false;

            // Must set expanded to false otherwise the onProxyLoad->fillNode->appendChild calls will update the view.
            // We ned to update the view in the callback below.
            if (me.clearOnLoad) {
                node.data.expanded = false;
            }
            options.callback = function() {

                // If newly loaded nodes are to be added to the existing child node set, then we have to collapse
                // first so that they get removed from the NodeStore, and the subsequent expand will reveal the
                // newly augmented child node set.
                if (!me.clearOnLoad) {
                    node.collapse();
                }
                node.expand();

                // Call the original callback (if any)
                Ext.callback(callback, scope, arguments);
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

        operation = proxy.createOperation('read', options);



        if (me.fireEvent('beforeload', me, operation) !== false) {

            // Set the loading flag early
            // Used by onNodeRemove to NOT add the removed nodes to the removed collection
            me.loading = true;
            if (me.clearOnLoad) {
                if (me.clearRemovedOnLoad) {
                    // clear from the removed array any nodes that were descendants of the node being reloaded so that they do not get saved on next sync.
                    me.clearRemoved(node);
                }
                // remove all the nodes
                node.removeAll(false);
            }
            operation.execute();
        }

        if (me.loading && node) {
            node.set('loading', true);
        }

        return me;
    },
    /*onProxyLoad: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            successful = operation.wasSuccessful(),
            records = operation.getRecords(),
            node = operation.node;

        if(resultSet){
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
    },*/

    onProxyLoad: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),// *
            options = operation.initialConfig,
            successful = operation.wasSuccessful(),
            records = operation.getRecords(),
            node = options.node,
            scope = operation.getScope() || me,
            args = [records, operation, successful];

        if(resultSet){ // *
            me.totalCount = resultSet.total;
        }

        if (me.isDestroyed) {
            return;
        }

        me.loading = false;
        node.set('loading', false);
        if (successful) {
            if (!me.clearOnLoad) {
                records = me.cleanRecords(node, records);
            }

            // Nodes are in linear form, linked to the parent using a parentId property
            if (me.parentIdProperty) {
                records = me.treeify(node, records);
            }

            records = me.fillNode(node, records);
        }
        // The load event has an extra node parameter
        // (differing from the load event described in AbstractStore)
        /**
         * @event load
         * Fires whenever the store reads data from a remote data source.
         * @param {Ext.data.TreeStore} this
         * @param {Ext.data.TreeModel[]} records An array of records.
         * @param {Boolean} successful True if the operation was successful.
         * @param {Ext.data.Operation} operation The operation that triggered this load.
         * @param {Ext.data.NodeInterface} node The node that was loaded.
         */
        Ext.callback(options.onChildNodesAvailable, scope, args);
        me.fireEvent('load', me, records, successful, operation, node);
    },


    getTotalCount: function() {
        return this.totalCount
    },
//         pageSize:10,
    currentPage:1,
    loadPage: function(page, options) {
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
    nextPage: function(options) {
        this.loadPage(this.currentPage + 1, options);
    },
    previousPage: function(options) {
        this.loadPage(this.currentPage - 1, options);
    },
    initComponent:function(){
        var me = this;
        me.callOverridden(arguments);
    }
});