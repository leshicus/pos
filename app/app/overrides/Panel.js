/**
 * Автоподбор ширин колонок таблицы в зависимости от контента (для property.Grid не работает- попробовать для обычного)
 * from: http://www.sencha.com/forum/showthread.php?157982-Grid-Panel-Autosizing-columns-to-fit-content
 */

Ext.define('Office.overrides.Panel',{
    override : 'Ext.grid.Panel',
    adjustColumnSizeAfterLoad:function(){
        if(this.forceFit)
            return;

        Ext.suspendLayouts();
        var tempVal = null;
        var columns = this.columns;
        var offset = 20;
        for(var i = 0; i <  columns.length; i++){
            var metrics = new Ext.util.TextMetrics(columns[i].getEl());
            var max = metrics.getWidth(columns[i].text) + offset ;
            var records = this.getStore().getRange();
            if(Ext.isDefined(records) && records.length > 0){
                metrics = new Ext.util.TextMetrics(this.getView().getCell( records[0],columns[i]));
                // var recordsLen = (records.length > 3 && Ext.isIE) ? 1 : records.length;
                for(var j = 0; j < records.length ; j++ ){
                    tempVal = records[j].get(columns[i].dataIndex);
                    if(Ext.isEmpty(tempVal))
                        continue;
                    if(Ext.isFunction(columns[i].renderer)){
                        tempVal = columns[i].renderer.apply(this,[tempVal,{},records[j],j,i,this.getStore()]);
                        // console.info(tempVal);
                    }

                    max = Math.max(max, metrics.getWidth(tempVal) + offset ) ;
                }
            }
            if(max > offset){
                columns[i].setWidth(max);
                console.info(columns[i],max);
            }
        }
        Ext.resumeLayouts();
        this.getView().refresh(true);
    }
});