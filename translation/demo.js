
var flag = 1;
$(document).scroll(function(){
    if(flag == 0){
        flag = 1;//抢占flag
        //...
        $.ajax({
            //... 其他参数
            success: function(msg){
                //...已经成功完成了 dom操作
                flag = 0;//释放flag资源
            }
        })
    }
});