var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var index = 0;
var controlManger;
var songList;
// var controlManger;
var audio= new root.audioControl();
function bindEvent(){
    
    $scope.on("play:change",function(event,index){
        audio.getAudio(songList[index].audio);
        if(audio.status == "play"){
            audio.play();
        }
        root.pro.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        
    })
    $scope.on("click",".prev-btn",function(){ 
        var index = controlManger.prev();
        root.pro.start(0);
        $scope.trigger("play:change",index)
        
    })
    $scope.on("click",".next-btn",function(){
        var index = controlManger.next(); 
        if(audio.status == "play"){
            root.pro.start(0);
        }else{
            root.pro.update(0);
        }
        
        $scope.trigger("play:change",index);
    })
    $scope.on("click",".play-btn",function(){
        if(audio.status == "play"){
            audio.pause();
            root.pro.stop();
        }else{
            audio.play();
            root.pro.start();
        }
        $(this).toggleClass("pause");
    })
    // $scope.on("click",".like-btn",function(){
    //     $(this).toggleClass("liking");
    // })
}
function bindTouch(){
    var $slider = $scope.find('.slider-pointer');
    var offset = $scope.find('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on('touchstart',function(){
        root.pro.stop();
    }).on('touchmove',function(e){
        
        var x = e.changedTouches[0].clientX;
        var per = (x-left)/width;
        if(per>0&&per<=1){
            root.pro.update(per);
        }
      
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x-left)/width;
        if(per>0&&per<=1){
            var curTime = per*songList[controlManger.index].duration;
           audio.playTo(curTime);
           $scope.find('.play-btn').addClass('pause');
           root.pro.start(per);
        }
    })
}
function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            root.render(data[0]);
            songList = data;
            bindEvent();
            bindTouch();
            controlManger = new root.controlManger(data.length);
            
            $scope.trigger('play:change',0);
            console.log(data)
        },
        error:function(){
            console.log('error');
        }
    })
}
getData("../mock/data.json");