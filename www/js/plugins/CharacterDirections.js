//=============================================================================
// CharacterDirections.js
//=============================================================================
// Copyright (c) 2017 Thirop
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//============================================================================= 
// Version
// 1.0.0 2017/12/15 初版

var Imported = Imported || {};
Imported.CharacterDirections = true;

//=============================================================================
/*:
 * @plugindesc キャラ演出用のスクリプトコマンド集
 * @author Thirop
 */
//============================================================================= 

(function(){

//=============================================================================
// Game_CharacterBase
//=============================================================================
var _Game_CharacterBase_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_Game_CharacterBase_update.call(this);

	this.updateSuccessiveParameters();
};

Game_CharacterBase.prototype.updateSuccessiveParameters = function(){
	//updateOpacity
	if(this._opacityDur){
		this._opacityDur -= 1;
		this._opacity += this._opacitySpd;
		if(this._opacityDur<=0){
			delete this._opacityDur;
			delete this._opacitySpd;
		}
	}

	//updateScale
	if(this._scaleDur){
		this._scaleDur -= 1;
		this._scaleX += this._scaleXSpd;
		this._scaleY += this._scaleYSpd;
		if(this._scaleDur<=0){
			delete this._scaleDur;
			delete this._scaleXSpd;
			delete this._scaleYSpd;
		}
	}

	//updateAngle
	if(this._angleDur){
		this._angleDur -= 1;
		this._angle += this._angleSpd;
		if(this._angleDur<=0){
			delete this._angleDur;
			delete this._angleSpd;
			delete this._anchorCenter;
		}
	}
};




/* startOpacity
===================================*/
Game_CharacterBase.prototype.startOpacity = function(duration,opacity){
	opacity = Number(opacity) || 0;
	if(duration===undefined)duration=10;
	duration = Number(duration);

	if(duration<=0){
		this._opacity = opacity;
		delete this._opacityDur;
		delete this._opacitySpd;
	}else{
		this._opacitySpd = (opacity-this._opacity)/duration;
		this._opacityDur = duration;
	}
};



/* startScale
===================================*/
Game_CharacterBase.prototype.startScale = function(duration,x,y){
	if(this._scaleX===undefined || this._scaleY===undefined)return;

	if(x===undefined)x = this._scaleX;
	if(y===undefined)y = this._scaleY;
	if(duration===undefined)duration = 10;

	if(duration<=0){
		this._scaleX = x;
		this._scaleY = y;
		delete this._scaleXSpd;
		delete this._scaleYSpd;
		delete this._scaleDur;
	}else{
		this._scaleXSpd = (x-this._scaleX)/duration;
		this._scaleYSpd = (y-this._scaleY)/duration;
		this._scaleDur = duration;
	}
};


/* startAngle
===================================*/
// noRelative：trueで絶対値を指定（デフォルトはfalseで相対値の指定
// this.startAngle(10,20)は10フレームでangleを+20
// this.startAngle(10,20,true)は10フレームでangleが20°まで変化
//
// noAnchorCenter：trueで回転の軸を中心に修正しない。（デフォルトはfalseで回転軸を中心に修正
// this.startAngle(10,20,false,true)は
// 10フレームで+20°、回転軸を修正せずに足元を中心に回転
Game_CharacterBase.prototype.startAngle = function(duration,angle,noRelative,noAnchorCenter){
	if(this._angle === undefined)return;

	noRelative = noRelative||false;
	angle = Number(angle) || 360;
	if(duration===undefined)duration=10;
	duration = Number(duration);

	this._anchorCenter = (noAnchorCenter===true) ? false : true;

	if(duration===0){
		this._angle = noRelative ? angle : (this._angel+angle);
		delete this._angleSpd;
		delete this._angleDur;
		delete this._anchorCenter;
	}else{
		duration = duration||10;
		if(noRelative){
			this._angleSpd = (angle-this._angle)/duration;
		}else{
			this._angleSpd = angle/duration;
		}
		this._angleDur = duration;
	}

	this._anchorDiffY = -this.height*0.5;
};




/* walkTo
===================================*/
// x,y座標まで移動する。
// isRelative：trueにすると相対座標となる
// this.walkTo(1,2)は座標(1,2)まで移動
// this.walkto(1,2,true)は右に１歩、上に２歩歩く
// ステップアニメがONになるので移動後は自分でOFFにすること
// キャラの当たり判定は実行直後に目的地に設定されるので注意
// イベント内の演出でのみ使うのがベター
Game_CharacterBase.prototype.walkTo = function(x,y,isRelative){
	if(isRelative){
		x += this._x;
		y += this._y;
	}
	this._stepAnime = true;
	this.turnTowardCharacter({x:x,y:y});
	this._x = x;
	this._y = y;
};


/* jumpEx
===================================*/
Game_CharacterBase.prototype.jumpEx = function(xPlus, yPlus,baseHeight,rotateNum) {
    if(baseHeight===undefined||baseHeight===null||baseHeight===false){
    	baseHeight = 10;
    }

    if (Math.abs(xPlus) > Math.abs(yPlus)) {
        if (xPlus !== 0) {
            this.setDirection(xPlus < 0 ? 4 : 6);
        }
    } else {
        if (yPlus !== 0) {
            this.setDirection(yPlus < 0 ? 8 : 2);
        }
    }
    this._x += xPlus;
    this._y += yPlus;
    var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
    this._jumpPeak = baseHeight + distance - this._moveSpeed;
    this._jumpCount = this._jumpPeak * 2;
    this.resetStopCount();
    this.straighten();

    if(rotateNum){
    	var dAngle = 360 * Number(rotateNum) * (this._direction===6 ? 1 : -1);
    	this.startAngle(this._jumpCount, dAngle);
    }
};





//=============================================================================
// Sprite_CharacterBase
//=============================================================================
var _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
Sprite_Character.prototype.updateOther = function(){
    _Sprite_Character_updateOther.call(this);
    if(this._character._anchorCenter){
    	if(this._originalAnchorY === undefined){
    		this._originalAnchorY = this.anchor.y;
    	}
	    this.anchor.y = 0.5;
    }else{
    	if(this._originalAnchorY!==undefined){
	    	this.anchor.y = this._originalAnchorY;
	    	delete this._originalAnchorY;
    	}
    }
};

var _Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	_Sprite_Character_updatePosition.call(this);
    this.y -= (1-this.anchor.y) * this.height;
};


})();
