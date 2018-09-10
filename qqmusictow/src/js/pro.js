//进度条模块
(function($,root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var startTime,lastPer = 0;
    //渲染每一首歌的总时间 durastion
    function renderAllTime(time){
        lastPer = 0;
        curDuration = time;
        //将时间格式进行转换
        time = formaTime(time);
        $scope.find(".all-time").html(time);
    }
    //将时间格式进行转换 253--》4：13
    function formaTime(t){
        t = Math.round(t);
        var m = Math.floor(t/60);
        var s = t - m*60;
        if(m<10){
            m = "0"+m;
        }
        if(s<10){
            s="0"+s;
        }
        return m+":"+s;
    }
    function start(p){
        cancelAnimationFrame(frameId);
        lastPer = p == undefined ? lastPer:p;
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastPer+ (curTime - startTime)/(curDuration*1000);
            if(percent<1){
                update(percent);
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId);
            }
            
        }
        frame();
    }
    function stop(){
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer+(stopTime - startTime)/(curDuration*1000);
    }
    //更新区域-->左侧时间+进度条运动
    function update(per){
        var curTime = curDuration*per;
        curTime = formaTime(curTime);
        $scope.find(".cur-time").html(curTime);
        var perX = (per -1)*100+"%";
        $scope.find('.pro-top').css({
            transform:'translateX('+perX+')'
        })
    }
    root.pro = {
        renderAllTime:renderAllTime,
        start:start,
        stop:stop,
        update:update
    }
})(window.Zepto,window.player||(window.player={}))