//=============================================================================
// RPGツクールMV - LL_MenuScreenBaseMV.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MV
 * @plugindesc メニュー画面立ち絵設定の共通ベースプラグインです。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-menuscreen/
 *
 * @help LL_MenuScreenBaseMV.js
 *
 * メニュー画面立ち絵設定の共通ベースプラグインです。
 * このプラグインでアクター毎の立ち絵リストを定義します。
 *
 * 下記のように特定ステート、スイッチONで表示する立ち絵を複数定義できます。
 *   ・スイッチ1がONかつ毒状態の立ち絵
 *   ・スイッチ1がONの時の立ち絵
 *   ・毒状態の立ち絵
 *   ・スイッチ・ステート設定なしの通常立ち絵 (最低限必要)
 *
 * 戦闘中立ち絵プラグイン連携:
 *   LL_StandingPictureBattleMV が導入されている場合は、
 *   戦闘中の立ち絵リストとそのまま連携させることも可能です。
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
 * 作成日: 2020/11/11
 *
 * @param menuPictures
 * @text 立ち絵リスト
 * @desc メニュー画面に表示する立ち絵を定義します。
 * 特定ステート時、スイッチON時の立ち絵を複数定義できます。
 * @default []
 * @type struct<menuPictures>[]
 *
 * @param onSpbPlugin
 * @text 戦闘中立ち絵プラグイン連携
 * @desc ※この項目は使用しません
 *
 * @param onSpbPluginEnable
 * @text 立ち絵リストを連携
 * @desc LL_StandingPictureBattle の立ち絵リストと連携させます。
 * ONにするとこのプラグインの立ち絵リスト設定は無視されます。
 * @default false
 * @type boolean
 * @parent onSpbPlugin
 */

/*~struct~menuPictures:
 *
 * @param actorId
 * @text アクターID
 * @desc アクターIDです。立ち絵を定義するアクターを選択してください。
 * @type actor
 *
 * @param stateId
 * @text ステートID
 * @desc 特定ステートで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定ください。
 * @type state
 *
 * @param switchId
 * @text スイッチID
 * @desc スイッチONで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定ください。
 * @type switch
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 立ち絵として表示する画像ファイルを選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param x
 * @text X座標
 * @desc 立ち絵の表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。 (初期値: 0)
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param y
 * @text Y座標
 * @desc 立ち絵の表示位置(Y)の調整値です。
 * ＋で下へ、－で上へ調整します。 (初期値: 0)
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleX
 * @text X拡大率
 * @desc 立ち絵の拡大率(X)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Y拡大率
 * @desc 立ち絵の拡大率(Y)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param pinchPercentage
 * @text ピンチしきい値
 * @desc ピンチのしきい値をHP％で指定してください。
 * 無効にしたい場合は0を入力してください。
 * @default 25
 * @type number
 * @min 0
 * @max 100
 *
 * @param pinchImageName
 * @text 画像ファイル名
 * @desc ピンチ時に表示する画像ファイルを選択してください。
 * 設定しなかった場合は通常と同じ画像が表示されます。
 * @dir img/pictures
 * @type file
 * @require 1
 * @parent pinchPercentage
 */

(function() {
	"use strict";
	var pluginName = "LL_MenuScreenBaseMV";

	var parameters = PluginManager.parameters(pluginName);
	var menuPictures = JSON.parse(parameters["menuPictures"] || "null");
	var onSpbPluginEnable = eval(parameters["onSpbPluginEnable"] || "true");
	var menuPictureLists = [];
	if (menuPictures) {
		menuPictures.forEach(function(elm) {
			menuPictureLists.push(JSON.parse(elm || "null"));
		});
	}

	//-----------------------------------------------------------------------------
	// 戦闘中立ち絵プラグインの立ち絵リストを取得
	// On LL_StandingPictureBattle Plugin
	//-----------------------------------------------------------------------------
	var spbPluginName = "LL_StandingPictureBattleMV";
	var spbParameters = PluginManager.parameters(spbPluginName);
	var spbCommandPictures = JSON.parse(spbParameters["sbCommandPictures"] || "null");
	var spbCommandPictureLists = [];
	if (spbCommandPictures) {
		spbCommandPictures.forEach(function(elm) {
			spbCommandPictureLists.push(JSON.parse(elm || "null"));
		});
	}

	//-----------------------------------------------------------------------------
	// Ex Menu Screen Base Class
	//
	// メニュー画面立ち絵設定の独自クラスを追加定義します。

	class ExMenuScreenBase {

		//-----------------------------------------------------------------------------
		// 画像ファイル名を取得
		//
		// ※画像ファイルの検索順番ルール (重複で一致した場合は、最も上部の立ち絵が呼ばれる)
		// 1. ステートID、スイッチID両方に一致するもの
		// 2. ステートIDのみ一致するもの
		// 3. スイッチIDのみ一致するもの
		// 4. 通常立ち絵 (ステートID、スイッチIDともに一致しない)
		//-----------------------------------------------------------------------------
		static getImageName (actorId) {
			// 立ち絵リストを取得
			var pictureLists = this.getPictureLists();
			// アクターのステート情報を取得
			var actorStates = [];
			if (actorId) actorStates = $gameActors.actor(actorId)._states;
			var specificPicture = null;
			// ステートにかかっているか？
			if (actorStates.length) {
				// ステートID・スイッチIDが有効な立ち絵リストを検索
				specificPicture = pictureLists.filter(function(item, index) {
					if (Number(item.actorId) == actorId && actorStates.indexOf(Number(item.stateId)) !== -1 && $gameSwitches.value(Number(item.switchId))) {
						return true;
					}
				});
				if (specificPicture.length) return specificPicture[0];
				// ステートIDが有効な立ち絵リストを検索
				specificPicture = pictureLists.filter(function(item, index) {
					if (Number(item.actorId) == actorId && actorStates.indexOf(Number(item.stateId)) !== -1 && (Number(item.switchId) === 0 || !item.switchId)) {
						return true;
					}
				});
				if (specificPicture.length) return specificPicture[0];
			} else {
				// スイッチIDが有効な立ち絵リストを検索
				specificPicture = pictureLists.filter(function(item, index) {
					if (Number(item.actorId) == actorId && (Number(item.stateId) === 0 || !item.stateId) && $gameSwitches.value(Number(item.switchId))) {
						return true;
					}
				});
				if (specificPicture.length) return specificPicture[0];
			}

			// 上記で見つからなかった場合、通常の立ち絵を検索
			var sbPicture = pictureLists.filter(function(item, index) {
				if (Number(item.actorId) == actorId && (Number(item.stateId) === 0 || !item.stateId) && (Number(item.switchId) === 0 || !item.switchId)) return true;
			});
			return sbPicture[0];
		}

		static getPictureLists () {
			return onSpbPluginEnable ? spbCommandPictureLists : menuPictureLists;
		}

		static onSpbPluginEnable () {
			return onSpbPluginEnable;
		}

		// アクターのHPレートを取得
		static getHpRate (actorId) {
			if (!$gameActors.actor(actorId)) return 0;
			return $gameActors.actor(actorId).mhp > 0 ? $gameActors.actor(actorId).hp / $gameActors.actor(actorId).mhp * 100 : 0;
		}
	}

	window.ExMenuScreenBase = ExMenuScreenBase;
})();
