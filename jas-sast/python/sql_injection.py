# [DEMO] JAS SAST — SQL injection and unsafe deserialization patterns.

import pickle
import sqlite3
from flask import Flask, request

app = Flask(__name__)


@app.route("/user")
def get_user():
    user_id = request.args.get("id")
    conn = sqlite3.connect("app.db")
    cursor = conn.cursor()
    # SQL injection: user input concatenated directly into the query
    query = "SELECT * FROM users WHERE id = " + user_id
    cursor.execute(query)
    return str(cursor.fetchall())


@app.route("/restore", methods=["POST"])
def restore():
    # Unsafe deserialization of attacker-controlled input
    data = request.get_data()
    obj = pickle.loads(data)
    return str(obj)


@app.route("/run")
def run_cmd():
    import os
    # Command injection: shell=True with user input
    cmd = request.args.get("cmd")
    os.system("echo " + cmd)
    return "ok"
