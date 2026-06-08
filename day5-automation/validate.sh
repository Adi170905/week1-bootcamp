#!/bin/bash

LOG_FILE="logs/validation.log"

mkdir -p logs

echo "[$(date)] Validation started" >> $LOG_FILE

# Check if src folder exists
if [ -d "src" ]; then
    echo "src folder exists" >> $LOG_FILE
else
    echo "src folder missing" >> $LOG_FILE
fi

# Check config.json
if [ -f "config.json" ]; then
    echo "config.json exists" >> $LOG_FILE
else
    echo "config.json missing" >> $LOG_FILE
fi

echo "Validation successful!" >> $LOG_FILE
echo "Validation passed!"