(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,738750,(e,t,r)=>{t.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},87201,(e,t,r)=>{let i,o=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];r.getSymbolSize=function(e){if(!e)throw Error('"version" cannot be null or undefined');if(e<1||e>40)throw Error('"version" should be in range from 1 to 40');return 4*e+17},r.getSymbolTotalCodewords=function(e){return o[e]},r.getBCHDigit=function(e){let t=0;for(;0!==e;)t++,e>>>=1;return t},r.setToSJISFunction=function(e){if("function"!=typeof e)throw Error('"toSJISFunc" is not a valid function.');i=e},r.isKanjiModeEnabled=function(){return void 0!==i},r.toSJIS=function(e){return i(e)}},473133,(e,t,r)=>{r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2},r.isValid=function(e){return e&&void 0!==e.bit&&e.bit>=0&&e.bit<4},r.from=function(e,t){if(r.isValid(e))return e;try{if("string"!=typeof e)throw Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw Error("Unknown EC Level: "+e)}}catch(e){return t}}},173666,(e,t,r)=>{function i(){this.buffer=[],this.length=0}i.prototype={get:function(e){let t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)==1},put:function(e,t){for(let r=0;r<t;r++)this.putBit((e>>>t-r-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},t.exports=i},811421,(e,t,r)=>{function i(e){if(!e||e<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}i.prototype.set=function(e,t,r,i){let o=e*this.size+t;this.data[o]=r,i&&(this.reservedBit[o]=!0)},i.prototype.get=function(e,t){return this.data[e*this.size+t]},i.prototype.xor=function(e,t,r){this.data[e*this.size+t]^=r},i.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},t.exports=i},720637,(e,t,r)=>{let i=e.r(87201).getSymbolSize;r.getRowColCoords=function(e){if(1===e)return[];let t=Math.floor(e/7)+2,r=i(e),o=145===r?26:2*Math.ceil((r-13)/(2*t-2)),n=[r-7];for(let e=1;e<t-1;e++)n[e]=n[e-1]-o;return n.push(6),n.reverse()},r.getPositions=function(e){let t=[],i=r.getRowColCoords(e),o=i.length;for(let e=0;e<o;e++)for(let r=0;r<o;r++)(0!==e||0!==r)&&(0!==e||r!==o-1)&&(e!==o-1||0!==r)&&t.push([i[e],i[r]]);return t}},814002,(e,t,r)=>{let i=e.r(87201).getSymbolSize;r.getPositions=function(e){let t=i(e);return[[0,0],[t-7,0],[0,t-7]]}},237692,(e,t,r)=>{r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};r.isValid=function(e){return null!=e&&""!==e&&!isNaN(e)&&e>=0&&e<=7},r.from=function(e){return r.isValid(e)?parseInt(e,10):void 0},r.getPenaltyN1=function(e){let t=e.size,r=0,i=0,o=0,n=null,l=null;for(let a=0;a<t;a++){i=o=0,n=l=null;for(let s=0;s<t;s++){let t=e.get(a,s);t===n?i++:(i>=5&&(r+=3+(i-5)),n=t,i=1),(t=e.get(s,a))===l?o++:(o>=5&&(r+=3+(o-5)),l=t,o=1)}i>=5&&(r+=3+(i-5)),o>=5&&(r+=3+(o-5))}return r},r.getPenaltyN2=function(e){let t=e.size,r=0;for(let i=0;i<t-1;i++)for(let o=0;o<t-1;o++){let t=e.get(i,o)+e.get(i,o+1)+e.get(i+1,o)+e.get(i+1,o+1);(4===t||0===t)&&r++}return 3*r},r.getPenaltyN3=function(e){let t=e.size,r=0,i=0,o=0;for(let n=0;n<t;n++){i=o=0;for(let l=0;l<t;l++)i=i<<1&2047|e.get(n,l),l>=10&&(1488===i||93===i)&&r++,o=o<<1&2047|e.get(l,n),l>=10&&(1488===o||93===o)&&r++}return 40*r},r.getPenaltyN4=function(e){let t=0,r=e.data.length;for(let i=0;i<r;i++)t+=e.data[i];return 10*Math.abs(Math.ceil(100*t/r/5)-10)},r.applyMask=function(e,t){let i=t.size;for(let o=0;o<i;o++)for(let n=0;n<i;n++)t.isReserved(n,o)||t.xor(n,o,function(e,t,i){switch(e){case r.Patterns.PATTERN000:return(t+i)%2==0;case r.Patterns.PATTERN001:return t%2==0;case r.Patterns.PATTERN010:return i%3==0;case r.Patterns.PATTERN011:return(t+i)%3==0;case r.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(i/3))%2==0;case r.Patterns.PATTERN101:return t*i%2+t*i%3==0;case r.Patterns.PATTERN110:return(t*i%2+t*i%3)%2==0;case r.Patterns.PATTERN111:return(t*i%3+(t+i)%2)%2==0;default:throw Error("bad maskPattern:"+e)}}(e,n,o))},r.getBestMask=function(e,t){let i=Object.keys(r.Patterns).length,o=0,n=1/0;for(let l=0;l<i;l++){t(l),r.applyMask(l,e);let i=r.getPenaltyN1(e)+r.getPenaltyN2(e)+r.getPenaltyN3(e)+r.getPenaltyN4(e);r.applyMask(l,e),i<n&&(n=i,o=l)}return o}},848125,(e,t,r)=>{let i=e.r(473133),o=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],n=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];r.getBlocksCount=function(e,t){switch(t){case i.L:return o[(e-1)*4+0];case i.M:return o[(e-1)*4+1];case i.Q:return o[(e-1)*4+2];case i.H:return o[(e-1)*4+3];default:return}},r.getTotalCodewordsCount=function(e,t){switch(t){case i.L:return n[(e-1)*4+0];case i.M:return n[(e-1)*4+1];case i.Q:return n[(e-1)*4+2];case i.H:return n[(e-1)*4+3];default:return}}},654232,(e,t,r)=>{let i=new Uint8Array(512),o=new Uint8Array(256),n=1;for(let e=0;e<255;e++)i[e]=n,o[n]=e,256&(n<<=1)&&(n^=285);for(let e=255;e<512;e++)i[e]=i[e-255];r.log=function(e){if(e<1)throw Error("log("+e+")");return o[e]},r.exp=function(e){return i[e]},r.mul=function(e,t){return 0===e||0===t?0:i[o[e]+o[t]]}},950677,(e,t,r)=>{let i=e.r(654232);r.mul=function(e,t){let r=new Uint8Array(e.length+t.length-1);for(let o=0;o<e.length;o++)for(let n=0;n<t.length;n++)r[o+n]^=i.mul(e[o],t[n]);return r},r.mod=function(e,t){let r=new Uint8Array(e);for(;r.length-t.length>=0;){let e=r[0];for(let o=0;o<t.length;o++)r[o]^=i.mul(t[o],e);let o=0;for(;o<r.length&&0===r[o];)o++;r=r.slice(o)}return r},r.generateECPolynomial=function(e){let t=new Uint8Array([1]);for(let o=0;o<e;o++)t=r.mul(t,new Uint8Array([1,i.exp(o)]));return t}},962458,(e,t,r)=>{let i=e.r(950677);function o(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}o.prototype.initialize=function(e){this.degree=e,this.genPoly=i.generateECPolynomial(this.degree)},o.prototype.encode=function(e){if(!this.genPoly)throw Error("Encoder not initialized");let t=new Uint8Array(e.length+this.degree);t.set(e);let r=i.mod(t,this.genPoly),o=this.degree-r.length;if(o>0){let e=new Uint8Array(this.degree);return e.set(r,o),e}return r},t.exports=o},67483,(e,t,r)=>{r.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}},396592,(e,t,r)=>{let i="[0-9]+",o="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",n="(?:(?![A-Z0-9 $%*+\\-./:]|"+(o=o.replace(/u/g,"\\u"))+")(?:.|[\r\n]))+";r.KANJI=RegExp(o,"g"),r.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),r.BYTE=RegExp(n,"g"),r.NUMERIC=RegExp(i,"g"),r.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let l=RegExp("^"+o+"$"),a=RegExp("^"+i+"$"),s=RegExp("^[A-Z0-9 $%*+\\-./:]+$");r.testKanji=function(e){return l.test(e)},r.testNumeric=function(e){return a.test(e)},r.testAlphanumeric=function(e){return s.test(e)}},150882,(e,t,r)=>{let i=e.r(67483),o=e.r(396592);r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(e,t){if(!e.ccBits)throw Error("Invalid mode: "+e);if(!i.isValid(t))throw Error("Invalid version: "+t);return t>=1&&t<10?e.ccBits[0]:t<27?e.ccBits[1]:e.ccBits[2]},r.getBestModeForData=function(e){return o.testNumeric(e)?r.NUMERIC:o.testAlphanumeric(e)?r.ALPHANUMERIC:o.testKanji(e)?r.KANJI:r.BYTE},r.toString=function(e){if(e&&e.id)return e.id;throw Error("Invalid mode")},r.isValid=function(e){return e&&e.bit&&e.ccBits},r.from=function(e,t){if(r.isValid(e))return e;try{if("string"!=typeof e)throw Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw Error("Unknown mode: "+e)}}catch(e){return t}}},93547,(e,t,r)=>{let i=e.r(87201),o=e.r(848125),n=e.r(473133),l=e.r(150882),a=e.r(67483),s=i.getBCHDigit(7973);function c(e,t){return l.getCharCountIndicator(e,t)+4}r.from=function(e,t){return a.isValid(e)?parseInt(e,10):t},r.getCapacity=function(e,t,r){if(!a.isValid(e))throw Error("Invalid QR Code version");void 0===r&&(r=l.BYTE);let n=(i.getSymbolTotalCodewords(e)-o.getTotalCodewordsCount(e,t))*8;if(r===l.MIXED)return n;let s=n-c(r,e);switch(r){case l.NUMERIC:return Math.floor(s/10*3);case l.ALPHANUMERIC:return Math.floor(s/11*2);case l.KANJI:return Math.floor(s/13);case l.BYTE:default:return Math.floor(s/8)}},r.getBestVersionForData=function(e,t){let i,o=n.from(t,n.M);if(Array.isArray(e)){if(e.length>1){for(let t=1;t<=40;t++)if(function(e,t){let r=0;return e.forEach(function(e){let i=c(e.mode,t);r+=i+e.getBitsLength()}),r}(e,t)<=r.getCapacity(t,o,l.MIXED))return t;return}if(0===e.length)return 1;i=e[0]}else i=e;return function(e,t,i){for(let o=1;o<=40;o++)if(t<=r.getCapacity(o,i,e))return o}(i.mode,i.getLength(),o)},r.getEncodedBits=function(e){if(!a.isValid(e)||e<7)throw Error("Invalid QR Code version");let t=e<<12;for(;i.getBCHDigit(t)-s>=0;)t^=7973<<i.getBCHDigit(t)-s;return e<<12|t}},857655,(e,t,r)=>{let i=e.r(87201),o=i.getBCHDigit(1335);r.getEncodedBits=function(e,t){let r=e.bit<<3|t,n=r<<10;for(;i.getBCHDigit(n)-o>=0;)n^=1335<<i.getBCHDigit(n)-o;return(r<<10|n)^21522}},494097,(e,t,r)=>{let i=e.r(150882);function o(e){this.mode=i.NUMERIC,this.data=e.toString()}o.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(e){let t,r;for(t=0;t+3<=this.data.length;t+=3)r=parseInt(this.data.substr(t,3),10),e.put(r,10);let i=this.data.length-t;i>0&&(r=parseInt(this.data.substr(t),10),e.put(r,3*i+1))},t.exports=o},112553,(e,t,r)=>{let i=e.r(150882),o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function n(e){this.mode=i.ALPHANUMERIC,this.data=e}n.getBitsLength=function(e){return 11*Math.floor(e/2)+e%2*6},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let r=45*o.indexOf(this.data[t]);r+=o.indexOf(this.data[t+1]),e.put(r,11)}this.data.length%2&&e.put(o.indexOf(this.data[t]),6)},t.exports=n},84770,(e,t,r)=>{"use strict";t.exports=function(e){for(var t=[],r=e.length,i=0;i<r;i++){var o=e.charCodeAt(i);if(o>=55296&&o<=56319&&r>i+1){var n=e.charCodeAt(i+1);n>=56320&&n<=57343&&(o=(o-55296)*1024+n-56320+65536,i+=1)}if(o<128){t.push(o);continue}if(o<2048){t.push(o>>6|192),t.push(63&o|128);continue}if(o<55296||o>=57344&&o<65536){t.push(o>>12|224),t.push(o>>6&63|128),t.push(63&o|128);continue}if(o>=65536&&o<=1114111){t.push(o>>18|240),t.push(o>>12&63|128),t.push(o>>6&63|128),t.push(63&o|128);continue}t.push(239,191,189)}return new Uint8Array(t).buffer}},882257,(e,t,r)=>{let i=e.r(84770),o=e.r(150882);function n(e){this.mode=o.BYTE,"string"==typeof e&&(e=i(e)),this.data=new Uint8Array(e)}n.getBitsLength=function(e){return 8*e},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(e){for(let t=0,r=this.data.length;t<r;t++)e.put(this.data[t],8)},t.exports=n},422644,(e,t,r)=>{let i=e.r(150882),o=e.r(87201);function n(e){this.mode=i.KANJI,this.data=e}n.getBitsLength=function(e){return 13*e},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let r=o.toSJIS(this.data[t]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw Error("Invalid SJIS character: "+this.data[t]+"\nMake sure your charset is UTF-8");r=(r>>>8&255)*192+(255&r),e.put(r,13)}},t.exports=n},297930,(e,t,r)=>{let i=e.r(150882),o=e.r(494097),n=e.r(112553),l=e.r(882257),a=e.r(422644),s=e.r(396592),c=e.r(87201),d=e.r(245953);function p(e){return unescape(encodeURIComponent(e)).length}function h(e,t,r){let i,o=[];for(;null!==(i=e.exec(r));)o.push({data:i[0],index:i.index,mode:t,length:i[0].length});return o}function u(e){let t,r,o=h(s.NUMERIC,i.NUMERIC,e),n=h(s.ALPHANUMERIC,i.ALPHANUMERIC,e);return c.isKanjiModeEnabled()?(t=h(s.BYTE,i.BYTE,e),r=h(s.KANJI,i.KANJI,e)):(t=h(s.BYTE_KANJI,i.BYTE,e),r=[]),o.concat(n,t,r).sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function f(e,t){switch(t){case i.NUMERIC:return o.getBitsLength(e);case i.ALPHANUMERIC:return n.getBitsLength(e);case i.KANJI:return a.getBitsLength(e);case i.BYTE:return l.getBitsLength(e)}}function g(e,t){let r,s=i.getBestModeForData(e);if((r=i.from(t,s))!==i.BYTE&&r.bit<s.bit)throw Error('"'+e+'" cannot be encoded with mode '+i.toString(r)+".\n Suggested mode is: "+i.toString(s));switch(r===i.KANJI&&!c.isKanjiModeEnabled()&&(r=i.BYTE),r){case i.NUMERIC:return new o(e);case i.ALPHANUMERIC:return new n(e);case i.KANJI:return new a(e);case i.BYTE:return new l(e)}}r.fromArray=function(e){return e.reduce(function(e,t){return"string"==typeof t?e.push(g(t,null)):t.data&&e.push(g(t.data,t.mode)),e},[])},r.fromString=function(e,t){let o=function(e,t){let r={},o={start:{}},n=["start"];for(let l=0;l<e.length;l++){let a=e[l],s=[];for(let e=0;e<a.length;e++){let c=a[e],d=""+l+e;s.push(d),r[d]={node:c,lastCount:0},o[d]={};for(let e=0;e<n.length;e++){let l=n[e];r[l]&&r[l].node.mode===c.mode?(o[l][d]=f(r[l].lastCount+c.length,c.mode)-f(r[l].lastCount,c.mode),r[l].lastCount+=c.length):(r[l]&&(r[l].lastCount=c.length),o[l][d]=f(c.length,c.mode)+4+i.getCharCountIndicator(c.mode,t))}}n=s}for(let e=0;e<n.length;e++)o[n[e]].end=0;return{map:o,table:r}}(function(e){let t=[];for(let r=0;r<e.length;r++){let o=e[r];switch(o.mode){case i.NUMERIC:t.push([o,{data:o.data,mode:i.ALPHANUMERIC,length:o.length},{data:o.data,mode:i.BYTE,length:o.length}]);break;case i.ALPHANUMERIC:t.push([o,{data:o.data,mode:i.BYTE,length:o.length}]);break;case i.KANJI:t.push([o,{data:o.data,mode:i.BYTE,length:p(o.data)}]);break;case i.BYTE:t.push([{data:o.data,mode:i.BYTE,length:p(o.data)}])}}return t}(u(e,c.isKanjiModeEnabled())),t),n=d.find_path(o.map,"start","end"),l=[];for(let e=1;e<n.length-1;e++)l.push(o.table[n[e]].node);return r.fromArray(l.reduce(function(e,t){let r=e.length-1>=0?e[e.length-1]:null;return r&&r.mode===t.mode?e[e.length-1].data+=t.data:e.push(t),e},[]))},r.rawSplit=function(e){return r.fromArray(u(e,c.isKanjiModeEnabled()))}},30671,(e,t,r)=>{let i=e.r(87201),o=e.r(473133),n=e.r(173666),l=e.r(811421),a=e.r(720637),s=e.r(814002),c=e.r(237692),d=e.r(848125),p=e.r(962458),h=e.r(93547),u=e.r(857655),f=e.r(150882),g=e.r(297930);function m(e,t,r){let i,o,n=e.size,l=u.getEncodedBits(t,r);for(i=0;i<15;i++)o=(l>>i&1)==1,i<6?e.set(i,8,o,!0):i<8?e.set(i+1,8,o,!0):e.set(n-15+i,8,o,!0),i<8?e.set(8,n-i-1,o,!0):i<9?e.set(8,15-i-1+1,o,!0):e.set(8,15-i-1,o,!0);e.set(n-8,8,1,!0)}r.create=function(e,t){let r,u;if(void 0===e||""===e)throw Error("No input text");let w=o.M;return void 0!==t&&(w=o.from(t.errorCorrectionLevel,o.M),r=h.from(t.version),u=c.from(t.maskPattern),t.toSJISFunc&&i.setToSJISFunction(t.toSJISFunc)),function(e,t,r,o){let u;if(Array.isArray(e))u=g.fromArray(e);else if("string"==typeof e){let i=t;if(!i){let t=g.rawSplit(e);i=h.getBestVersionForData(t,r)}u=g.fromString(e,i||40)}else throw Error("Invalid data");let w=h.getBestVersionForData(u,r);if(!w)throw Error("The amount of data is too big to be stored in a QR Code");if(t){if(t<w)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+w+".\n")}else t=w;let b=function(e,t,r){let o=new n;r.forEach(function(t){o.put(t.mode.bit,4),o.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),t.write(o)});let l=(i.getSymbolTotalCodewords(e)-d.getTotalCodewordsCount(e,t))*8;for(o.getLengthInBits()+4<=l&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(0);let a=(l-o.getLengthInBits())/8;for(let e=0;e<a;e++)o.put(e%2?17:236,8);return function(e,t,r){let o,n,l=i.getSymbolTotalCodewords(t),a=l-d.getTotalCodewordsCount(t,r),s=d.getBlocksCount(t,r),c=l%s,h=s-c,u=Math.floor(l/s),f=Math.floor(a/s),g=f+1,m=u-f,w=new p(m),b=0,y=Array(s),C=Array(s),v=0,x=new Uint8Array(e.buffer);for(let e=0;e<s;e++){let t=e<h?f:g;y[e]=x.slice(b,b+t),C[e]=w.encode(y[e]),b+=t,v=Math.max(v,t)}let $=new Uint8Array(l),E=0;for(o=0;o<v;o++)for(n=0;n<s;n++)o<y[n].length&&($[E++]=y[n][o]);for(o=0;o<m;o++)for(n=0;n<s;n++)$[E++]=C[n][o];return $}(o,e,t)}(t,r,u),y=new l(i.getSymbolSize(t));!function(e,t){let r=e.size,i=s.getPositions(t);for(let t=0;t<i.length;t++){let o=i[t][0],n=i[t][1];for(let t=-1;t<=7;t++)if(!(o+t<=-1)&&!(r<=o+t))for(let i=-1;i<=7;i++)n+i<=-1||r<=n+i||(t>=0&&t<=6&&(0===i||6===i)||i>=0&&i<=6&&(0===t||6===t)||t>=2&&t<=4&&i>=2&&i<=4?e.set(o+t,n+i,!0,!0):e.set(o+t,n+i,!1,!0))}}(y,t);let C=y.size;for(let e=8;e<C-8;e++){let t=e%2==0;y.set(e,6,t,!0),y.set(6,e,t,!0)}return!function(e,t){let r=a.getPositions(t);for(let t=0;t<r.length;t++){let i=r[t][0],o=r[t][1];for(let t=-2;t<=2;t++)for(let r=-2;r<=2;r++)-2===t||2===t||-2===r||2===r||0===t&&0===r?e.set(i+t,o+r,!0,!0):e.set(i+t,o+r,!1,!0)}}(y,t),m(y,r,0),t>=7&&function(e,t){let r,i,o,n=e.size,l=h.getEncodedBits(t);for(let t=0;t<18;t++)r=Math.floor(t/3),i=t%3+n-8-3,o=(l>>t&1)==1,e.set(r,i,o,!0),e.set(i,r,o,!0)}(y,t),!function(e,t){let r=e.size,i=-1,o=r-1,n=7,l=0;for(let a=r-1;a>0;a-=2)for(6===a&&a--;;){for(let r=0;r<2;r++)if(!e.isReserved(o,a-r)){let i=!1;l<t.length&&(i=(t[l]>>>n&1)==1),e.set(o,a-r,i),-1==--n&&(l++,n=7)}if((o+=i)<0||r<=o){o-=i,i=-i;break}}}(y,b),isNaN(o)&&(o=c.getBestMask(y,m.bind(null,y,r))),c.applyMask(o,y),m(y,r,o),{modules:y,version:t,errorCorrectionLevel:r,maskPattern:o,segments:u}}(e,r,w,u)}},125950,(e,t,r)=>{function i(e){if("number"==typeof e&&(e=e.toString()),"string"!=typeof e)throw Error("Color should be defined as hex string");let t=e.slice().replace("#","").split("");if(t.length<3||5===t.length||t.length>8)throw Error("Invalid hex color: "+e);(3===t.length||4===t.length)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),6===t.length&&t.push("F","F");let r=parseInt(t.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:255&r,hex:"#"+t.slice(0,6).join("")}}r.getOptions=function(e){e||(e={}),e.color||(e.color={});let t=void 0===e.margin||null===e.margin||e.margin<0?4:e.margin,r=e.width&&e.width>=21?e.width:void 0,o=e.scale||4;return{width:r,scale:r?4:o,margin:t,color:{dark:i(e.color.dark||"#000000ff"),light:i(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}},r.getScale=function(e,t){return t.width&&t.width>=e+2*t.margin?t.width/(e+2*t.margin):t.scale},r.getImageWidth=function(e,t){let i=r.getScale(e,t);return Math.floor((e+2*t.margin)*i)},r.qrToImageData=function(e,t,i){let o=t.modules.size,n=t.modules.data,l=r.getScale(o,i),a=Math.floor((o+2*i.margin)*l),s=i.margin*l,c=[i.color.light,i.color.dark];for(let t=0;t<a;t++)for(let r=0;r<a;r++){let d=(t*a+r)*4,p=i.color.light;t>=s&&r>=s&&t<a-s&&r<a-s&&(p=c[+!!n[Math.floor((t-s)/l)*o+Math.floor((r-s)/l)]]),e[d++]=p.r,e[d++]=p.g,e[d++]=p.b,e[d]=p.a}}},563037,(e,t,r)=>{let i=e.r(125950);r.render=function(e,t,r){var o;let n=r,l=t;void 0!==n||t&&t.getContext||(n=t,t=void 0),t||(l=function(){try{return document.createElement("canvas")}catch(e){throw Error("You need to specify a canvas element")}}()),n=i.getOptions(n);let a=i.getImageWidth(e.modules.size,n),s=l.getContext("2d"),c=s.createImageData(a,a);return i.qrToImageData(c.data,e,n),o=l,s.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=a,o.width=a,o.style.height=a+"px",o.style.width=a+"px",s.putImageData(c,0,0),l},r.renderToDataURL=function(e,t,i){let o=i;void 0!==o||t&&t.getContext||(o=t,t=void 0),o||(o={});let n=r.render(e,t,o),l=o.type||"image/png",a=o.rendererOpts||{};return n.toDataURL(l,a.quality)}},310891,(e,t,r)=>{let i=e.r(125950);function o(e,t){let r=e.a/255,i=t+'="'+e.hex+'"';return r<1?i+" "+t+'-opacity="'+r.toFixed(2).slice(1)+'"':i}function n(e,t,r){let i=e+t;return void 0!==r&&(i+=" "+r),i}r.render=function(e,t,r){let l=i.getOptions(t),a=e.modules.size,s=e.modules.data,c=a+2*l.margin,d=l.color.light.a?"<path "+o(l.color.light,"fill")+' d="M0 0h'+c+"v"+c+'H0z"/>':"",p="<path "+o(l.color.dark,"stroke")+' d="'+function(e,t,r){let i="",o=0,l=!1,a=0;for(let s=0;s<e.length;s++){let c=Math.floor(s%t),d=Math.floor(s/t);c||l||(l=!0),e[s]?(a++,s>0&&c>0&&e[s-1]||(i+=l?n("M",c+r,.5+d+r):n("m",o,0),o=0,l=!1),c+1<t&&e[s+1]||(i+=n("h",a),a=0)):o++}return i}(s,a,l.margin)+'"/>',h='<svg xmlns="http://www.w3.org/2000/svg" '+(l.width?'width="'+l.width+'" height="'+l.width+'" ':"")+('viewBox="0 0 '+c+" ")+c+'" shape-rendering="crispEdges">'+d+p+"</svg>\n";return"function"==typeof r&&r(null,h),h}},973134,(e,t,r)=>{let i=e.r(738750),o=e.r(30671),n=e.r(563037),l=e.r(310891);function a(e,t,r,n,l){let a=[].slice.call(arguments,1),s=a.length,c="function"==typeof a[s-1];if(!c&&!i())throw Error("Callback required as last argument");if(c){if(s<2)throw Error("Too few arguments provided");2===s?(l=r,r=t,t=n=void 0):3===s&&(t.getContext&&void 0===l?(l=n,n=void 0):(l=n,n=r,r=t,t=void 0))}else{if(s<1)throw Error("Too few arguments provided");return 1===s?(r=t,t=n=void 0):2!==s||t.getContext||(n=r,r=t,t=void 0),new Promise(function(i,l){try{let l=o.create(r,n);i(e(l,t,n))}catch(e){l(e)}})}try{let i=o.create(r,n);l(null,e(i,t,n))}catch(e){l(e)}}r.create=o.create,r.toCanvas=a.bind(null,n.render),r.toDataURL=a.bind(null,n.renderToDataURL),r.toString=a.bind(null,function(e,t,r){return l.render(e,r)})},533143,e=>{"use strict";e.i(812207);var t=e.i(604148),r=e.i(654479);e.i(374576);var i=e.i(56350),o=e.i(886259),n=e.i(227302),l=e.i(82283),a=e.i(758331);e.i(404041);var s=e.i(645975);e.i(62238);var c=t,d=e.i(120119);e.i(234051);var p=e.i(829389),h=e.i(401564),u=e.i(971080),f=e.i(149454),g=e.i(653157),m=e.i(221728);e.i(987789);var w=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let b=class extends c.LitElement{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=f.ConnectorController.state.connectors,this.count=o.ApiController.state.count,this.filteredCount=o.ApiController.state.filteredWallets.length,this.isFetchingRecommendedWallets=o.ApiController.state.isFetchingRecommendedWallets,this.unsubscribe.push(f.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),o.ApiController.subscribeKey("count",e=>this.count=e),o.ApiController.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),o.ApiController.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.find(e=>"walletConnect"===e.id),{allWallets:t}=l.OptionsController.state;if(!e||"HIDE"===t||"ONLY_MOBILE"===t&&!n.CoreHelperUtil.isMobile())return null;let i=o.ApiController.state.featured.length,a=this.count+i,s=a<10?a:10*Math.floor(a/10),c=this.filteredCount>0?this.filteredCount:s,d=`${c}`;this.filteredCount>0?d=`${this.filteredCount}`:c<a&&(d=`${c}+`);let f=u.ConnectionController.hasAnyConnection(h.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT);return r.html`
      <wui-list-wallet
        name="Search Wallet"
        walletIcon="search"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${d}
        tagVariant="info"
        data-testid="all-wallets"
        tabIdx=${(0,p.ifDefined)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        ?disabled=${f}
        size="sm"
      ></wui-list-wallet>
    `}onAllWallets(){g.EventsController.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),m.RouterController.push("AllWallets",{redirectView:m.RouterController.state.data?.redirectView})}};w([(0,d.property)()],b.prototype,"tabIdx",void 0),w([(0,i.state)()],b.prototype,"connectors",void 0),w([(0,i.state)()],b.prototype,"count",void 0),w([(0,i.state)()],b.prototype,"filteredCount",void 0),w([(0,i.state)()],b.prototype,"isFetchingRecommendedWallets",void 0),b=w([(0,s.customElement)("w3m-all-wallets-widget")],b);var y=t,C=e.i(241845),v=e.i(436220),x=e.i(769718),$=e.i(288085),E=e.i(162611);let R=E.css`
  :host {
    margin-top: ${({spacing:e})=>e["1"]};
  }
  wui-separator {
    margin: ${({spacing:e})=>e["3"]} calc(${({spacing:e})=>e["3"]} * -1)
      ${({spacing:e})=>e["2"]} calc(${({spacing:e})=>e["3"]} * -1);
    width: calc(100% + ${({spacing:e})=>e["3"]} * 2);
  }
`;var k=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let T=class extends y.LitElement{constructor(){super(),this.unsubscribe=[],this.connectors=f.ConnectorController.state.connectors,this.recommended=o.ApiController.state.recommended,this.featured=o.ApiController.state.featured,this.explorerWallets=o.ApiController.state.explorerWallets,this.connections=u.ConnectionController.state.connections,this.connectorImages=C.AssetController.state.connectorImages,this.loadingTelegram=!1,this.unsubscribe.push(f.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),u.ConnectionController.subscribeKey("connections",e=>this.connections=e),C.AssetController.subscribeKey("connectorImages",e=>this.connectorImages=e),o.ApiController.subscribeKey("recommended",e=>this.recommended=e),o.ApiController.subscribeKey("featured",e=>this.featured=e),o.ApiController.subscribeKey("explorerFilteredWallets",e=>{this.explorerWallets=e?.length?e:o.ApiController.state.explorerWallets}),o.ApiController.subscribeKey("explorerWallets",e=>{this.explorerWallets?.length||(this.explorerWallets=e)})),n.CoreHelperUtil.isTelegram()&&n.CoreHelperUtil.isIos()&&(this.loadingTelegram=!u.ConnectionController.state.wcUri,this.unsubscribe.push(u.ConnectionController.subscribeKey("wcUri",e=>this.loadingTelegram=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return r.html`
      <wui-flex flexDirection="column" gap="2"> ${this.connectorListTemplate()} </wui-flex>
    `}mapConnectorsToExplorerWallets(e,t){return e.map(e=>{if("MULTI_CHAIN"===e.type&&e.connectors){let r=e.connectors.map(e=>e.id),i=e.connectors.map(e=>e.name),o=e.connectors.map(e=>e.info?.rdns);return e.explorerWallet=t?.find(e=>r.includes(e.id)||i.includes(e.name)||e.rdns&&(o.includes(e.rdns)||r.includes(e.rdns)))??e.explorerWallet,e}let r=t?.find(t=>t.id===e.id||t.rdns===e.info?.rdns||t.name===e.name);return e.explorerWallet=r??e.explorerWallet,e})}processConnectorsByType(e,t=!0){let r=$.ConnectorUtil.sortConnectorsByExplorerWallet([...e]);return t?r.filter($.ConnectorUtil.showConnector):r}connectorListTemplate(){let e=this.mapConnectorsToExplorerWallets(this.connectors,this.explorerWallets??[]),t=$.ConnectorUtil.getConnectorsByType(e,this.recommended,this.featured),r=this.processConnectorsByType(t.announced.filter(e=>"walletConnect"!==e.id)),i=this.processConnectorsByType(t.injected),o=this.processConnectorsByType(t.multiChain.filter(e=>"WalletConnect"!==e.name),!1),l=t.custom,a=t.recent,s=this.processConnectorsByType(t.external.filter(e=>e.id!==h.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK)),c=t.recommended,d=t.featured,p=$.ConnectorUtil.getConnectorTypeOrder({custom:l,recent:a,announced:r,injected:i,multiChain:o,recommended:c,featured:d,external:s}),u=this.connectors.find(e=>"walletConnect"===e.id),f=n.CoreHelperUtil.isMobile(),g=[];for(let e of p)switch(e){case"walletConnect":!f&&u&&g.push({kind:"connector",subtype:"walletConnect",connector:u});break;case"recent":$.ConnectorUtil.getFilteredRecentWallets().forEach(e=>g.push({kind:"wallet",subtype:"recent",wallet:e}));break;case"injected":o.forEach(e=>g.push({kind:"connector",subtype:"multiChain",connector:e})),r.forEach(e=>g.push({kind:"connector",subtype:"announced",connector:e})),i.forEach(e=>g.push({kind:"connector",subtype:"injected",connector:e}));break;case"featured":d.forEach(e=>g.push({kind:"wallet",subtype:"featured",wallet:e}));break;case"custom":$.ConnectorUtil.getFilteredCustomWallets(l??[]).forEach(e=>g.push({kind:"wallet",subtype:"custom",wallet:e}));break;case"external":s.forEach(e=>g.push({kind:"connector",subtype:"external",connector:e}));break;case"recommended":$.ConnectorUtil.getCappedRecommendedWallets(c).forEach(e=>g.push({kind:"wallet",subtype:"recommended",wallet:e}));break;default:console.warn(`Unknown connector type: ${e}`)}return g.map((e,t)=>"connector"===e.kind?this.renderConnector(e,t):this.renderWallet(e,t))}renderConnector(e,t){let i,o,n=e.connector,l=v.AssetUtil.getConnectorImage(n)||this.connectorImages[n?.imageId??""],a=(this.connections.get(n.chain)??[]).some(e=>x.HelpersUtil.isLowerCaseMatch(e.connectorId,n.id));"multiChain"===e.subtype?(i="multichain",o="info"):"walletConnect"===e.subtype?(i="qr code",o="accent"):"injected"===e.subtype||"announced"===e.subtype?(i=a?"connected":"installed",o=a?"info":"success"):(i=void 0,o=void 0);let s=u.ConnectionController.hasAnyConnection(h.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT),c=("walletConnect"===e.subtype||"external"===e.subtype)&&s;return r.html`
      <w3m-list-wallet
        displayIndex=${t}
        imageSrc=${(0,p.ifDefined)(l)}
        .installed=${!0}
        name=${n.name??"Unknown"}
        .tagVariant=${o}
        tagLabel=${(0,p.ifDefined)(i)}
        data-testid=${`wallet-selector-${n.id.toLowerCase()}`}
        size="sm"
        @click=${()=>this.onClickConnector(e)}
        tabIdx=${(0,p.ifDefined)(this.tabIdx)}
        ?disabled=${c}
        rdnsId=${(0,p.ifDefined)(n.explorerWallet?.rdns||void 0)}
        walletRank=${(0,p.ifDefined)(n.explorerWallet?.order)}
      >
      </w3m-list-wallet>
    `}onClickConnector(e){let t=m.RouterController.state.data?.redirectView;if("walletConnect"===e.subtype){f.ConnectorController.setActiveConnector(e.connector),n.CoreHelperUtil.isMobile()?m.RouterController.push("AllWallets"):m.RouterController.push("ConnectingWalletConnect",{redirectView:t});return}if("multiChain"===e.subtype){f.ConnectorController.setActiveConnector(e.connector),m.RouterController.push("ConnectingMultiChain",{redirectView:t});return}if("injected"===e.subtype){f.ConnectorController.setActiveConnector(e.connector),m.RouterController.push("ConnectingExternal",{connector:e.connector,redirectView:t,wallet:e.connector.explorerWallet});return}if("announced"===e.subtype)return"walletConnect"===e.connector.id?void(n.CoreHelperUtil.isMobile()?m.RouterController.push("AllWallets"):m.RouterController.push("ConnectingWalletConnect",{redirectView:t})):(m.RouterController.push("ConnectingExternal",{connector:e.connector,redirectView:t,wallet:e.connector.explorerWallet}),void 0);m.RouterController.push("ConnectingExternal",{connector:e.connector,redirectView:t})}renderWallet(e,t){let i=e.wallet,o=v.AssetUtil.getWalletImage(i),n=u.ConnectionController.hasAnyConnection(h.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT),l=this.loadingTelegram,a="recent"===e.subtype?"recent":void 0,s="recent"===e.subtype?"info":void 0;return r.html`
      <w3m-list-wallet
        displayIndex=${t}
        imageSrc=${(0,p.ifDefined)(o)}
        name=${i.name??"Unknown"}
        @click=${()=>this.onClickWallet(e)}
        size="sm"
        data-testid=${`wallet-selector-${i.id}`}
        tabIdx=${(0,p.ifDefined)(this.tabIdx)}
        ?loading=${l}
        ?disabled=${n}
        rdnsId=${(0,p.ifDefined)(i.rdns||void 0)}
        walletRank=${(0,p.ifDefined)(i.order)}
        tagLabel=${(0,p.ifDefined)(a)}
        .tagVariant=${s}
      >
      </w3m-list-wallet>
    `}onClickWallet(e){let t=m.RouterController.state.data?.redirectView;if("featured"===e.subtype)return void f.ConnectorController.selectWalletConnector(e.wallet);if("recent"===e.subtype){if(this.loadingTelegram)return;f.ConnectorController.selectWalletConnector(e.wallet);return}if("custom"===e.subtype){if(this.loadingTelegram)return;m.RouterController.push("ConnectingWalletConnect",{wallet:e.wallet,redirectView:t});return}if(this.loadingTelegram)return;let r=f.ConnectorController.getConnector({id:e.wallet.id,rdns:e.wallet.rdns});r?m.RouterController.push("ConnectingExternal",{connector:r,redirectView:t}):m.RouterController.push("ConnectingWalletConnect",{wallet:e.wallet,redirectView:t})}};T.styles=R,k([(0,d.property)({type:Number})],T.prototype,"tabIdx",void 0),k([(0,i.state)()],T.prototype,"connectors",void 0),k([(0,i.state)()],T.prototype,"recommended",void 0),k([(0,i.state)()],T.prototype,"featured",void 0),k([(0,i.state)()],T.prototype,"explorerWallets",void 0),k([(0,i.state)()],T.prototype,"connections",void 0),k([(0,i.state)()],T.prototype,"connectorImages",void 0),k([(0,i.state)()],T.prototype,"loadingTelegram",void 0),T=k([(0,s.customElement)("w3m-connector-list")],T);var A=t,N=e.i(683075),I=e.i(592279),O=e.i(960398),S=e.i(803468),U=e.i(811424),P=e.i(307075),L=e.i(110163),B=e.i(16555);h.ConstantsUtil.CONNECTOR_ID.COINBASE,h.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK,h.ConstantsUtil.CONNECTOR_ID.SAFE,h.ConstantsUtil.CONNECTOR_ID.LEDGER,h.ConstantsUtil.CONNECTOR_ID.OKX,B.ConstantsUtil.METMASK_CONNECTOR_NAME,B.ConstantsUtil.TRUST_CONNECTOR_NAME,B.ConstantsUtil.SOLFLARE_CONNECTOR_NAME,B.ConstantsUtil.PHANTOM_CONNECTOR_NAME,B.ConstantsUtil.COIN98_CONNECTOR_NAME,B.ConstantsUtil.MAGIC_EDEN_CONNECTOR_NAME,B.ConstantsUtil.BACKPACK_CONNECTOR_NAME,B.ConstantsUtil.BITGET_CONNECTOR_NAME,B.ConstantsUtil.FRONTIER_CONNECTOR_NAME,B.ConstantsUtil.XVERSE_CONNECTOR_NAME,B.ConstantsUtil.LEATHER_CONNECTOR_NAME,B.ConstantsUtil.OKX_CONNECTOR_NAME;let D={1:"ba0ba0cd-17c6-4806-ad93-f9d174f17900",42161:"3bff954d-5cb0-47a0-9a23-d20192e74600",43114:"30c46e53-e989-45fb-4549-be3bd4eb3b00",56:"93564157-2e8e-4ce7-81df-b264dbee9b00",250:"06b26297-fe0c-4733-5d6b-ffa5498aac00",10:"ab9c186a-c52f-464b-2906-ca59d760a400",137:"41d04d42-da3b-4453-8506-668cc0727900",5e3:"e86fae9b-b770-4eea-e520-150e12c81100",295:"6a97d510-cac8-4e58-c7ce-e8681b044c00",0xaa36a7:"e909ea0a-f92a-4512-c8fc-748044ea6800",84532:"a18a7ecd-e307-4360-4746-283182228e00",1301:"4eeea7ef-0014-4649-5d1d-07271a80f600",130:"2257980a-3463-48c6-cbac-a42d2a956e00",10143:"0a728e83-bacb-46db-7844-948f05434900",100:"02b53f6a-e3d4-479e-1cb4-21178987d100",9001:"f926ff41-260d-4028-635e-91913fc28e00",324:"b310f07f-4ef7-49f3-7073-2a0a39685800",314:"5a73b3dd-af74-424e-cae0-0de859ee9400",4689:"34e68754-e536-40da-c153-6ef2e7188a00",1088:"3897a66d-40b9-4833-162f-a2c90531c900",1284:"161038da-44ae-4ec7-1208-0ea569454b00",1285:"f1d73bb6-5450-4e18-38f7-fb6484264a00",7777777:"845c60df-d429-4991-e687-91ae45791600",42220:"ab781bbc-ccc6-418d-d32d-789b15da1f00",8453:"7289c336-3981-4081-c5f4-efc26ac64a00",0x4e454152:"3ff73439-a619-4894-9262-4470c773a100",2020:"b8101fc0-9c19-4b6f-ec65-f6dfff106e00",2021:"b8101fc0-9c19-4b6f-ec65-f6dfff106e00",80094:"e329c2c9-59b0-4a02-83e4-212ff3779900",2741:"fc2427d1-5af9-4a9c-8da5-6f94627cd900","5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp":"a1b58899-f671-4276-6a5e-56ca5bd59700","4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z":"a1b58899-f671-4276-6a5e-56ca5bd59700",EtWTRABZaYq6iMfeYKouRu166VU2xqa1:"a1b58899-f671-4276-6a5e-56ca5bd59700","000000000019d6689c085ae165831e93":"0b4838db-0161-4ffe-022d-532bf03dba00","000000000933ea01ad0ee984209779ba":"39354064-d79b-420b-065d-f980c4b78200","00000008819873e925422c1ff0f99f7c":"b3406e4a-bbfc-44fb-e3a6-89673c78b700"};function _(e,t){let r=new URL("https://rpc.walletconnect.org/v1/");return r.searchParams.set("chainId",e),r.searchParams.set("projectId",t),r.toString()}h.ConstantsUtil.CONNECTOR_ID.COINBASE,h.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK,h.ConstantsUtil.CONNECTOR_ID.SAFE,h.ConstantsUtil.CONNECTOR_ID.LEDGER,h.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT,h.ConstantsUtil.CONNECTOR_ID.INJECTED,h.ConstantsUtil.CONNECTOR_ID.INJECTED,h.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT,h.ConstantsUtil.CONNECTOR_ID.COINBASE,h.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK,h.ConstantsUtil.CONNECTOR_ID.LEDGER,h.ConstantsUtil.CONNECTOR_ID.SAFE,h.ConstantsUtil.CONNECTOR_ID.INJECTED,h.ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT,h.ConstantsUtil.CONNECTOR_ID.EIP6963,h.ConstantsUtil.CONNECTOR_ID.AUTH,B.ConstantsUtil.CONNECTOR_TYPE_AUTH;let W=["near:mainnet","solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp","eip155:1101","eip155:56","eip155:42161","eip155:7777777","eip155:59144","eip155:324","solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1","eip155:5000","solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz","eip155:80084","eip155:5003","eip155:100","eip155:8453","eip155:42220","eip155:1313161555","eip155:17000","eip155:1","eip155:300","eip155:1313161554","eip155:1329","eip155:84532","eip155:421614","eip155:11155111","eip155:8217","eip155:43114","solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z","eip155:999999999","eip155:11155420","eip155:80002","eip155:97","eip155:43113","eip155:137","eip155:10","eip155:1301","eip155:80094","eip155:80069","eip155:560048","eip155:31","eip155:2818","eip155:57054","eip155:911867","eip155:534351","eip155:1112","eip155:534352","eip155:1111","eip155:146","eip155:130","eip155:1284","eip155:30","eip155:2810","bip122:000000000019d6689c085ae165831e93","bip122:000000000933ea01ad0ee984209779ba"],j={extendRpcUrlWithProjectId(e,t){let r=!1;try{r="rpc.walletconnect.org"===new URL(e).host}catch(e){r=!1}if(r){let r=new URL(e);return r.searchParams.has("projectId")||r.searchParams.set("projectId",t),r.toString()}return e},isCaipNetwork:e=>"chainNamespace"in e&&"caipNetworkId"in e,getChainNamespace(e){return this.isCaipNetwork(e)?e.chainNamespace:h.ConstantsUtil.CHAIN.EVM},getCaipNetworkId(e){return this.isCaipNetwork(e)?e.caipNetworkId:`${h.ConstantsUtil.CHAIN.EVM}:${e.id}`},getDefaultRpcUrl(e,t,r){let i=e.rpcUrls?.default?.http?.[0];return W.includes(t)?_(t,r):i||""},extendCaipNetwork(e,{customNetworkImageUrls:t,projectId:r,customRpcUrls:i}){let o=this.getChainNamespace(e),n=this.getCaipNetworkId(e),l=e.rpcUrls?.default?.http?.[0],a=this.getDefaultRpcUrl(e,n,r),s=e?.rpcUrls?.chainDefault?.http?.[0]||l,c=i?.[n]?.map(e=>e.url)||[],d=[...c,...a?[a]:[]],p=[...c];return s&&!p.includes(s)&&p.push(s),{...e,chainNamespace:o,caipNetworkId:n,assets:{imageId:D[e.id],imageUrl:t?.[e.id]},rpcUrls:{...e.rpcUrls,default:{http:d},chainDefault:{http:p}}}},extendCaipNetworks:(e,{customNetworkImageUrls:t,projectId:r,customRpcUrls:i})=>e.map(e=>j.extendCaipNetwork(e,{customNetworkImageUrls:t,customRpcUrls:i,projectId:r})),getViemTransport(e,t,r){let i=[];return r?.forEach(e=>{i.push((0,L.http)(e.url,e.config))}),W.includes(e.caipNetworkId)&&i.push((0,L.http)(_(e.caipNetworkId,t),{fetchOptions:{headers:{"Content-Type":"text/plain"}}})),e?.rpcUrls?.default?.http?.forEach(e=>{i.push((0,L.http)(e))}),(0,P.fallback)(i)},extendWagmiTransports(e,t,r){if(W.includes(e.caipNetworkId)){let i=this.getDefaultRpcUrl(e,e.caipNetworkId,t);return(0,P.fallback)([r,(0,L.http)(i)])}return r},getUnsupportedNetwork:e=>({id:e.split(":")[1],caipNetworkId:e,name:h.ConstantsUtil.UNSUPPORTED_NETWORK_NAME,chainNamespace:e.split(":")[0],nativeCurrency:{name:"",decimals:0,symbol:""},rpcUrls:{default:{http:[]}}}),getCaipNetworkFromStorage(e){let t=a.StorageUtil.getActiveCaipNetworkId(),r=O.ChainController.getAllRequestedCaipNetworks(),i=Array.from(O.ChainController.state.chains?.keys()||[]),o=t?.split(":")[0],n=!!o&&i.includes(o),l=r?.find(e=>e.caipNetworkId===t);return n&&!l&&t?this.getUnsupportedNetwork(t):l||e||r?.[0]}};var z=t,M=t,H=e.i(459088),F=t;e.i(852634),e.i(839009);let K=E.css`
  :host {
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    column-gap: ${({spacing:e})=>e[1]};
    color: ${({tokens:e})=>e.theme.textSecondary};
    border-radius: ${({borderRadius:e})=>e[20]};
    background-color: transparent;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-active='true'] {
    color: ${({tokens:e})=>e.theme.textPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundTertiary};
  }

  button:hover:enabled:not([data-active='true']),
  button:active:enabled:not([data-active='true']) {
    wui-text,
    wui-icon {
      color: ${({tokens:e})=>e.theme.textPrimary};
    }
  }
`;var q=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let V={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},Y={lg:"md",md:"sm",sm:"sm"},J=class extends F.LitElement{constructor(){super(...arguments),this.icon="mobile",this.size="md",this.label="",this.active=!1}render(){return r.html`
      <button data-active=${this.active}>
        ${this.icon?r.html`<wui-icon size=${Y[this.size]} name=${this.icon}></wui-icon>`:""}
        <wui-text variant=${V[this.size]}> ${this.label} </wui-text>
      </button>
    `}};J.styles=[H.resetStyles,H.elementStyles,K],q([(0,d.property)()],J.prototype,"icon",void 0),q([(0,d.property)()],J.prototype,"size",void 0),q([(0,d.property)()],J.prototype,"label",void 0),q([(0,d.property)({type:Boolean})],J.prototype,"active",void 0),J=q([(0,s.customElement)("wui-tab-item")],J);let G=E.css`
  :host {
    display: inline-flex;
    align-items: center;
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[32]};
    padding: ${({spacing:e})=>e["01"]};
    box-sizing: border-box;
  }

  :host([data-size='sm']) {
    height: 26px;
  }

  :host([data-size='md']) {
    height: 36px;
  }
`;var Q=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let X=class extends M.LitElement{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.size="md",this.activeTab=0}render(){return this.dataset.size=this.size,this.tabs.map((e,t)=>{let i=t===this.activeTab;return r.html`
        <wui-tab-item
          @click=${()=>this.onTabClick(t)}
          icon=${e.icon}
          size=${this.size}
          label=${e.label}
          ?active=${i}
          data-active=${i}
          data-testid="tab-${e.label?.toLowerCase()}"
        ></wui-tab-item>
      `})}onTabClick(e){this.activeTab=e,this.onTabChange(e)}};X.styles=[H.resetStyles,H.elementStyles,G],Q([(0,d.property)({type:Array})],X.prototype,"tabs",void 0),Q([(0,d.property)()],X.prototype,"onTabChange",void 0),Q([(0,d.property)()],X.prototype,"size",void 0),Q([(0,i.state)()],X.prototype,"activeTab",void 0),X=Q([(0,s.customElement)("wui-tabs")],X);var Z=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let ee=class extends z.LitElement{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.generateTabs();return r.html`
      <wui-flex justifyContent="center" .padding=${["0","0","4","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){let e=this.platforms.map(e=>{if("browser"===e)return{label:"Browser",icon:"extension",platform:"browser"};if("mobile"===e)return{label:"Mobile",icon:"mobile",platform:"mobile"};if("qrcode"===e)return{label:"Mobile",icon:"mobile",platform:"qrcode"};if("web"===e)return{label:"Webapp",icon:"browser",platform:"web"};if("desktop"===e)return{label:"Desktop",icon:"desktop",platform:"desktop"};return{label:"Browser",icon:"extension",platform:"unsupported"}});return this.platformTabs=e.map(({platform:e})=>e),e}onTabChange(e){let t=this.platformTabs[e];t&&this.onSelectPlatfrom?.(t)}};Z([(0,d.property)({type:Array})],ee.prototype,"platforms",void 0),Z([(0,d.property)()],ee.prototype,"onSelectPlatfrom",void 0),ee=Z([(0,s.customElement)("w3m-connecting-header")],ee);var et=t,er=e.i(639403),ei=t;e.i(383227);let eo=E.css`
  :host {
    width: var(--local-width);
  }

  button {
    width: var(--local-width);
    white-space: nowrap;
    column-gap: ${({spacing:e})=>e[2]};
    transition:
      scale ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: scale, background-color, border-radius;
    cursor: pointer;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='sm'] {
    border-radius: ${({borderRadius:e})=>e[2]};
    padding: 0 ${({spacing:e})=>e[2]};
    height: 28px;
  }

  button[data-size='md'] {
    border-radius: ${({borderRadius:e})=>e[3]};
    padding: 0 ${({spacing:e})=>e[4]};
    height: 38px;
  }

  button[data-size='lg'] {
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: 0 ${({spacing:e})=>e[5]};
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent-primary'] {
    background-color: ${({tokens:e})=>e.core.backgroundAccentPrimary};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='accent-secondary'] {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  button[data-variant='neutral-primary'] {
    background-color: ${({tokens:e})=>e.theme.backgroundInvert};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='neutral-secondary'] {
    background-color: transparent;
    border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  button[data-variant='neutral-tertiary'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  button[data-variant='error-primary'] {
    background-color: ${({tokens:e})=>e.core.textError};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='error-secondary'] {
    background-color: ${({tokens:e})=>e.core.backgroundError};
    color: ${({tokens:e})=>e.core.textError};
  }

  button[data-variant='shade'] {
    background: var(--wui-color-gray-glass-002);
    color: var(--wui-color-fg-200);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-size='sm']:focus-visible:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:focus-visible:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:focus-visible:enabled {
    border-radius: 48px;
  }
  button[data-variant='shade']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button[data-size='sm']:hover:enabled {
      border-radius: 28px;
    }

    button[data-size='md']:hover:enabled {
      border-radius: 38px;
    }

    button[data-size='lg']:hover:enabled {
      border-radius: 48px;
    }

    button[data-variant='shade']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='shade']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }
  }

  button[data-size='sm']:active:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:active:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:active:enabled {
    border-radius: 48px;
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    opacity: 0.3;
  }
`;var en=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let el={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},ea={lg:"md",md:"md",sm:"sm"},es=class extends ei.LitElement{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
     `;let e=this.textVariant??el[this.size];return r.html`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){let e=ea[this.size],t="neutral-primary"===this.variant||"accent-primary"===this.variant?"invert":"primary";return r.html`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return null}};es.styles=[H.resetStyles,H.elementStyles,eo],en([(0,d.property)()],es.prototype,"size",void 0),en([(0,d.property)({type:Boolean})],es.prototype,"disabled",void 0),en([(0,d.property)({type:Boolean})],es.prototype,"fullWidth",void 0),en([(0,d.property)({type:Boolean})],es.prototype,"loading",void 0),en([(0,d.property)()],es.prototype,"variant",void 0),en([(0,d.property)()],es.prototype,"textVariant",void 0),es=en([(0,s.customElement)("wui-button")],es),e.i(443452),e.i(912190),e.i(210380);var ec=t;let ed=E.css`
  :host {
    display: block;
    width: 100px;
    height: 100px;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  rect {
    fill: none;
    stroke: ${e=>e.colors.accent100};
    stroke-width: 3px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var ep=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let eh=class extends ec.LitElement{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let e=this.radius>50?50:this.radius,t=36-e;return r.html`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${116+t} ${245+t}"
          stroke-dashoffset=${360+1.75*t}
        />
      </svg>
    `}};eh.styles=[H.resetStyles,ed],ep([(0,d.property)({type:Number})],eh.prototype,"radius",void 0),eh=ep([(0,s.customElement)("wui-loading-thumbnail")],eh),e.i(249536),e.i(720226);var eu=t,ef=e.i(112699),eg=t;e.i(73944);let em=E.css`
  wui-flex {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[5]};
    padding-left: ${({spacing:e})=>e[3]};
    padding-right: ${({spacing:e})=>e[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:e})=>e[6]};
  }

  wui-text {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  wui-icon {
    width: 12px;
    height: 12px;
  }
`;var ew=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let eb=class extends eg.LitElement{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return r.html`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="inherit">${this.label}</wui-text>
        <wui-button variant="accent-secondary" size="sm">
          ${this.buttonLabel}
          <wui-icon name="chevronRight" color="inherit" size="inherit" slot="iconRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};eb.styles=[H.resetStyles,H.elementStyles,em],ew([(0,d.property)({type:Boolean})],eb.prototype,"disabled",void 0),ew([(0,d.property)()],eb.prototype,"label",void 0),ew([(0,d.property)()],eb.prototype,"buttonLabel",void 0),eb=ew([(0,s.customElement)("wui-cta-button")],eb);let ey=E.css`
  :host {
    display: block;
    padding: 0 ${({spacing:e})=>e["5"]} ${({spacing:e})=>e["5"]};
  }
`;var eC=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let ev=class extends eu.LitElement{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;let{name:e,app_store:t,play_store:i,chrome_store:o,homepage:l}=this.wallet,a=n.CoreHelperUtil.isMobile(),s=n.CoreHelperUtil.isIos(),c=n.CoreHelperUtil.isAndroid(),d=[t,i,l,o].filter(Boolean).length>1,p=ef.UiHelperUtil.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return d&&!a?r.html`
        <wui-cta-button
          label=${`Don't have ${p}?`}
          buttonLabel="Get"
          @click=${()=>m.RouterController.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!d&&l?r.html`
        <wui-cta-button
          label=${`Don't have ${p}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:t&&s?r.html`
        <wui-cta-button
          label=${`Don't have ${p}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:i&&c?r.html`
        <wui-cta-button
          label=${`Don't have ${p}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&n.CoreHelperUtil.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&n.CoreHelperUtil.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&n.CoreHelperUtil.openHref(this.wallet.homepage,"_blank")}};ev.styles=[ey],eC([(0,d.property)({type:Object})],ev.prototype,"wallet",void 0),ev=eC([(0,s.customElement)("w3m-mobile-download-links")],ev);let ex=E.css`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-wallet-image {
    width: 56px;
    height: 56px;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:e})=>e["1"]} * -1);
    bottom: calc(${({spacing:e})=>e["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${({durations:e})=>e.lg};
    transition-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:e})=>e["4"]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:e})=>e["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  w3m-mobile-download-links {
    padding: 0px;
    width: 100%;
  }
`;var e$=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};class eE extends et.LitElement{constructor(){super(),this.wallet=m.RouterController.state.data?.wallet,this.connector=m.RouterController.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=v.AssetUtil.getConnectorImage(this.connector)??v.AssetUtil.getWalletImage(this.wallet),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=u.ConnectionController.state.wcUri,this.error=u.ConnectionController.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(u.ConnectionController.subscribeKey("wcUri",e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),u.ConnectionController.subscribeKey("wcError",e=>this.error=e)),(n.CoreHelperUtil.isTelegram()||n.CoreHelperUtil.isSafari())&&n.CoreHelperUtil.isIos()&&u.ConnectionController.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),u.ConnectionController.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();let e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel,t="";return this.label?t=this.label:(t=`Continue in ${this.name}`,this.error&&(t="Connection declined")),r.html`
      <wui-flex
        data-error=${(0,p.ifDefined)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="6"
      >
        <wui-flex gap="2" justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,p.ifDefined)(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="6"> <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2","0","0","0"]}
        >
          <wui-text align="center" variant="lg-medium" color=${this.error?"error":"primary"}>
            ${t}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?r.html`
                <wui-button
                  variant="neutral-secondary"
                  size="md"
                  ?disabled=${this.isRetrying||this.isLoading}
                  @click=${this.onTryAgain.bind(this)}
                  data-testid="w3m-connecting-widget-secondary-button"
                >
                  <wui-icon
                    color="inherit"
                    slot="iconLeft"
                    name=${this.secondaryBtnIcon}
                  ></wui-icon>
                  ${this.secondaryBtnLabel}
                </wui-button>
              `:null}
      </wui-flex>

      ${this.isWalletConnect?r.html`
              <wui-flex .padding=${["0","5","5","5"]} justifyContent="center">
                <wui-link
                  @click=${this.onCopyUri}
                  variant="secondary"
                  icon="copy"
                  data-testid="wui-link-copy"
                >
                  Copy link
                </wui-link>
              </wui-flex>
            `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links></wui-flex>
      </wui-flex>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let e=this.shadowRoot?.querySelector("wui-button");e?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){u.ConnectionController.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){let e=er.ThemeController.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return r.html`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(n.CoreHelperUtil.copyToClopboard(this.uri),U.SnackController.showSuccess("Link copied"))}catch{U.SnackController.showError("Failed to copy")}}}eE.styles=ex,e$([(0,i.state)()],eE.prototype,"isRetrying",void 0),e$([(0,i.state)()],eE.prototype,"uri",void 0),e$([(0,i.state)()],eE.prototype,"error",void 0),e$([(0,i.state)()],eE.prototype,"ready",void 0),e$([(0,i.state)()],eE.prototype,"showRetry",void 0),e$([(0,i.state)()],eE.prototype,"label",void 0),e$([(0,i.state)()],eE.prototype,"secondaryBtnLabel",void 0),e$([(0,i.state)()],eE.prototype,"secondaryLabel",void 0),e$([(0,i.state)()],eE.prototype,"isLoading",void 0),e$([(0,d.property)({type:Boolean})],eE.prototype,"isMobile",void 0),e$([(0,d.property)()],eE.prototype,"onRetry",void 0);let eR=class extends eE{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),g.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:m.RouterController.state.view}})}async onConnectProxy(){try{this.error=!1;let{connectors:e}=f.ConnectorController.state,t=e.find(e=>"ANNOUNCED"===e.type&&e.info?.rdns===this.wallet?.rdns||"INJECTED"===e.type||e.name===this.wallet?.name);if(t)await u.ConnectionController.connectExternal(t,t.chain);else throw Error("w3m-connecting-wc-browser: No connector found");S.ModalController.close(),g.EventsController.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown",view:m.RouterController.state.view,walletRank:this.wallet?.order}})}catch(e){e instanceof I.AppKitError&&e.originalName===N.ErrorUtil.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?g.EventsController.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:e.message}}):g.EventsController.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};eR=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l}([(0,s.customElement)("w3m-connecting-wc-browser")],eR);let ek=class extends eE{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),g.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:m.RouterController.state.view}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;let{desktop_link:e,name:t}=this.wallet,{redirect:r,href:i}=n.CoreHelperUtil.formatNativeUrl(e,this.uri);u.ConnectionController.setWcLinking({name:t,href:i}),u.ConnectionController.setRecentWallet(this.wallet),n.CoreHelperUtil.openHref(r,"_blank")}catch{this.error=!0}}};ek=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l}([(0,s.customElement)("w3m-connecting-wc-desktop")],ek);var eT=e.i(360334),eA=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let eN=class extends eE{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=l.OptionsController.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;let{mobile_link:e,link_mode:t,name:r}=this.wallet,{redirect:i,redirectUniversalLink:o,href:l}=n.CoreHelperUtil.formatNativeUrl(e,this.uri,t);this.redirectDeeplink=i,this.redirectUniversalLink=o,this.target=n.CoreHelperUtil.isIframe()?"_top":"_self",u.ConnectionController.setWcLinking({name:r,href:l}),u.ConnectionController.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?n.CoreHelperUtil.openHref(this.redirectUniversalLink,this.target):n.CoreHelperUtil.openHref(this.redirectDeeplink,this.target)}catch(e){g.EventsController.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:e instanceof Error?e.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=eT.ConstantsUtil.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(u.ConnectionController.subscribeKey("wcUri",()=>{this.onHandleURI()})),g.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:m.RouterController.state.view}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){u.ConnectionController.setWcError(!1),this.onConnect?.()}};eA([(0,i.state)()],eN.prototype,"redirectDeeplink",void 0),eA([(0,i.state)()],eN.prototype,"redirectUniversalLink",void 0),eA([(0,i.state)()],eN.prototype,"target",void 0),eA([(0,i.state)()],eN.prototype,"preferUniversalLinks",void 0),eA([(0,i.state)()],eN.prototype,"isLoading",void 0),eN=eA([(0,s.customElement)("w3m-connecting-wc-mobile")],eN);var eI=t;e.i(864380);var eO=e.i(973134);function eS(e,t,r){return e!==t&&(e-t<0?t-e:e-t)<=r+.1}let eU={generate({uri:e,size:t,logoSize:i,padding:o=8,dotColor:n="var(--apkt-colors-black)"}){let l,a,s=[],c=(a=Math.sqrt((l=Array.prototype.slice.call(eO.default.create(e,{errorCorrectionLevel:"Q"}).modules.data,0)).length),l.reduce((e,t,r)=>(r%a==0?e.push([t]):e[e.length-1].push(t))&&e,[])),d=(t-2*o)/c.length,p=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];p.forEach(({x:e,y:t})=>{let i=(c.length-7)*d*e+o,l=(c.length-7)*d*t+o;for(let e=0;e<p.length;e+=1){let t=d*(7-2*e);s.push(r.svg`
            <rect
              fill=${2===e?"var(--apkt-colors-black)":"var(--apkt-colors-white)"}
              width=${0===e?t-10:t}
              rx= ${0===e?(t-10)*.45:.45*t}
              ry= ${0===e?(t-10)*.45:.45*t}
              stroke=${n}
              stroke-width=${10*(0===e)}
              height=${0===e?t-10:t}
              x= ${0===e?l+d*e+5:l+d*e}
              y= ${0===e?i+d*e+5:i+d*e}
            />
          `)}});let h=Math.floor((i+25)/d),u=c.length/2-h/2,f=c.length/2+h/2-1,g=[];c.forEach((e,t)=>{e.forEach((e,r)=>{!c[t][r]||t<7&&r<7||t>c.length-8&&r<7||t<7&&r>c.length-8||t>u&&t<f&&r>u&&r<f||g.push([t*d+d/2+o,r*d+d/2+o])})});let m={};return g.forEach(([e,t])=>{m[e]?m[e]?.push(t):m[e]=[t]}),Object.entries(m).map(([e,t])=>{let r=t.filter(e=>t.every(t=>!eS(e,t,d)));return[Number(e),r]}).forEach(([e,t])=>{t.forEach(t=>{s.push(r.svg`<circle cx=${e} cy=${t} fill=${n} r=${d/2.5} />`)})}),Object.entries(m).filter(([e,t])=>t.length>1).map(([e,t])=>{let r=t.filter(e=>t.some(t=>eS(e,t,d)));return[Number(e),r]}).map(([e,t])=>{t.sort((e,t)=>e<t?-1:1);let r=[];for(let e of t){let t=r.find(t=>t.some(t=>eS(e,t,d)));t?t.push(e):r.push([e])}return[e,r.map(e=>[e[0],e[e.length-1]])]}).forEach(([e,t])=>{t.forEach(([t,i])=>{s.push(r.svg`
              <line
                x1=${e}
                x2=${e}
                y1=${t}
                y2=${i}
                stroke=${n}
                stroke-width=${d/1.25}
                stroke-linecap="round"
              />
            `)})}),s}},eP=E.css`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    background-color: ${({colors:e})=>e.white};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
  }

  :host {
    border-radius: ${({borderRadius:e})=>e[4]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    box-shadow: inset 0 0 0 4px ${({tokens:e})=>e.theme.backgroundPrimary};
    border-radius: ${({borderRadius:e})=>e[6]};
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: #3396ff !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }

  wui-icon > svg {
    width: inherit;
    height: inherit;
  }
`;var eL=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let eB=class extends eI.LitElement{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`--local-size: ${this.size}px`,r.html`<wui-flex
      alignItems="center"
      justifyContent="center"
      class="wui-qr-code"
      direction="column"
      gap="4"
      width="100%"
      style="height: 100%"
    >
      ${this.templateVisual()} ${this.templateSvg()}
    </wui-flex>`}templateSvg(){return r.svg`
      <svg height=${this.size} width=${this.size}>
        ${eU.generate({uri:this.uri,size:this.size,logoSize:this.arenaClear?0:this.size/4})}
      </svg>
    `}templateVisual(){return this.imageSrc?r.html`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?r.html`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:r.html`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};eB.styles=[H.resetStyles,eP],eL([(0,d.property)()],eB.prototype,"uri",void 0),eL([(0,d.property)({type:Number})],eB.prototype,"size",void 0),eL([(0,d.property)()],eB.prototype,"theme",void 0),eL([(0,d.property)()],eB.prototype,"imageSrc",void 0),eL([(0,d.property)()],eB.prototype,"alt",void 0),eL([(0,d.property)({type:Boolean})],eB.prototype,"arenaClear",void 0),eL([(0,d.property)({type:Boolean})],eB.prototype,"farcaster",void 0),eB=eL([(0,s.customElement)("wui-qr-code")],eB);var eD=t;let e_=E.css`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({tokens:e})=>e.theme.foregroundSecondary} 0%,
      ${({tokens:e})=>e.theme.foregroundTertiary} 50%,
      ${({tokens:e})=>e.theme.foregroundSecondary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1s ease-in-out infinite;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;var eW=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let ej=class extends eD.LitElement{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",r.html`<slot></slot>`}};ej.styles=[e_],eW([(0,d.property)()],ej.prototype,"width",void 0),eW([(0,d.property)()],ej.prototype,"height",void 0),eW([(0,d.property)()],ej.prototype,"variant",void 0),eW([(0,d.property)({type:Boolean})],ej.prototype,"rounded",void 0),ej=eW([(0,s.customElement)("wui-shimmer")],ej),e.i(803596);let ez=E.css`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var eM=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let eH=class extends eE{constructor(){super(),this.basic=!1,this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate)}firstUpdated(){this.basic||g.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:m.RouterController.state.view}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),r.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","5","5","5"]}
        gap="5"
      >
        <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>
        <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let e=this.getBoundingClientRect().width-40,t=this.wallet?this.wallet.name:void 0;u.ConnectionController.setWcLinking(void 0),u.ConnectionController.setRecentWallet(this.wallet);let i=this.uri;if(this.wallet?.mobile_link){let{redirect:e}=n.CoreHelperUtil.formatNativeUrl(this.wallet?.mobile_link,this.uri,null);i=e}return r.html` <wui-qr-code
      size=${e}
      theme=${er.ThemeController.state.themeMode}
      uri=${i}
      imageSrc=${(0,p.ifDefined)(v.AssetUtil.getWalletImage(this.wallet))}
      color=${(0,p.ifDefined)(er.ThemeController.state.themeVariables["--w3m-qr-color"])}
      alt=${(0,p.ifDefined)(t)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){let e=!this.uri||!this.ready;return r.html`<wui-button
      .disabled=${e}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      Copy link
      <wui-icon size="sm" color="inherit" name="copy" slot="iconRight"></wui-icon>
    </wui-button>`}};eH.styles=ez,eM([(0,d.property)({type:Boolean})],eH.prototype,"basic",void 0),eH=eM([(0,s.customElement)("w3m-connecting-wc-qrcode")],eH);var eF=t;let eK=class extends eF.LitElement{constructor(){if(super(),this.wallet=m.RouterController.state.data?.wallet,!this.wallet)throw Error("w3m-connecting-wc-unsupported: No wallet provided");g.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:m.RouterController.state.view}})}render(){return r.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="5"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,p.ifDefined)(v.AssetUtil.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="md-regular" color="primary">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};eK=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l}([(0,s.customElement)("w3m-connecting-wc-unsupported")],eK);var eq=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let eV=class extends eE{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=eT.ConstantsUtil.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(u.ConnectionController.subscribeKey("wcUri",()=>{this.updateLoadingState()})),g.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:m.RouterController.state.view}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;let{webapp_link:e,name:t}=this.wallet,{redirect:r,href:i}=n.CoreHelperUtil.formatUniversalUrl(e,this.uri);u.ConnectionController.setWcLinking({name:t,href:i}),u.ConnectionController.setRecentWallet(this.wallet),n.CoreHelperUtil.openHref(r,"_blank")}catch{this.error=!0}}};eq([(0,i.state)()],eV.prototype,"isLoading",void 0),eV=eq([(0,s.customElement)("w3m-connecting-wc-web")],eV);let eY=E.css`
  :host([data-mobile-fullscreen='true']) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :host([data-mobile-fullscreen='true']) wui-ux-by-reown {
    margin-top: auto;
  }
`;var eJ=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let eG=class extends A.LitElement{constructor(){super(),this.wallet=m.RouterController.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!l.OptionsController.state.siwx,this.remoteFeatures=l.OptionsController.state.remoteFeatures,this.displayBranding=!0,this.basic=!1,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(l.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l.OptionsController.state.enableMobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),r.html`
      ${this.headerTemplate()}
      <div class="platform-container">${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding&&this.displayBranding?r.html`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(e=!1){if("browser"!==this.platform&&(!l.OptionsController.state.manualWCControl||e))try{let{wcPairingExpiry:t,status:r}=u.ConnectionController.state,{redirectView:i}=m.RouterController.state.data??{};if(e||l.OptionsController.state.enableEmbedded||n.CoreHelperUtil.isPairingExpired(t)||"connecting"===r){let e=u.ConnectionController.getConnections(O.ChainController.state.activeChain),t=this.remoteFeatures?.multiWallet,r=e.length>0;await u.ConnectionController.connectWalletConnect({cache:"never"}),this.isSiwxEnabled||(r&&t?(m.RouterController.replace("ProfileWallets"),U.SnackController.showSuccess("New Wallet Added")):i?m.RouterController.replace(i):S.ModalController.close())}}catch(e){if(e instanceof Error&&e.message.includes("An error occurred when attempting to switch chain")&&!l.OptionsController.state.enableNetworkSwitch&&O.ChainController.state.activeChain){O.ChainController.setActiveCaipNetwork(j.getUnsupportedNetwork(`${O.ChainController.state.activeChain}:${O.ChainController.state.activeCaipNetwork?.id}`)),O.ChainController.showUnsupportedChainUI();return}e instanceof I.AppKitError&&e.originalName===N.ErrorUtil.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?g.EventsController.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:e.message}}):g.EventsController.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),u.ConnectionController.setWcError(!0),U.SnackController.showError(e.message??"Connection error"),u.ConnectionController.resetWcConnection(),m.RouterController.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;let{mobile_link:e,desktop_link:t,webapp_link:r,injected:i,rdns:o}=this.wallet,a=i?.map(({injected_id:e})=>e).filter(Boolean),s=[...o?[o]:a??[]],c=!l.OptionsController.state.isUniversalProvider&&s.length,d=u.ConnectionController.checkInstalled(s),p=c&&d,h=t&&!n.CoreHelperUtil.isMobile();p&&!O.ChainController.state.noAdapters&&this.platforms.push("browser"),e&&this.platforms.push(n.CoreHelperUtil.isMobile()?"mobile":"qrcode"),r&&this.platforms.push("web"),h&&this.platforms.push("desktop"),p||!c||O.ChainController.state.noAdapters||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return r.html`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return r.html`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return r.html`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return r.html`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return r.html`<w3m-connecting-wc-qrcode ?basic=${this.basic}></w3m-connecting-wc-qrcode>`;default:return r.html`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?r.html`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){let t=this.shadowRoot?.querySelector("div");t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};eG.styles=eY,eJ([(0,i.state)()],eG.prototype,"platform",void 0),eJ([(0,i.state)()],eG.prototype,"platforms",void 0),eJ([(0,i.state)()],eG.prototype,"isSiwxEnabled",void 0),eJ([(0,i.state)()],eG.prototype,"remoteFeatures",void 0),eJ([(0,d.property)({type:Boolean})],eG.prototype,"displayBranding",void 0),eJ([(0,d.property)({type:Boolean})],eG.prototype,"basic",void 0),eG=eJ([(0,s.customElement)("w3m-connecting-wc-view")],eG);var eQ=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let eX=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.isMobile=n.CoreHelperUtil.isMobile(),this.remoteFeatures=l.OptionsController.state.remoteFeatures,this.unsubscribe.push(l.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(this.isMobile){let{featured:e,recommended:t}=o.ApiController.state,{customWallets:i}=l.OptionsController.state,n=a.StorageUtil.getRecentWallets(),s=e.length||t.length||i?.length||n.length;return r.html`<wui-flex flexDirection="column" gap="2" .margin=${["1","3","3","3"]}>
        ${s?r.html`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return r.html`<wui-flex flexDirection="column" .padding=${["0","0","4","0"]}>
        <w3m-connecting-wc-view ?basic=${!0} .displayBranding=${!1}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${["0","3","0","3"]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?r.html` <wui-flex flexDirection="column" .padding=${["1","0","1","0"]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`:null}};eQ([(0,i.state)()],eX.prototype,"isMobile",void 0),eQ([(0,i.state)()],eX.prototype,"remoteFeatures",void 0),eX=eQ([(0,s.customElement)("w3m-connecting-wc-basic-view")],eX),e.s(["W3mConnectingWcBasicView",()=>eX],612639);var eZ=t,e0=t,e1=t;let{I:e3}=r._$LH;var e2=e.i(391909);let e5=(e,t)=>{let r=e._$AN;if(void 0===r)return!1;for(let e of r)e._$AO?.(t,!1),e5(e,t);return!0},e4=e=>{let t,r;do{if(void 0===(t=e._$AM))break;(r=t._$AN).delete(e),e=t}while(0===r?.size)},e8=e=>{for(let t;t=e._$AM;e=t){let r=t._$AN;if(void 0===r)t._$AN=r=new Set;else if(r.has(e))break;r.add(e),e7(t)}};function e6(e){void 0!==this._$AN?(e4(this),this._$AM=e,e8(this)):this._$AM=e}function e9(e,t=!1,r=0){let i=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(t)if(Array.isArray(i))for(let e=r;e<i.length;e++)e5(i[e],!1),e4(i[e]);else null!=i&&(e5(i,!1),e4(i));else e5(this,e)}let e7=e=>{e.type==e2.PartType.CHILD&&(e._$AP??=e9,e._$AQ??=e6)};class te extends e2.Directive{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,r){super._$AT(e,t,r),e8(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(e5(this,e),e4(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}let tt=()=>new tr;class tr{}let ti=new WeakMap,to=(0,e2.directive)(class extends te{render(e){return r.nothing}update(e,[t]){let i=t!==this.G;return i&&void 0!==this.G&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),r.nothing}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,r=ti.get(t);void 0===r&&(r=new WeakMap,ti.set(t,r)),void 0!==r.get(this.G)&&this.G.call(this.ht,void 0),r.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?ti.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),tn=E.css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    user-select: none;
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      border ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      width ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      height ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({colors:e})=>e.neutrals300};
    border-radius: ${({borderRadius:e})=>e.round};
    border: 1px solid transparent;
    will-change: border;
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      border ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      width ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      height ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  span:before {
    content: '';
    position: absolute;
    background-color: ${({colors:e})=>e.white};
    border-radius: 50%;
  }

  /* -- Sizes --------------------------------------------------------- */
  label[data-size='lg'] {
    width: 48px;
    height: 32px;
  }

  label[data-size='md'] {
    width: 40px;
    height: 28px;
  }

  label[data-size='sm'] {
    width: 32px;
    height: 22px;
  }

  label[data-size='lg'] > span:before {
    height: 24px;
    width: 24px;
    left: 4px;
    top: 3px;
  }

  label[data-size='md'] > span:before {
    height: 20px;
    width: 20px;
    left: 4px;
    top: 3px;
  }

  label[data-size='sm'] > span:before {
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
  }

  /* -- Focus states --------------------------------------------------- */
  input:focus-visible:not(:checked) + span,
  input:focus:not(:checked) + span {
    border: 1px solid ${({tokens:e})=>e.core.iconAccentPrimary};
    background-color: ${({tokens:e})=>e.theme.textTertiary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  input:focus-visible:checked + span,
  input:focus:checked + span {
    border: 1px solid ${({tokens:e})=>e.core.iconAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  input:checked + span {
    background-color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  label[data-size='lg'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='md'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='sm'] > input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }

  /* -- Hover states ------------------------------------------------------- */
  label:hover > input:not(:checked):not(:disabled) + span {
    background-color: ${({colors:e})=>e.neutrals400};
  }

  label:hover > input:checked:not(:disabled) + span {
    background-color: ${({colors:e})=>e.accent080};
  }

  /* -- Disabled state --------------------------------------------------- */
  label:has(input:disabled) {
    pointer-events: none;
    user-select: none;
  }

  input:not(:checked):disabled + span {
    background-color: ${({colors:e})=>e.neutrals700};
  }

  input:checked:disabled + span {
    background-color: ${({colors:e})=>e.neutrals700};
  }

  input:not(:checked):disabled + span::before {
    background-color: ${({colors:e})=>e.neutrals400};
  }

  input:checked:disabled + span::before {
    background-color: ${({tokens:e})=>e.theme.textTertiary};
  }
`;var tl=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let ta=class extends e1.LitElement{constructor(){super(...arguments),this.inputElementRef=tt(),this.checked=!1,this.disabled=!1,this.size="md"}render(){return r.html`
      <label data-size=${this.size}>
        <input
          ${to(this.inputElementRef)}
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};ta.styles=[H.resetStyles,H.elementStyles,tn],tl([(0,d.property)({type:Boolean})],ta.prototype,"checked",void 0),tl([(0,d.property)({type:Boolean})],ta.prototype,"disabled",void 0),tl([(0,d.property)()],ta.prototype,"size",void 0),ta=tl([(0,s.customElement)("wui-toggle")],ta);let ts=E.css`
  :host {
    height: auto;
  }

  :host > wui-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({spacing:e})=>e["2"]};
    padding: ${({spacing:e})=>e["2"]} ${({spacing:e})=>e["3"]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e["4"]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var tc=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let td=class extends e0.LitElement{constructor(){super(...arguments),this.checked=!1}render(){return r.html`
      <wui-flex>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-toggle
          ?checked=${this.checked}
          size="sm"
          @switchChange=${this.handleToggleChange.bind(this)}
        ></wui-toggle>
      </wui-flex>
    `}handleToggleChange(e){e.stopPropagation(),this.checked=e.detail,this.dispatchSwitchEvent()}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("certifiedSwitchChange",{detail:this.checked,bubbles:!0,composed:!0}))}};td.styles=[H.resetStyles,H.elementStyles,ts],tc([(0,d.property)({type:Boolean})],td.prototype,"checked",void 0),td=tc([(0,s.customElement)("wui-certified-switch")],td);var tp=t,th=t;let tu=E.css`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({spacing:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.textPrimary};
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[3]} ${({spacing:e})=>e[10]};
    font-size: ${({textSize:e})=>e.large};
    line-height: ${({typography:e})=>e["lg-regular"].lineHeight};
    letter-spacing: ${({typography:e})=>e["lg-regular"].letterSpacing};
    font-weight: ${({fontWeight:e})=>e.regular};
    font-family: ${({fontFamily:e})=>e.regular};
  }

  input[data-size='lg'] {
    padding: ${({spacing:e})=>e[4]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[4]} ${({spacing:e})=>e[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({spacing:e})=>e[4]};
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:e})=>e[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({borderRadius:e})=>e[2]};
    color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({spacing:e})=>e[12]};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* -- Keyframes --------------------------------------------------- */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;var tf=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let tg=class extends th.LitElement{constructor(){super(...arguments),this.inputElementRef=tt(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return r.html` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${to(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${(0,p.ifDefined)(this.enterKeyHint)}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          @input=${this.dispatchInputChangeEvent.bind(this)}
          @keydown=${this.onKeyDown}
          .value=${this.value||""}
        />
        ${this.templateSubmitButton()}
        <slot class="wui-input-text-slot"></slot>
      </div>
      ${this.templateError()} ${this.templateWarning()}`}templateLeftIcon(){return this.icon?r.html`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}templateSubmitButton(){return this.onSubmit?r.html`<button
        class="wui-input-text-submit-button ${this.loading?"loading":""}"
        @click=${this.onSubmit?.bind(this)}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.loading?r.html`<wui-icon name="spinner" size="md"></wui-icon>`:r.html`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`:null}templateError(){return this.errorText?r.html`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?r.html`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};tg.styles=[H.resetStyles,H.elementStyles,tu],tf([(0,d.property)()],tg.prototype,"icon",void 0),tf([(0,d.property)({type:Boolean})],tg.prototype,"disabled",void 0),tf([(0,d.property)({type:Boolean})],tg.prototype,"loading",void 0),tf([(0,d.property)()],tg.prototype,"placeholder",void 0),tf([(0,d.property)()],tg.prototype,"type",void 0),tf([(0,d.property)()],tg.prototype,"value",void 0),tf([(0,d.property)()],tg.prototype,"errorText",void 0),tf([(0,d.property)()],tg.prototype,"warningText",void 0),tf([(0,d.property)()],tg.prototype,"onSubmit",void 0),tf([(0,d.property)()],tg.prototype,"size",void 0),tf([(0,d.property)({attribute:!1})],tg.prototype,"onKeyDown",void 0),tg=tf([(0,s.customElement)("wui-input-text")],tg);let tm=E.css`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.iconDefault};
    cursor: pointer;
    padding: ${({spacing:e})=>e[2]};
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
  }

  @media (hover: hover) {
    wui-icon:hover {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }
`;var tw=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let tb=class extends tp.LitElement{constructor(){super(...arguments),this.inputComponentRef=tt(),this.inputValue=""}render(){return r.html`
      <wui-input-text
        ${to(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
        @inputChange=${this.onInputChange}
      >
        ${this.inputValue?r.html`<wui-icon
              @click=${this.clearValue}
              color="inherit"
              size="sm"
              name="close"
            ></wui-icon>`:null}
      </wui-input-text>
    `}onInputChange(e){this.inputValue=e.detail||""}clearValue(){let e=this.inputComponentRef.value,t=e?.inputElementRef.value;t&&(t.value="",this.inputValue="",t.focus(),t.dispatchEvent(new Event("input")))}};tb.styles=[H.resetStyles,tm],tw([(0,d.property)()],tb.prototype,"inputValue",void 0),tb=tw([(0,s.customElement)("wui-search-bar")],tb);var ty=t,tC=t;let tv=r.svg`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,tx=E.css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    row-gap: ${({spacing:e})=>e[2]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[5]};
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--apkt-path-network);
    clip-path: var(--apkt-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: ${({tokens:e})=>e.theme.foregroundSecondary};
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var t$=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let tE=class extends tC.LitElement{constructor(){super(...arguments),this.type="wallet"}render(){return r.html`
      ${this.shimmerTemplate()}
      <wui-shimmer width="80px" height="20px"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?r.html` <wui-shimmer data-type=${this.type} width="48px" height="54px"></wui-shimmer>
        ${tv}`:r.html`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}};tE.styles=[H.resetStyles,H.elementStyles,tx],t$([(0,d.property)()],tE.prototype,"type",void 0),tE=t$([(0,s.customElement)("wui-card-select-loader")],tE);var tR=t,tk=e.i(592057);let tT=tk.css`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var tA=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let tN=class extends tR.LitElement{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--apkt-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--apkt-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--apkt-spacing-${this.gap})`};
      padding-top: ${this.padding&&ef.UiHelperUtil.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&ef.UiHelperUtil.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&ef.UiHelperUtil.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&ef.UiHelperUtil.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&ef.UiHelperUtil.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&ef.UiHelperUtil.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&ef.UiHelperUtil.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&ef.UiHelperUtil.getSpacingStyles(this.margin,3)};
    `,r.html`<slot></slot>`}};tN.styles=[H.resetStyles,tT],tA([(0,d.property)()],tN.prototype,"gridTemplateRows",void 0),tA([(0,d.property)()],tN.prototype,"gridTemplateColumns",void 0),tA([(0,d.property)()],tN.prototype,"justifyItems",void 0),tA([(0,d.property)()],tN.prototype,"alignItems",void 0),tA([(0,d.property)()],tN.prototype,"justifyContent",void 0),tA([(0,d.property)()],tN.prototype,"alignContent",void 0),tA([(0,d.property)()],tN.prototype,"columnGap",void 0),tA([(0,d.property)()],tN.prototype,"rowGap",void 0),tA([(0,d.property)()],tN.prototype,"gap",void 0),tA([(0,d.property)()],tN.prototype,"padding",void 0),tA([(0,d.property)()],tN.prototype,"margin",void 0),tN=tA([(0,s.customElement)("wui-grid")],tN);var tI=e.i(533659),tO=t;let tS=E.css`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: ${({spacing:e})=>e["2"]};
    padding: ${({spacing:e})=>e["3"]} ${({spacing:e})=>e["0"]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: clamp(0px, ${({borderRadius:e})=>e["4"]}, 20px);
    transition:
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: ${({tokens:e})=>e.theme.textPrimary};
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  button:disabled > wui-flex > wui-text {
    color: ${({tokens:e})=>e.core.glass010};
  }

  [data-selected='true'] {
    background-color: ${({colors:e})=>e.accent020};
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: ${({colors:e})=>e.accent010};
    }
  }

  [data-selected='true']:active:enabled {
    background-color: ${({colors:e})=>e.accent010};
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var tU=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let tP=class extends tO.LitElement{constructor(){super(),this.observer=new IntersectionObserver(()=>void 0),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.isImpressed=!1,this.explorerId="",this.walletQuery="",this.certified=!1,this.displayIndex=0,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?(this.visible=!0,this.fetchImageSrc(),this.sendImpressionEvent()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){let e=this.wallet?.badge_type==="certified";return r.html`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="1">
          <wui-text
            variant="md-regular"
            color="inherit"
            class=${(0,p.ifDefined)(e?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e?r.html`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return(this.visible||this.imageSrc)&&!this.imageLoading?r.html`
      <wui-wallet-image
        size="lg"
        imageSrc=${(0,p.ifDefined)(this.imageSrc)}
        name=${(0,p.ifDefined)(this.wallet?.name)}
        .installed=${this.wallet?.installed??!1}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `:this.shimmerTemplate()}shimmerTemplate(){return r.html`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}async fetchImageSrc(){!this.wallet||(this.imageSrc=v.AssetUtil.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await v.AssetUtil.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}sendImpressionEvent(){this.wallet&&!this.isImpressed&&(this.isImpressed=!0,g.EventsController.sendWalletImpressionEvent({name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.explorerId,view:m.RouterController.state.view,query:this.walletQuery,certified:this.certified,displayIndex:this.displayIndex}))}};tP.styles=tS,tU([(0,i.state)()],tP.prototype,"visible",void 0),tU([(0,i.state)()],tP.prototype,"imageSrc",void 0),tU([(0,i.state)()],tP.prototype,"imageLoading",void 0),tU([(0,i.state)()],tP.prototype,"isImpressed",void 0),tU([(0,d.property)()],tP.prototype,"explorerId",void 0),tU([(0,d.property)()],tP.prototype,"walletQuery",void 0),tU([(0,d.property)()],tP.prototype,"certified",void 0),tU([(0,d.property)()],tP.prototype,"displayIndex",void 0),tU([(0,d.property)({type:Object})],tP.prototype,"wallet",void 0),tP=tU([(0,s.customElement)("w3m-all-wallets-list-item")],tP);let tL=E.css`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  w3m-all-wallets-list-item {
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-inout-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-loading-spinner {
    padding-top: ${({spacing:e})=>e["4"]};
    padding-bottom: ${({spacing:e})=>e["4"]};
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var tB=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let tD="local-paginator",t_=class extends ty.LitElement{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!o.ApiController.state.wallets.length,this.wallets=o.ApiController.state.wallets,this.recommended=o.ApiController.state.recommended,this.featured=o.ApiController.state.featured,this.filteredWallets=o.ApiController.state.filteredWallets,this.mobileFullScreen=l.OptionsController.state.enableMobileFullScreen,this.unsubscribe.push(o.ApiController.subscribeKey("wallets",e=>this.wallets=e),o.ApiController.subscribeKey("recommended",e=>this.recommended=e),o.ApiController.subscribeKey("featured",e=>this.featured=e),o.ApiController.subscribeKey("filteredWallets",e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),r.html`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","3","3","3"]}
        gap="2"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;let e=this.shadowRoot?.querySelector("wui-grid");e&&(await o.ApiController.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,t){return[...Array(e)].map(()=>r.html`
        <wui-card-select-loader type="wallet" id=${(0,p.ifDefined)(t)}></wui-card-select-loader>
      `)}getWallets(){let e=[...this.featured,...this.recommended];this.filteredWallets?.length>0?e.push(...this.filteredWallets):e.push(...this.wallets);let t=n.CoreHelperUtil.uniqueBy(e,"id"),r=tI.WalletUtil.markWalletsAsInstalled(t);return tI.WalletUtil.markWalletsWithDisplayIndex(r)}walletsTemplate(){return this.getWallets().map((e,t)=>r.html`
        <w3m-all-wallets-list-item
          data-testid="wallet-search-item-${e.id}"
          @click=${()=>this.onConnectWallet(e)}
          .wallet=${e}
          explorerId=${e.id}
          certified=${"certified"===this.badge}
          displayIndex=${t}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){let{wallets:e,recommended:t,featured:r,count:i,mobileFilteredOutWalletsLength:n}=o.ApiController.state,l=window.innerWidth<352?3:4,a=e.length+t.length,s=Math.ceil(a/l)*l-a+l;return(s-=e.length?r.length%l:0,0===i&&r.length>0)?null:0===i||[...r,...e,...t].length<i-(n??0)?this.shimmerTemplate(s,tD):null}createPaginationObserver(){let e=this.shadowRoot?.querySelector(`#${tD}`);e&&(this.paginationObserver=new IntersectionObserver(([e])=>{if(e?.isIntersecting&&!this.loading){let{page:e,count:t,wallets:r}=o.ApiController.state;r.length<t&&o.ApiController.fetchWalletsByPage({page:e+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){f.ConnectorController.selectWalletConnector(e)}};t_.styles=tL,tB([(0,i.state)()],t_.prototype,"loading",void 0),tB([(0,i.state)()],t_.prototype,"wallets",void 0),tB([(0,i.state)()],t_.prototype,"recommended",void 0),tB([(0,i.state)()],t_.prototype,"featured",void 0),tB([(0,i.state)()],t_.prototype,"filteredWallets",void 0),tB([(0,i.state)()],t_.prototype,"badge",void 0),tB([(0,i.state)()],t_.prototype,"mobileFullScreen",void 0),t_=tB([(0,s.customElement)("w3m-all-wallets-list")],t_);var tW=t;let tj=tk.css`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
    height: auto;
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var tz=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let tM=class extends tW.LitElement{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.mobileFullScreen=l.OptionsController.state.enableMobileFullScreen,this.query=""}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.onSearch(),this.loading?r.html`<wui-loading-spinner color="accent-primary"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await o.ApiController.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){let{search:e}=o.ApiController.state,t=tI.WalletUtil.markWalletsAsInstalled(e);return e.length?r.html`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","3","3","3"]}
        rowGap="4"
        columngap="2"
        justifyContent="space-between"
      >
        ${t.map((e,t)=>r.html`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(e)}
              .wallet=${e}
              data-testid="wallet-search-item-${e.id}"
              explorerId=${e.id}
              certified=${"certified"===this.badge}
              walletQuery=${this.query}
              displayIndex=${t}
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:r.html`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="3"
          flexDirection="column"
        >
          <wui-icon-box size="lg" color="default" icon="wallet"></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="secondary" variant="md-medium">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){f.ConnectorController.selectWalletConnector(e)}};tM.styles=tj,tz([(0,i.state)()],tM.prototype,"loading",void 0),tz([(0,i.state)()],tM.prototype,"mobileFullScreen",void 0),tz([(0,d.property)()],tM.prototype,"query",void 0),tz([(0,d.property)()],tM.prototype,"badge",void 0),tM=tz([(0,s.customElement)("w3m-all-wallets-search")],tM);var tH=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let tF=class extends eZ.LitElement{constructor(){super(...arguments),this.search="",this.badge=void 0,this.onDebouncedSearch=n.CoreHelperUtil.debounce(e=>{this.search=e})}render(){let e=this.search.length>=2;return r.html`
      <wui-flex .padding=${["1","3","3","3"]} gap="2" alignItems="center">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${"certified"===this.badge}
          @certifiedSwitchChange=${this.onCertifiedSwitchChange.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?r.html`<w3m-all-wallets-search
            query=${this.search}
            .badge=${this.badge}
          ></w3m-all-wallets-search>`:r.html`<w3m-all-wallets-list .badge=${this.badge}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onCertifiedSwitchChange(e){e.detail?(this.badge="certified",U.SnackController.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})):this.badge=void 0}qrButtonTemplate(){return n.CoreHelperUtil.isMobile()?r.html`
        <wui-icon-box
          size="xl"
          iconSize="xl"
          color="accent-primary"
          icon="qrCode"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){m.RouterController.push("ConnectingWalletConnect")}};tH([(0,i.state)()],tF.prototype,"search",void 0),tH([(0,i.state)()],tF.prototype,"badge",void 0),tF=tH([(0,s.customElement)("w3m-all-wallets-view")],tF),e.s(["W3mAllWalletsView",()=>tF],210149);var tK=t,tq=t;let tV=E.css`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:e})=>e[3]};
    width: 100%;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      scale ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, scale;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-image {
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var tY=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l};let tJ=class extends tq.LitElement{constructor(){super(...arguments),this.imageSrc="google",this.loading=!1,this.disabled=!1,this.rightIcon=!0,this.rounded=!1,this.fullSize=!1}render(){return this.dataset.rounded=this.rounded?"true":"false",r.html`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        tabindex=${(0,p.ifDefined)(this.tabIdx)}
      >
        <wui-flex gap="2" alignItems="center">
          ${this.templateLeftIcon()}
          <wui-flex gap="1">
            <slot></slot>
          </wui-flex>
        </wui-flex>
        ${this.templateRightIcon()}
      </button>
    `}templateLeftIcon(){return this.icon?r.html`<wui-image
        icon=${this.icon}
        iconColor=${(0,p.ifDefined)(this.iconColor)}
        ?boxed=${!0}
        ?rounded=${this.rounded}
      ></wui-image>`:r.html`<wui-image
      ?boxed=${!0}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      src=${this.imageSrc}
    ></wui-image>`}templateRightIcon(){return this.rightIcon?this.loading?r.html`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:r.html`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`:null}};tJ.styles=[H.resetStyles,H.elementStyles,tV],tY([(0,d.property)()],tJ.prototype,"imageSrc",void 0),tY([(0,d.property)()],tJ.prototype,"icon",void 0),tY([(0,d.property)()],tJ.prototype,"iconColor",void 0),tY([(0,d.property)({type:Boolean})],tJ.prototype,"loading",void 0),tY([(0,d.property)()],tJ.prototype,"tabIdx",void 0),tY([(0,d.property)({type:Boolean})],tJ.prototype,"disabled",void 0),tY([(0,d.property)({type:Boolean})],tJ.prototype,"rightIcon",void 0),tY([(0,d.property)({type:Boolean})],tJ.prototype,"rounded",void 0),tY([(0,d.property)({type:Boolean})],tJ.prototype,"fullSize",void 0),tJ=tY([(0,s.customElement)("wui-list-item")],tJ);let tG=class extends tK.LitElement{constructor(){super(...arguments),this.wallet=m.RouterController.state.data?.wallet}render(){if(!this.wallet)throw Error("w3m-downloads-view");return r.html`
      <wui-flex gap="2" flexDirection="column" .padding=${["3","3","4","3"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?r.html`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?r.html`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?r.html`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?r.html`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="md-medium" color="primary">Website</wui-text>
      </wui-list-item>
    `:null}openStore(e){e.href&&this.wallet&&(g.EventsController.sendEvent({type:"track",event:"GET_WALLET",properties:{name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.wallet.id,type:e.type}}),n.CoreHelperUtil.openHref(e.href,"_blank"))}onChromeStore(){this.wallet?.chrome_store&&this.openStore({href:this.wallet.chrome_store,type:"chrome_store"})}onAppStore(){this.wallet?.app_store&&this.openStore({href:this.wallet.app_store,type:"app_store"})}onPlayStore(){this.wallet?.play_store&&this.openStore({href:this.wallet.play_store,type:"play_store"})}onHomePage(){this.wallet?.homepage&&this.openStore({href:this.wallet.homepage,type:"homepage"})}};tG=function(e,t,r,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,r,l):o(t,r))||l);return n>3&&l&&Object.defineProperty(t,r,l),l}([(0,s.customElement)("w3m-downloads-view")],tG),e.s(["W3mDownloadsView",()=>tG],108201),e.s([],719152),e.i(719152),e.i(612639),e.i(210149),e.i(108201),e.s(["W3mAllWalletsView",()=>tF,"W3mConnectingWcBasicView",()=>eX,"W3mDownloadsView",()=>tG],533143)}]);