---
title: Chaos Strikes Back cheet sheet
---

## 新呪文

OH GOR KU: 敵ハイライト
OH GOR ROS: ニセ壁ハイライト
ZO IR NETA: ？
OH GOR DAIN: 火炎弾などをハイライト

## 深い落とし穴

## ギグラーによるアイテム配備システム

ゲーム開始後、JUNCTION (16, 15, 7) に初めて到達したときに発生するイベントにより、
擬似的にランダムにアイテムがダンジョン内に配備される仕組みを記す。

### Level 7 のヘルス 1 のギグラーが配備するもの

Level 7 のヘルス 1 のギグラーリスト。穴に落ちてテレポート。
ランダム性はほとんどないと考えられる。

* DIAMOND EDGE, WATER, PLATE OF RA: レベル 0 北西の四方アルコーブ
* KU POTION, DRAGON PLATE, TOPAZ KEY: レベル 4 ピット奥の隠し部屋
* SIDE SPLITTER, POLEYN OF RA, GLEAVE OF RA: レベル 4 ピットの間の四方アルコーブ
* DRAGON HELM, DRAGON POLEYN, DRAGON GLEAVE: レベル 1 西部四方アルコーブ
* GOLD KEY, FLAMITT, STORM: レベル 3 南部四方アルコーブ
* WAND, MAGIX BOX, RA BLADE: レベル 6 南部四方アルコーブ

### レベル 7 のアイテムシューターが配備するもの

まずは配備されるアイテムリスト：

1. CHEST (DRAGON STEAK, SHANK, BREAD, CHEESE, CORN, BREAD, CHEESE, APPLE)
2. BOOTS OF SPEED
3. COMPASS
4. CHEST (GEM OF AGES, MAGIC BOX 3, MAGIC BOX 1)
5. CHEST (GOR COIN 5)
6. HELM OF RA
7. DRAGON SHIELD
8. EE POTION

配備される可能性のある場所：

* (5, 3, 2): ROS 後半、高速地帯北西の行き止まり。
* (20, 13, 3): NETA 後半、SKELETON を追う部屋の脇の行き止まり。
* (17, 10, 5): DAIN 前半、火炎弾部屋と蛇部屋の中間休憩所。
* (25, 1, 8): ROS 前半、MUMMY 部屋。
* (26, 26, 0): 最上階、KEY OF B 通路先の行き止まり。
* (3, 26, 9): KU 前半、南西隅の爆弾部屋。
* (7, 15, 2): DDD 内 ROS 後半エントランス正面の突き当り。

### レベル 7 のギグラー操作室による配備

ギグラーに運ばれているアイテム一覧：

* EYE OF TIME
* LOCK PICKS
* SKELETON KEY
* STORM RING, ONYX KEY
* MAGIC BOX, KEY OF B
* GOLD KEY, VEN POTION, WATER

ギグラーたちの行き先候補一覧：

* (16, 19, 0): 最上階大広間
* (21, 17, 0): 最上階大広間
* (17, 10, 5): 方向感覚が狂う大広間
* (25, 1, 8): レベル 8 ドラゴンのいる大広間
* (15, 20, 8): KU 前半 NO FIREBALL の間中央
* (4, 2, 7): DAIN 前半テレポート迷路、さらには THE CISTERN 南側
* (16, 28, 7): NETA 前半、SCREAMER 部屋と MUNCHER 部屋の中間
* (16, 0, 6): ROS 前半、ニセ壁通路

各ギグラーが操作室の東端を踏んだ途端、次が起こる：

1. 先述のアイテムシューターが一回発動
2. 先述のヘルス 1 ギグラー部屋のピットが一つ開く
3. ほとんどの場合、アイテムシューター通路のテレポーターが有効化する
4. ほとんどの場合、6..16 などの固定フレーム後、そのテレポーターが無効化する
5. 1 フレーム後、当該ギグラーのいるマスにあるテレポーターが無効化
6. 当該ギグラーが所定の場所へテレポート

鳩の巣原理により、発射されたすべてのアイテムがどこかへいちおう配備されるようだ。
シューター通路に放置されたままということにはならなそうだ。
