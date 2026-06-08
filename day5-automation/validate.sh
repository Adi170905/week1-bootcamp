#!/bin/bash

LOG_FILE="logs/validation.log"

echo "[$(date)] Validation started" >> $LOG_FILE

# Check if src folder exists
if [ ! -d "src" ]; then
    echo "Error: src folder missing!"
    exit 1
fi

# Check if config.json exists
if [ ! -f "config.json" ]; then
    echo "Error: config.json missing!"
    exit 1
fi

# Validate JSON
node -e "JSON.parse(require('fs').readFileSync('config.json', 'utf8'))" || {
    echo "Error: Invalid config.json"
    exit 1
}

echo "Validation successful!" >> $LOG_FILE
echo "Validation passed!"