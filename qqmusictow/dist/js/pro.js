!function(n,e){var a,i,r,o=n(document.body),m=0;function c(n){n=Math.round(n);var e=Math.floor(n/60),t=n-60*e;return e<10&&(e="0"+e),t<10&&(t="0"+t),e+":"+t}function l(n){var e=a*n;e=c(e),o.find(".cur-time").html(e);var t=100*(n-1)+"%";o.find(".pro-top").css({transform:"translateX("+t+")"})}e.pro={renderAllTime:function(n){m=0,n=c(a=n),o.find(".all-time").html(n)},start:function(n){cancelAnimationFrame(i),m=null==n?m:n,r=(new Date).getTime(),function n(){var e=(new Date).getTime(),t=m+(e-r)/(1e3*a);t<1?(l(t),i=requestAnimationFrame(n)):cancelAnimationFrame(i)}()},stop:function(){cancelAnimationFrame(i);var n=(new Date).getTime();m+=(n-r)/(1e3*a)},update:l}}(window.Zepto,window.player||(window.player={}));