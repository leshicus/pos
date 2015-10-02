Ext.define('User', {
    extend: 'Ext.data.Model',
    config:{
        fields: ['name','age','phone']
    },
    addField:function(field){
        var fields = this.getFields().items || [];
        var data = this.getData(); // preserve data
        fields.push(field);
        this.setFields( fields );
        this.setData( data );
    }
});




var user = Ext.create('User',{name:'blue', age:35, phone:'0723538xxx' } );


user.addField({name:'caffee', type:'string'});


user.set('caffee','Arabica');


console.log( user.get('caffee') );


console.log(user.getData() );