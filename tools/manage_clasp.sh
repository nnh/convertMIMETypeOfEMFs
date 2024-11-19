#!/bin/bash

# このスクリプトはGit Bashで動作します。
# 使用する前に以下のコマンドで実行権限を付与してください。
# chmod +x tools/manage_clasp.sh

# toolsフォルダに配置する前提で、一つ上の階層を指定
PARENT_DIR=$(dirname "$(pwd)")

# JSONファイルのパス
CLASP_JSON="$PARENT_DIR/.clasp.json"
CLASP_DEV_JSON="$PARENT_DIR/.clasp-dev.json"
CLASP_PROD_JSON="$PARENT_DIR/.clasp-prod.json"

# 条件分岐処理
if [[ -f "$CLASP_JSON" && -f "$CLASP_PROD_JSON" && ! -f "$CLASP_DEV_JSON" ]]; then
    # .clasp-dev.jsonがない場合
    mv "$CLASP_JSON" "$CLASP_DEV_JSON"
    mv "$CLASP_PROD_JSON" "$CLASP_JSON"
    echo ".clasp.json を .clasp-dev.json にリネームし、.clasp-prod.json を .clasp.json にリネームしました。"
    exit 0
elif [[ -f "$CLASP_JSON" && -f "$CLASP_DEV_JSON" && ! -f "$CLASP_PROD_JSON" ]]; then
    # .clasp-prod.jsonがない場合
    mv "$CLASP_JSON" "$CLASP_PROD_JSON"
    mv "$CLASP_DEV_JSON" "$CLASP_JSON"
    echo ".clasp.json を .clasp-prod.json にリネームし、.clasp-dev.json を .clasp.json にリネームしました。"
    exit 0
else
    # どちらの条件にも当てはまらない場合
    echo "処理対象外です。条件を確認してください。"
    exit 1
fi
