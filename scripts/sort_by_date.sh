#!/bin/bash

# Проверяем, передан ли путь к папке
if [ -z "$1" ]; then
    echo "Ошибка: путь к папке не указан."
    exit 1
fi

DIR="$1"

# Создаем директории для сортировки
TODAY_DIR="$DIR/today"
WEEK_DIR="$DIR/week"
OLDER_DIR="$DIR/older"

mkdir -p "$TODAY_DIR" "$WEEK_DIR" "$OLDER_DIR"

# Проходим по всем файлам в папке
for FILE in "$DIR"/*; do
    if [ -f "$FILE" ]; then
        CREATION_DATE=$(stat -c %Y "$FILE")
        CURRENT_DATE=$(date +%s)
        AGE=$(( (CURRENT_DATE - CREATION_DATE) / 86400 ))

        if [ $AGE -eq 0 ]; then
            mv "$FILE" "$TODAY_DIR/"
        elif [ $AGE -le 7 ]; then
            mv "$FILE" "$WEEK_DIR/"
        else
            mv "$FILE" "$OLDER_DIR/"
        fi
    fi
done

echo "Сортировка завершена."
