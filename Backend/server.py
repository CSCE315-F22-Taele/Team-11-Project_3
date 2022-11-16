from flask import Flask
import datetime
import random, time, psycopg2, sys
connection = psycopg2.connect(host='csce-315-db.engr.tamu.edu', database='csce315_912_11', user='csce315_912_matl', password='1')
cursor = connection.cursor()

  
x = datetime.datetime.now()
  
# Initializing flask app
app = Flask(__name__)

  
# Route for seeing a data
@app.route('/data/<queryStr>')
def get_time(queryStr):
    cursor.execute(queryStr)
    myStr = ""

    for query in cursor:
        myStr += str(query)
    # Returning an api for showing in  reactjs
    return {
        'Name':myStr, 
        "Age":"1000",
        "Date":x, 
        "programming":"python broooo"
        }
  
      
# Running app
if __name__ == '__main__':
    app.run(port=3001,debug=True)