/** Для GridEventLiveC::onAddFilter
 * Cannot read property 'get' of undefined :208 (в 5.1.2 пофиксили- убрать)
 */

Ext.define('Office.overrides.LocalStore',{
    override : 'Ext.data.LocalStore',
    getByInternalId: function(internalId) {
        var data = this.getData(),
            keyCfg;

        // Defer the creation until we need it
       // if (!this.hasInternalKeys) {
            keyCfg = {
                byInternalId: {
                    property: 'internalId',
                    rootProperty: ''
                }
            };
            this.hasInternalKeys = true;
        //}

        if (data.filtered) {
            if (keyCfg) {
                data.setExtraKeys(keyCfg);
            }
            data = data.getSource();
        }

        if (keyCfg) {
            data.setExtraKeys(keyCfg);
        }

        return data.byInternalId.get(internalId) || null;
    }
});