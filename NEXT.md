# 引き継ぎメモ（次のセッション用）

最終更新: 2026-11-26

## 現状
- BIRDIE HOUSE（@yakitori_birdiehouse）の運用を、代表のあたるさん自身が行う（B型の開業は2027年春）
- 決まったこと・ヒアリング結果: `clients/birdie-house/00_answers.md`
- 運用計画のページ: https://claude.ai/artifact/8CjdZRwYFMvTHv217TsSMk（12/4オープン・業態の訂正は未反映）

## 連携
- Metricool: 連携済み。ブランドID 6991052、Instagram＋TikTok、Asia/Tokyo
- Google Drive: 連携済み・書き込みOK（2026-11-26に解決。原因はGoogle許可画面のチェックボックスが既定でオフだったこと。「すべて選択」で解決）
  - 権限は drive.file のため、作成・削除できるのはClaudeが作ったファイルだけ
  - アップロードの手順: チャットの添付画像を作業フォルダ（clients/<店>/assets/、git管理外）にコピーしてから、sha256の参照で create_file する
  - フォルダID: BIRDIE HOUSE=1Pb0MR7nP33RUHbCQfRwkLrsFEFQtzeN6 / 01_ロゴ・ブランド=1SN5GqZ2dAS4fHKOxQSkUTE4Hm-KTOwpI / 02_営業カレンダー・メニュー=15zZdWdI7w1uvKYKl7JH0Ts4SDqXYkcwr / 03_撮影素材=1-qOfuXLcgeJ8oEnnt0nT8POkEGNjdePD / 04_投稿用=1YyuGbTAeJ2BmGns65Sc-6UX3TT2SheYI（2026-12=1RwbWRSl0HwSTYiVqfPoxA1N_tA9X8t98）/ 05_お知らせ・その他=1O8nqGS6QIyRCJKMtYNdfSAFgeLguLA6b
  - 02には営業カレンダー（12月・1月）、ご利用のご案内、フード・ドリンクメニュー（4言語）を格納済み
- DM: 自分でMetaアプリを作って公式APIでつなぐ予定（未着手）
- LINE公式アカウント: なし（後で検討）

## 投稿の流れ（あたるさんと合意済み）
1. あたるさんがチャットに画像・動画を送る
2. Claudeがキャプション・ハッシュタグ・投稿日時案を作って見せる
3. あたるさんがOK
4. ClaudeがGoogleドライブの「BIRDIE HOUSE/04_投稿用」に入れて、Metricoolで予約投稿

## 次にやること
1. （済）Googleドライブのフォルダ作成
2. 12/4グランドオープンまでのカウントダウン投稿を予約（12/1・12/3は定休日、12/2は関係者プレオープン）
3. 運用計画（02_strategy.md, 03_calendar, ページ）を「お任せオーダーストップ制」「12/4オープン」に合わせて直す
4. ヒアリングの残り: 看板メニュー3品、ゴール、TableCheckの予約ページURL、最寄駅
