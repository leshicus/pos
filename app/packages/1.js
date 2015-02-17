if (storeGroup.isLoading() == false) {
    if (storeSubject.isLoading() == false) {
        storeGridStream.load({
            params: {
                studyid: Ext.ComponentQuery.query('#period')[0].getValue(),
                divid: Ext.ComponentQuery.query('#division')[0].getValue()
            }
        });
    }
}