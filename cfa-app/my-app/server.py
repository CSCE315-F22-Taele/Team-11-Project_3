import datetime
import random
import sys
import time

import psycopg2
from flask import Flask

connection = psycopg2.connect(host='csce-315-db.engr.tamu.edu', database='csce315_912_11', user='csce315_912_matl', password='1')
cursor = connection.cursor()

  
x = datetime.datetime.now()
  
# Initializing flask app
app = Flask(__name__)

  
# Route for seeing a data
@app.route('/data/<queryStr>')
def get_time(queryStr):
    cursor.execute(queryStr)
    myArr = []
    myStr = ""

    for query in cursor:
        myArr.append(str(query))
        myStr += str(query) + '.'
    # Returning an api for showing in  reactjs
    return {
        'QueryResult':myArr
        }
  
@app.route('/data/itemtable')
def get_itemtable():
    cursor.execute('SELECT * FROM itemtable')
    myArr = []

    for query in cursor:
        myArr.append(str(query))
    # Returning an api for showing in  reactjs
    return {
        'QueryResult':myArr
        }

@app.route('/data/menutable')
def get_menutable():
    cursor.execute('SELECT * FROM menutable')
    myArr = []

    for query in cursor:
        myArr.append(str(query))
    # Returning an api for showing in  reactjs
    return {
        'QueryResult':myArr
        }

@app.route('/data/ordertable')
def get_ordertable():
    cursor.execute('SELECT * FROM ordertable')
    myArr = []

    for query in cursor:
        myArr.append(str(query))
    # Returning an api for showing in  reactjs
    return {
        'QueryResult':myArr
        }

@app.route('/result/<queryStr>')
def run_update(queryStr):
    cursor.execute(queryStr)

    # Returning an api for showing in  reactjs
    connection.commit()
    return {
        'QueryResult':'Success'
        }

# # update order table when submit is clicked 
# @app.route('/update/ordertable')
# def run_update(TODO):
#     cursor.execute(TODO)

#     # Returning an api for showing in  reactjs
#     connection.commit()
#     return {
#         'QueryResult':'Success'
#         }

# # update order table when submit is clicked 
# @app.route('/update/itemtable')
# def run_update(TODO):
#     cursor.execute(TODO)

#     # Returning an api for showing in  reactjs
#     connection.commit()
#     return {
#         'QueryResult':'Success'
#         }
    


# Running app
if __name__ == '__main__':
    app.run(port=5002,debug=True)

    