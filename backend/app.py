from flask import Flask, render_template, redirect, url_for,jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import os 
import re




#set api Key with OSmodule
os.environ['GOOGLE_API_KEY'] = 'Get_Your_API_KEY'
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])



app = Flask(__name__)
CORS(app)


#initialize model
model = genai.GenerativeModel("models/gemini-1.5-flash-latest")

#clean markdown function
def clean_markdown(text):
    return re.sub(r"\*\*(.*?)\*\*", r"\1", text)

# custom function
#First pass parametes of recommendation text
def generate_recommendation(dietary_preferences, fitness_goals, lifestyle_factors, dietary_restrictions, health_conditions, user_query):
    
    # you define a custom prompt to GenModel
    prompt = f"""
    Can you suggest a comprehensive plan that includes diet and workout options for better fitness?
    for this user:
    dietary preferences: {dietary_preferences},
    fitness goals: {fitness_goals},
    lifestyle factors: {lifestyle_factors},
    dietary restrictions: {dietary_restrictions},
    health conditions: {health_conditions},
    user query: {user_query},

    Based on the above user’s dietary preferences, fitness goals, lifestyle factors, dietary restrictions, and health conditions provided, create a customized plan that includes:

    Diet Recommendations: RETURN LIST
    5 specific diet types suited to their preferences and goals.

    Workout Options: RETURN LIST
    5 workout recommendations that align with their fitness level and goals.

    Meal Suggestions: RETURN LIST
    5 breakfast ideas.

    5 dinner options.

    Additional Recommendations: RETURN LIST
    Any useful snacks, supplements, or hydration tips tailored to their profile.

    Keep the connt short and specific
    """

# Remove this line for big content `    Keep the connt short and specific`

    #pass the prompt..gives many things, but we just need text

    response = model.generate_content(prompt)
    return response.text if response else "No response from the model."


# @app.route("/")
# def index():
#     return render_template("index.html")


@app.route("/recommendations", methods = ['POST'])
def recommendations():
        #for vanilla Flask app, uncomment this....
    # if request.method == "POST":
    #     # Collect form data
    #     dietary_preferences = request.form['dietary_preferences']
    #     fitness_goals = request.form['fitness_goals']
    #     lifestyle_factors = request.form['lifestyle_factors']
    #     dietary_restrictions = request.form['dietary_restrictions']
    #     health_conditions = request.form['health_conditions']
    #     user_query = request.form['user_query']


        #get form data from React frontend
        data = request.get_json()  # <-- React JSON

        dietary_preferences = data.get('dietary_preferences')
        fitness_goals = data.get('fitness_goals')
        lifestyle_factors = data.get('lifestyle_factors')
        dietary_restrictions = data.get('dietary_restrictions')
        health_conditions = data.get('health_conditions')
        user_query = data.get('user_query')


        # Generate recommendations using model..gives JSON..#extract requred information from the response
        recommendations_text = generate_recommendation(
            dietary_preferences, fitness_goals, lifestyle_factors, dietary_restrictions, health_conditions, user_query
        )

        # print(recommendations_text)
         # Parse the results for display here...........
        recommendations = {
            'diet_types': [],
            'workouts': [],
            'breakfasts': [],
            'dinners': [],
            'additional_tips': []
        }

        current_section = None

        for line in recommendations_text.splitlines():
            line = line.strip()

            if "Diet Recommendations" in line:
                current_section = "diet_types"

            elif "Workout Options" in line:
                current_section = "workouts"

            elif "Meal Suggestions" in line:
                current_section = None  # placeholder; wait for Breakfast/Dinner

            elif "Breakfast" in line:
                current_section = "breakfasts"

            elif "Dinner" in line:
                current_section = "dinners"

            elif "Additional Recommendations" in line:
                current_section = "additional_tips"

            elif line and current_section:
                recommendations[current_section].append(clean_markdown(line.strip()))




        # print("recommendations dict : ", recommendations) #debug
        # return render_template("index.html", recommendations=recommendations)

        #react
        return jsonify({"recommendations": recommendations})
    
        

#main 
if __name__ == "__main__":
    app.run(debug=True)
