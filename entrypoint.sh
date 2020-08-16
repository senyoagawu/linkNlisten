
#!/usr/bin/env bash
pip3 install -r /app/requirements.txt
python3 linknlisten.py db upgrade
python3 database.py
python3 linknlisten.py run -h 0.0.0.0