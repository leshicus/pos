/**
 * Created with PhpStorm.
 * author: sdrucker
 * site: http://druckit.wordpress.com/2013/07/11/ext-js-4-preserving-state-on-the-server-2/
 */
Ext.define('Office.util.AjaxStorageProvider', {
    /* Begin Definitions */
    requires: [
        'Ext.data.proxy.Ajax'
    ],
    extend : 'Ext.state.Provider',
    alias : 'state.ajaxstorage',

    config: {
        userId : null,
        url: "http://www.senchatraining.com/ftextjs4/webservices/stateprovider.cfc",
        timeout: 100000
    },

    constructor : function(config) {
        this.initConfig(config);
        var me = this;

        me.restoreState();
        me.callParent(arguments);
    },
    set : function(name, value) {
        var me = this;

        if( typeof value == "undefined" || value === null) {
            me.clear(name);
            return;
        }
        me.persist(name, value);
        me.callParent(arguments);
    },
    // private
    restoreState : function() {
        var me = this;
        Ext.Ajax.request({
            url : this.getUrl(),
            params : {
                userId : this.getUserId(),
                method : 'get'
            },
            disableCaching : true,
            success : function(results) {
                var res = Ext.decode(results.responseText);
                //console.log(this);
                for(var i in res) {
                    this.state[i] = this.decodeValue(res[i]);
                    //console.log(this.decodeValue(res[i]));
                }
            },
            failure : function() {
                console.log('failed', arguments);
            },
            scope : this
        });
    },
    // private
    clear : function(name) {
        this.clearKey(name);
        this.callParent(arguments);
    },
    // private
    persist : function(name, value) {
        var me = this;
        Ext.Ajax.request({
            url : this.getUrl(),
            params : {
                userId : this.getUserId(),
                method : 'save',
                name : name,
                value : me.encodeValue(value)
            },
            disableCaching : true,
            success : function() {
                // console.log('success');
            },
            failure : function() {
                console.log('failed', arguments);
            }
        });
    },
    // private
    clearKey : function(name) {
        Ext.Ajax.request({
            url : this.getUrl(),
            params : {
                userId : this.getUserId(),
                method : 'clear',
                name : name
            },
            disableCaching : true,
            success : function() {
                console.log('success');
            },
            failure : function() {
                console.log('failed', arguments);
            }
        });
    }
});