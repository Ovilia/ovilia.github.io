/*!
/**
 * Monkey patch jQuery 1.3.1+ to add support for setting or animating CSS
 * scale and rotation independently.
 * https://github.com/zachstronaut/jquery-animate-css-rotate-scale
 * Released under dual MIT/GPL license just like jQuery.
 * 2009-2012 Zachary Johnson www.zachstronaut.com
 */
(function(e){function t(e){var t=e.data("_ARS_data");if(!t){t={rotateUnits:"deg",scale:1,rotate:0};e.data("_ARS_data",t)}return t}function n(e,t){e.css("transform","rotate("+t.rotate+t.rotateUnits+") scale("+t.scale+","+t.scale+")")}e.fn.rotate=function(r){var i=e(this),s,o=t(i);if(typeof r=="undefined"){return o.rotate+o.rotateUnits}s=r.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);if(s){if(s[3]){o.rotateUnits=s[3]}o.rotate=s[1];n(i,o)}return this};e.fn.scale=function(r){var i=e(this),s=t(i);if(typeof r=="undefined"){return s.scale}s.scale=r;n(i,s);return this};var r=e.fx.prototype.cur;e.fx.prototype.cur=function(){if(this.prop=="rotate"){return parseFloat(e(this.elem).rotate())}else if(this.prop=="scale"){return parseFloat(e(this.elem).scale())}return r.apply(this,arguments)};e.fx.step.rotate=function(n){var r=t(e(n.elem));e(n.elem).rotate(n.now+r.rotateUnits)};e.fx.step.scale=function(t){e(t.elem).scale(t.now)};var i=e.fn.animate;e.fn.animate=function(n){if(typeof n["rotate"]!="undefined"){var r,s,o=n["rotate"].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);if(o&&o[5]){r=e(this);s=t(r);s.rotateUnits=o[5]}n["rotate"]=o[1]}return i.apply(this,arguments)}})(jQuery)
 