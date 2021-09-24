from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo
import scraping

# Set up Flask
app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/cardio_app"
mongo = PyMongo(app)

@app.route("/")
def index():
    cardio = mongo.db.cardio.find_one() 
    return render_template("index.html", cardio=cardio)
    #return "Hello WOrld"
      
  

@app.route("/scrape")
def scrape():
    cardio = mongo.db.cardio
    cardio_data = scraping.scrape_all()
    cardio.update({}, cardio_data, upsert=True)
    return redirect('/', code=302)

if __name__ == "__main__":
    app.run()

 