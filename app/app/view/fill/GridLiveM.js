Ext.define('Office.view.fill.GridLiveM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore'
    ],
    alias: 'viewmodel.gridlive',
    // * сначала данные загружаются в rawdata, потом в sourceJson, потом в line
    stores: {
        /* сырые данные от апи */
        rawdata: {
            fields: [], // * без этой строчки ругается на стор без модели и на schema
            proxy: {
                type: 'ajax',
                url: Ext.util.Format.format(Server.getFillEvent(), '{type}', '{locale}'),
                reader: {
                    type: 'json',
                    rootProperty:'tournaments',
                    totalProperty:'line_version'
                }
            },
            storeId: 'rawdata',
            autoLoad:true,
            listeners: {
                load: 'loadRawData'
            }
        },
        /* подготовленные данные для дерева */
        line: {
            type: 'tree',
            fields: [], // * без этой строчки ругается на стор без модели и на schema
            proxy: {
                type: 'memory',
                data: '{sourceJson}',
                reader: {
                    type: 'json'
                }
            },
            root: {
                expanded: true
            },
            storeId: 'line'
        }
    },
    data: {
        // * промежуточное хранилище данных, отсюда берет информацию live. Запоняется в loadLiveRaw
        sourceJson: {}
    }
});
