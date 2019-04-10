import React from 'react';


export const TweenButton = ({img}) =>

    createjs.CSSPlugin.install(createjs.Tween);

var w = window.innerWidth, h = window.innerHeight;
var ball = document.createElement("div");
ball.className = "ball";
document.body.appendChild(ball);

// we need to set the initial values for styles we're going to tween in order to indicate the units ("px" in this case):
ball.style.left = w * 0.1 + "px";
ball.style.top = h * 0.1 + "px";

createjs.Tween.get(ball, {loop: -1})
    .to({top: h - 110}, 1500, createjs.Ease.bounceOut);

// we'll use a second tween so that we can apply a different ease at the same time:
createjs.Tween.get(ball, {loop: -1})
    .to({left: w * 0.9 - 100}, 1500, createjs.Ease.getPowOut(1.5));

createjs.Ticker.timingMode = createjs.Ticker.RAF;

<div className=''>


</div>;


// function init() {
//     createjs.CSSPlugin.install(createjs.Tween);
//
//     var w = window.innerWidth, h = window.innerHeight;
//     var ball = document.createElement("div");
//     ball.className = "ball";
//     document.body.appendChild(ball);
//
//     // we need to set the initial values for styles we're going to tween in order to indicate the units ("px" in this case):
//     ball.style.left = w * 0.1 + "px";
//     ball.style.top = h * 0.1 + "px";
//
//     createjs.Tween.get(ball, {loop: -1})
//         .to({top: h - 110}, 1500, createjs.Ease.bounceOut);
//
//     // we'll use a second tween so that we can apply a different ease at the same time:
//     createjs.Tween.get(ball, {loop: -1})
//         .to({left: w * 0.9 - 100}, 1500, createjs.Ease.getPowOut(1.5));
//
//     createjs.Ticker.timingMode = createjs.Ticker.RAF;
// }