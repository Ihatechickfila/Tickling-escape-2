//=============================================================================
// RPGツクールMV - LL_MenuScreenCustomMV.js v1.1.1
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MV
 * @plugindesc メニュー画面レイアウトをカスタマイズします。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-menuscreencustom/
 * @base LL_MenuScreenBase
 * @orderAfter LL_MenuScreenBase
 *
 * @help LL_MenuScreenCustom.js
 *
 * メニュー画面レイアウトをカスタマイズします。
 * 顔グラフィックの代わりに立ち絵を表示することもできます。
 * ※表示する立ち絵リストは「LL_MenuScreenBase」で設定してください。
 *
 * 立ち絵が上手く表示されない場合:
 *   何も表示されない場合は、X・Y座標始点のマイナス値を大きくしてみるか、
 *   拡大率を小さくしてみてください。
 *   顔グラフィックが表示されている時は、立ち絵リストが紐づけできていません。
 *   立ち絵リストが正しく設定されているか確認してみてください。
 *
 * ヘルプウィンドウ:
 *   ヘルプウィンドウの左上と右上に任意の情報を表示できます。
 *   表示する内容（値）はスクリプトで記述してください。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2020/12/08
 *
 * @param numVisibleRows
 * @text アクター行数
 * @desc アクター一覧画面の行数です。 (推奨値: 1～2)
 * @default 2
 * @min 1
 * @max 10
 * @type number
 *
 * @param maxCols
 * @text アクター列数
 * @desc アクター一覧画面の列数です。 (推奨値: 1～2)
 * @default 2
 * @min 1
 * @max 10
 * @type number
 *
 * @param layoutSettings
 * @text 表示位置の設定
 * @desc ※この項目は使用しません
 *
 * @param actorNameLH
 * @text アクター名表示位置
 * @desc アクター名を上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 0)
 * @default 0
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorLevelLH
 * @text レベル表示位置
 * @desc レベルを上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 1)
 * @default 1
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorIconLH
 * @text ステートアイコン表示位置
 * @desc ステートアイコンを上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 2)
 * @default 2
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorClassLH
 * @text 職業名表示位置
 * @desc 職業名を上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 3)
 * @default 3
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorGaugeLH
 * @text ゲージ表示位置
 * @desc HP・MP・TPゲージを上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 4)
 * @default 4
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param lvPadding
 * @text Lvの余白調整値
 * @desc Lv表記の余白調整値です。
 * 数値を小さくすると余白が狭くなります。 (初期値: 84)
 * @default 84
 * @min 0
 * @max 2000
 * @type number
 * @parent layoutSettings
 *
 * @param pictureSettings
 * @text 立ち絵表示の設定
 * @desc ※この項目は使用しません
 *
 * @param menuWindowPictureX
 * @text X座標始点
 * @desc 顔グラフィックの代わりに表示する立ち絵の表示位置(X)です。
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 * @parent pictureSettings
 *
 * @param menuWindowPictureY
 * @text Y座標始点
 * @desc 顔グラフィックの代わりに表示する立ち絵の表示位置(Y)です。
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 * @parent pictureSettings
 *
 * @param menuWindowPictureScale
 * @text 拡大率
 * @desc 立ち絵の拡大率です。 (初期値: 100)
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 * @parent pictureSettings
 *
 * @param menuHelpSettings
 * @text ヘルプウィンドウの設定
 * @desc ※この項目は使用しません
 *
 * @param menuHelpWindowEnable
 * @text ヘルプウィンドウを表示
 * @desc メニュー画面上部にヘルプウィンドウを表示します。
 * @default true
 * @type boolean
 * @parent menuHelpSettings
 *
 * @param menuHelpTexts
 * @text メニュー説明文
 * @desc メニュー説明文のリストを定義します。
 * @default ["{\"symbol\":\"アイテム\",\"helpText\":\"入手したアイテムを使用します。\"}","{\"symbol\":\"スキル\",\"helpText\":\"習得したスキルを使用します。\"}","{\"symbol\":\"装備\",\"helpText\":\"装備を変更します。\"}","{\"symbol\":\"ステータス\",\"helpText\":\"ステータスを確認します。\"}","{\"symbol\":\"並び替え\",\"helpText\":\"パーティの並び順を変更します。\"}","{\"symbol\":\"オプション\",\"helpText\":\"オプション画面を開きます。\"}","{\"symbol\":\"セーブ\",\"helpText\":\"これまでのデータをセーブします。\"}","{\"symbol\":\"ゲーム終了\",\"helpText\":\"ゲームを終了します。\"}"]
 * @type struct<menuHelpTexts>[]
 * @parent menuHelpSettings
 *
 * @param leftBlockLabel
 * @text 左上の項目名
 * @desc 左上に表示する項目名です。
 * 空白にすると非表示になります。
 * @default 現在地：
 * @type string
 * @parent menuHelpSettings
 *
 * @param leftBlockValue
 * @text 左上の値
 * @desc 左上に表示する値をスクリプトで記述します。
 * @default $gameMap.displayName()
 * @type combo
 * @option $gameVariables.value(1)   // 変数ID:1の値
 * @option $gameSwitches.value(1) ? "有効" : "無効"  // スイッチID:1の状態
 * @option $gameMap.displayName()  // マップ名
 * @option $gameParty.size()  // パーティー人数
 * @option $gameParty.steps()  // 現在の歩数
 * @option $gameParty.gold()  // 所持金
 * @option $gameParty.numItems($dataItems[1])  // アイテムID:1の所持数
 * @option $gameParty.numItems($dataWeapons[1])  // 武器ID:1の所持数
 * @option $gameParty.numItems($dataArmors[1])  // 防具ID:1の所持数
 * @option $gameSystem.playtimeText()   // プレイ時間
 * @option $gameSystem.saveCount()  // セーブ回数
 * @option $gameSystem.battleCount()  // 戦闘回数
 * @parent menuHelpSettings
 *
 * @param leftBlockAlign
 * @text 左上の文字揃え
 * @desc 左上に表示する値の文字配置を選択します。
 * @default left
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 * @parent menuHelpSettings
 *
 * @param rightBlockLabel
 * @text 右上の項目名
 * @desc 右上に表示する項目名です。
 * 空白にすると非表示になります。
 * @default プレイ時間：
 * @type string
 * @parent menuHelpSettings
 *
 * @param rightBlockValue
 * @text 右上の値
 * @desc 右上に表示する値をスクリプトで記述します。
 * @default $gameSystem.playtimeText()
 * @type combo
 * @option $gameVariables.value(1)   // 変数ID:1の値
 * @option $gameSwitches.value(1) ? "有効" : "無効"  // スイッチID:1の状態
 * @option $gameMap.displayName()  // マップ名
 * @option $gameParty.size()  // パーティー人数
 * @option $gameParty.steps()  // 現在の歩数
 * @option $gameParty.gold()  // 所持金
 * @option $gameParty.numItems($dataItems[1])  // アイテムID:1の所持数
 * @option $gameParty.numItems($dataWeapons[1])  // 武器ID:1の所持数
 * @option $gameParty.numItems($dataArmors[1])  // 防具ID:1の所持数
 * @option $gameSystem.playtimeText()   // プレイ時間
 * @option $gameSystem.saveCount()  // セーブ回数
 * @option $gameSystem.battleCount()  // 戦闘回数
 * @parent menuHelpSettings
 *
 * @param rightBlockAlign
 * @text 右上の文字揃え
 * @desc 右上に表示する値の文字配置を選択します。
 * @default right
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 * @parent menuHelpSettings
 */

/*~struct~menuHelpTexts:
 *
 * @param symbol
 * @text メニュー名
 * @desc メニュー名を入力します。
 * @type string
 *
 * @param helpText
 * @text メニュー説明文
 * @desc メニューの説明文を入力します。
 * @type string
 */

(function() {
	"use strict";
	var pluginName = "LL_MenuScreenCustomMV";

	var parameters = PluginManager.parameters(pluginName);
	var numVisibleRows = Number(parameters["numVisibleRows"] || 2);
	var maxCols = Number(parameters["maxCols"] || 2);
	// 表示位置の設定
	var actorNameLH = Number(parameters["actorNameLH"] || 0);
	var actorLevelLH = Number(parameters["actorLevelLH"] || 1);
	var actorIconLH = Number(parameters["actorIconLH"] || 2);
	var actorClassLH = Number(parameters["actorClassLH"] || 3);
	var actorGaugeLH = Number(parameters["actorGaugeLH"] || 4);
	var lvPadding = Number(parameters["lvPadding"] || 84);
	// 立ち絵表示の設定
	var menuWindowPictureX = Number(parameters["menuWindowPictureX"] || 0);
	var menuWindowPictureY = Number(parameters["menuWindowPictureY"] || 0);
	var menuWindowPictureScale = Number(parameters["menuWindowPictureScale"] || 100);
	// ヘルプウィンドウの設定
	var menuHelpWindowEnable = eval(parameters["menuHelpWindowEnable"] || "true");
	var menuHelpTexts = JSON.parse(parameters["menuHelpTexts"] || "null");
	var leftBlockLabel = String(parameters["leftBlockLabel"] || "");
	var leftBlockValue = String(parameters["leftBlockValue"] || "");
	var leftBlockAlign = String(parameters["leftBlockAlign"] || "left");
	var rightBlockLabel = String(parameters["rightBlockLabel"] || "");
	var rightBlockValue = String(parameters["rightBlockValue"] || "");
	var rightBlockAlign = String(parameters["rightBlockAlign"] || "right");

	var menuHelpLists = [];
	if (menuHelpTexts) {
		menuHelpTexts.forEach(function(elm) {
			menuHelpLists[String(JSON.parse(elm).symbol)] = String(JSON.parse(elm).helpText);
		});
	}

	// メニュー画面ヘルプウィンドウの標準高さ (lineHeight)
	var menuHelpWindowLH = 2;

	// ヘルプウィンドウフォントサイズ
	var menuHelpWindowFontSize = 28;

	// MZのcontens.bltを再現
	Bitmap.prototype.bltMZ = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
		dw = dw || sw;
		dh = dh || sh;
		try {
			var image = source._canvas || source._image;
			this.context.globalCompositeOperation = "source-over";
			this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
			this._baseTexture.update();
		} catch (e) {
			//
		}
	};

	// ヘルプウィンドウの高さを定義
	Scene_MenuBase.prototype.calcMenuHelpWindowHeight = function() {
		var lineHeight = 36;
		var height = lineHeight * 3;
		if (!leftBlockLabel && !rightBlockLabel) height = lineHeight * 2;
		if (!menuHelpWindowEnable) height = 0;
		return height;
	};

	var _Scene_Menu_create = Scene_Menu.prototype.create;
	Scene_Menu.prototype.create = function() {
		_Scene_Menu_create.apply(this, arguments);
		this.createMenuHelpWindow();
		if (menuHelpWindowEnable) {
			this._goldWindow.visible = false;
			this._commandWindow.y = this._menuHelpWindow.height;
			this._statusWindow.y = this._menuHelpWindow.height;
			this._statusWindow.height = this._statusWindow.height - this._menuHelpWindow.height;
			this._statusWindow.refresh();
		}
		this._statusWindow.reserveStandingPictures();
	};

	var _Scene_ItemBase_createActorWindow = Scene_ItemBase.prototype.createActorWindow;
	Scene_ItemBase.prototype.createActorWindow = function() {
		_Scene_ItemBase_createActorWindow.apply(this, arguments);
		if (menuHelpWindowEnable) {
			this._actorWindow.y = this.calcMenuHelpWindowHeight();
			this._actorWindow.height = this._actorWindow.height - this.calcMenuHelpWindowHeight();
			this._actorWindow.refresh();
		}
	};
	Scene_Menu.prototype.createMenuHelpWindow = function() {
		this._menuHelpWindow = new Window_MenuHelp();
		this.addWindow(this._menuHelpWindow);
	};

	var _Scene_Menu_update = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function() {
		_Scene_Menu_update.apply(this, arguments);
		// インフォメーションウィンドウの更新
		var helpText = menuHelpLists[this._commandWindow.currentName()] ? menuHelpLists[this._commandWindow.currentName()] : "";
		this._menuHelpWindow.setText(helpText);
	};

	// Reserve Standing Picture (MV)
	Window_Base.prototype.reserveStandingPictures = function() {
		$gameParty.members().forEach(function(actor) {
			var mPicture = ExMenuScreenBase.getImageName(actor._actorId);
			if (mPicture) {
				ImageManager.reservePicture(mPicture.imageName);
			}
		}, this);
	};

	// Get Current Name
	Window_Command.prototype.currentName = function() {
		return this.currentData() ? this.currentData().name : null;
	};

	// ウィンドウ内に立ち絵を描画
	Window_Base.prototype.drawStandingPicture = function(
		pictureName, x, y, width, height, sx, sy, scaleX, scaleY
	) {
		width = width || 200;
		height = height || 200;
		sx = sx || 0;
		sy = sy || 0;
		var bitmap = ImageManager.loadPicture(pictureName);
		var pw = width;
		var ph = height;
		var sw = Math.min(width, pw);
		var sh = Math.min(height, ph);
		var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
		var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
		var dw = Math.min(width, pw);
		var dh = Math.min(height, ph);
		// this.contents.blt(bitmap, sx, sy, sw / scaleX, sh / scaleY, dx, dy, dw, dh);

		// for MV
		this.contents.bltMZ(bitmap, sx, sy, sw / scaleX, sh / scaleY, dx, dy, dw, dh);
	};

	Window_MenuStatus.prototype.exDrawActorSimpleStatus = function(actor, x, y) {
		var lineHeight = this.lineHeight();
		if (actorNameLH > -1) this.drawActorName(actor, x, y + lineHeight * actorNameLH);
		if (actorLevelLH > -1) this.drawActorLevel(actor, x, y + lineHeight * actorLevelLH);
		if (actorIconLH > -1) this.drawActorIcons(actor, x, y + lineHeight * actorIconLH);
		if (actorClassLH > -1) this.drawActorClass(actor, x, y + lineHeight * actorClassLH);
		// if (actorGaugeLH > -1) this.placeBasicGauges(actor, x, y + lineHeight * actorGaugeLH);

		// for MV
		if (actorGaugeLH > -1) {
			this.drawActorHp(actor, x, y + lineHeight * actorGaugeLH, 0);
    		this.drawActorMp(actor, x, y + lineHeight * (actorGaugeLH + 1), 0);
		}
	};

	Window_MenuStatus.prototype.drawItemImage = function(index) {
		var actor = $gameParty.members()[index];
		var rect = this.itemRect(index);

		this.changePaintOpacity(actor.isBattleMember());
		// 立ち絵 or 顔グラフィック描画
		var mPicture = ExMenuScreenBase.getImageName(actor._actorId);
		if (mPicture) {
			var width = rect.width - 2;
			var height = rect.height - 2;
			var x = rect.x + 1;
			var y = rect.y + 1;
			var sx = (Number(mPicture.x) + menuWindowPictureX) * -1;
			var sy = (Number(mPicture.y) + menuWindowPictureY) * -1;
			var scaleX = Number(mPicture.scaleX) / 100;
			var scaleY = Number(mPicture.scaleY) / 100;
			// 拡大率を適用
			scaleX *= menuWindowPictureScale / 100;
			scaleY *= menuWindowPictureScale / 100;

			// ピンチ判定
			if (ExMenuScreenBase.getHpRate(actor._actorId) > Number(mPicture.pinchPercentage) || !mPicture.pinchImageName) {
				// 通常
				this.drawStandingPicture(String(mPicture.imageName), x, y, width, height, sx, sy, scaleX, scaleY);
			} else {
				// ピンチ
				this.drawStandingPicture(String(mPicture.pinchImageName), x, y, width, height, sx, sy, scaleX, scaleY);
			}
		} else {
			var width = Window_Base._faceWidth;
			var height = rect.height - 2;
			var x = rect.x + rect.width - width - 1;
			var y = rect.y + 1;
			this.drawActorFace(actor, x, y, width, height);
		}
		this.changePaintOpacity(true);
	};

	Window_MenuStatus.prototype.drawItemStatus = function(index) {
		var actor = $gameParty.members()[index];
		var rect = this.itemRect(index);
		var x = rect.x + 2;
		var y = rect.y + 2;
		this.exDrawActorSimpleStatus(actor, x, y);
	};

	Window_MenuStatus.prototype.numVisibleRows = function() {
		return numVisibleRows;
	};

	Window_MenuStatus.prototype.maxCols = function() {
		return maxCols;
	};

	Window_MenuStatus.prototype.drawActorLevel = function(actor, x, y) {
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.levelA, x, y, 48);
		this.resetTextColor();
		this.drawText(actor.level, x + lvPadding, y, 36, 'right');
	};


	//-----------------------------------------------------------------------------
	// Window_MenuHelp
	//

	function Window_MenuHelp() {
		this.initialize.apply(this, arguments);
    }

    Window_MenuHelp.prototype = Object.create(Window_Base.prototype);
    Window_MenuHelp.prototype.varructor = Window_MenuHelp;

    Window_MenuHelp.prototype.initialize = function() {
		var width = Graphics.boxWidth;
		var height = this.lineHeight() * 3;
		if (!leftBlockLabel && !rightBlockLabel) height = this.lineHeight() * 2;
		if (!menuHelpWindowEnable) height = 0;

		Window_Base.prototype.initialize.call(this, 0, 0, width, height);
		this.refresh();
    };

    Window_MenuHelp.prototype.setText = function(text) {
	    this._text = text;
	    this.refresh();
    };

    Window_MenuHelp.prototype.clear = function() {
	    this.setText("");
    };

    Window_MenuHelp.prototype.refresh = function() {
		this.contents.clear();
		this.contents.fontSize = this.getFontSize();
		// マップ名
		this.drawLeftBlock();
		// プレイ時間
		this.drawRightBlock();
		// 所持金
		this.drawCurrency();
		// メニューヘルプ
		this.drawMenuHelp();
		this.contents.fontSize = this.standardFontSize();
	};

	Window_MenuHelp.prototype.getFontSize = function() {
		return this.standardFontSize();
	};

	Window_MenuHelp.prototype.innerWidth = function() {
		return Math.max(0, this.width - this.padding * 2);
    };

	Window_MenuHelp.prototype.drawLeftBlock = function() {
		if (!leftBlockLabel) return;
		var y = 0;
		var oneThirdWidth = Math.floor(this.innerWidth() / 2);
	    this.changeTextColor(this.systemColor());
		this.drawText(leftBlockLabel, 0, y, this.getFontSize() * leftBlockLabel.length, leftBlockAlign);
		this.resetTextColor();
		this.drawText(eval(leftBlockValue), this.getFontSize() * leftBlockLabel.length, y, oneThirdWidth * 1 - this.getFontSize() * leftBlockLabel.length, leftBlockAlign);
	};

	Window_MenuHelp.prototype.drawRightBlock = function() {
		if (!rightBlockLabel) return;
		var y = 0;
		var oneThirdWidth = Math.floor(this.innerWidth() / 2);
		this.changeTextColor(this.systemColor());
		this.drawText(rightBlockLabel, oneThirdWidth * 1, y, this.getFontSize() * rightBlockLabel.length, rightBlockAlign);
		this.resetTextColor();
		this.drawText(eval(rightBlockValue), this.getFontSize() * rightBlockLabel.length + oneThirdWidth * 1, y, oneThirdWidth - this.getFontSize() * rightBlockLabel.length, rightBlockAlign);
	};

	Window_MenuHelp.prototype.drawCurrency = function() {
		var y = !leftBlockLabel && !rightBlockLabel ? 0 : this.lineHeight() * 1;
		var oneThirdWidth = Math.floor(this.innerWidth() / 3);
		var currencyUnit = TextManager.currencyUnit;
		var fontSize = this.getFontSize();
		this.drawCurrencyValue($gameParty.gold(), currencyUnit, oneThirdWidth * 2 + fontSize * 3, y, oneThirdWidth - fontSize * 3);
	};

	Window_MenuHelp.prototype.drawMenuHelp = function() {
		var y = !leftBlockLabel && !rightBlockLabel ? 0 : this.lineHeight() * 1;
		var oneThirdWidth = Math.floor(this.innerWidth() / 3);
		this.resetTextColor();
		this.drawText(this._text ? this._text : "", 0, y, this.innerWidth() - oneThirdWidth);
	};
})();
