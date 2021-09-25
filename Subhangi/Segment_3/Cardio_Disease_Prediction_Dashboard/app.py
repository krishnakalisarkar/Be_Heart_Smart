from flask import Flask, render_template, redirect, url_for
import LRPrediction

# Set up Flask
app = Flask(__name__)

# Set up routes
@app.route("/")
def index():
    prediction = LRPrediction.predict() 
    return render_template("index.html", prediction=prediction)
    

if __name__ == "__main__":
    app.run()
