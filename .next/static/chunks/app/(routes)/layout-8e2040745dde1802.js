(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[717],{722:function(e,t,r){Promise.resolve().then(r.bind(r,1614)),Promise.resolve().then(r.t.bind(r,7402,23)),Promise.resolve().then(r.t.bind(r,7369,23))},9699:function(e,t,r){"use strict";var s,n,o,i,c,u;r.d(t,{$:function(){return l},Z:function(){return a}}),(i=s||(s={}))[i.Clubs=0]="Clubs",i[i.Spades=1]="Spades",i[i.Hearts=2]="Hearts",i[i.Diamonds=3]="Diamonds",i[i.Joker=4]="Joker",(c=n||(n={}))[c.Ace=0]="Ace",c[c.Two=1]="Two",c[c.Three=2]="Three",c[c.Four=3]="Four",c[c.Five=4]="Five",c[c.Six=5]="Six",c[c.Seven=6]="Seven",c[c.Eight=7]="Eight",c[c.Nine=8]="Nine",c[c.Ten=9]="Ten",c[c.Jack=10]="Jack",c[c.Queen=11]="Queen",c[c.King=12]="King",c[c.Joker=13]="Joker",(u=o||(o={}))[u.Regular=0]="Regular",u[u.Joker1=1]="Joker1",u[u.Joker2=2]="Joker2";class a{flip(){this.isFlipped=!this.isFlipped}getImage(){if(this.cardType===o.Joker1)return"cards_images/Joker1.svg";if(this.cardType===o.Joker2)return"cards_images/Joker2.svg";{let e=s[this.suit],t=n[this.number];return"cards_images/".concat(e,"-").concat(t,".svg")}}static cardFromSocket(e){let t=new a(e.suit,e.number,e.cardType,e.isFlipped,e.position,e.owner);return t}constructor(e,t,r,s=!1,n={x:720,y:410},o=null){this.suit=e,this.number=t,this.cardType=r,this.isFlipped=s,this.position=n,this.owner=o}}class l{addJokers(){this.cards.push(new a(s.Clubs,n.Ace,o.Joker1)),this.cards.push(new a(s.Clubs,n.Ace,o.Joker2))}draw(){return this.cards.pop()}shuffle(){let e=[...this.cards];for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return this.cards=e,this}static deckFromSocket(e){let t=e.cards.map(e=>a.cardFromSocket(e));return new l(t)}constructor(e){if(this.cards=[],e)this.cards=e;else for(let e=0;e<Object.keys(s).length/2;e++)for(let t=0;t<Object.keys(n).length/2;t++)this.cards.push(new a(e,t,o.Regular))}}},1614:function(e,t,r){"use strict";r.r(t),r.d(t,{SocketContextProvider:function(){return l},useSocketContext:function(){return d}});var s=r(9268),n=r(6006),o=r(6323),i=r(9699);let c={game:{isJokerIncluded:!1,isShuffleEnabled:!0}},u={theme:{tableColor:"green",cardColor:"blue"},account:{userName:"",password:"",createdRooms:[]}},a=(0,n.createContext)(void 0),l=e=>{let{children:t}=e,r=(0,n.useRef)(null),[l,d]=(0,n.useState)(c),[f,h]=(0,n.useState)(u),[p,k]=(0,n.useState)(new i.$().shuffle());return(0,n.useEffect)(()=>(r.current=(0,o.io)("https://cards-deck-online-8a294773806f.herokuapp.com",{autoConnect:!1}),()=>{var e;null===(e=r.current)||void 0===e||e.disconnect(),console.log("disconnected")}),[]),(0,s.jsx)(a.Provider,{value:{socketRef:r,deck:p,setDeck:k,multiPlayerSettings:l,setMultiPlayerSettings:d,singleModeSettings:f,setSingleModeSettings:h},children:t})},d=()=>{let e=(0,n.useContext)(a);if(!e)throw Error("useSocketContext must be used within a SocketContextProvider");return e}},7402:function(){},7369:function(e){e.exports={style:{fontFamily:"'__Inter_0ec1f4', '__Inter_Fallback_0ec1f4'",fontStyle:"normal"},className:"__className_0ec1f4"}},3177:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s=r(6006),n=Symbol.for("react.element"),o=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,c=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function a(e,t,r){var s,o={},a=null,l=null;for(s in void 0!==r&&(a=""+r),void 0!==t.key&&(a=""+t.key),void 0!==t.ref&&(l=t.ref),t)i.call(t,s)&&!u.hasOwnProperty(s)&&(o[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps)void 0===o[s]&&(o[s]=t[s]);return{$$typeof:n,type:e,key:a,ref:l,props:o,_owner:c.current}}t.Fragment=o,t.jsx=a,t.jsxs=a},9268:function(e,t,r){"use strict";e.exports=r(3177)}},function(e){e.O(0,[522,253,769,744],function(){return e(e.s=722)}),_N_E=e.O()}]);