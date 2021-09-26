from flask import Flask, render_template, redirect, url_for, request
import LRPrediction

# Set up Flask
app = Flask(__name__)


# Set up routes
@app.route("/")

def index():
    
    return render_template("index.html")



@app.route("/", methods=['POST'])
def getvalue():

    age = request.form['age']
    height = request.form['height']
    weight = request.form['weight']
    systolic_bp = request.form['systolic']
    diastolic_bp = request.form['diastolic']
    cholesterol = request.form['cholesterol']
    active = request.form['active']
    
    numbers={"u_age": age , "u_height": height, "u_weight": weight, "u_systolic_bp": systolic_bp, 
        "u_diastolic_bp": diastolic_bp, "u_cholesterol": cholesterol, "u_active": active}

    prediction = LRPrediction.predict(numbers) 

        
    return render_template("index.html", prediction=prediction)



if __name__ == "__main__":
    app.run()
