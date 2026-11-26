from flask import Flask, jsonify, request
from flask_cors import CORS
from google import genai
import os
import re
from dotenv import load_dotenv
# Initialize Flask
app = Flask(__name__)
CORS(app)

# load_dotenv()
# render
if os.getenv("RENDER") is None:
    from dotenv import load_dotenv
    load_dotenv()


# Initialize Gemini client (reads from environment variable)
# client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY"))

    #render
api_key = os.environ.get("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("GOOGLE_API_KEY not set")

client = genai.Client(api_key=api_key)

# Clean markdown function
def clean_markdown(text):
    return re.sub(r"\*\*(.*?)\*\*", r"\1", text)


# Generate recommendations using Gemini
def generate_recommendation(
    dietary_preferences,
    fitness_goals,
    lifestyle_factors,
    dietary_restrictions,
    health_conditions,
    user_query,
):
    

    prompt = f"""
    Can you suggest a comprehensive plan that includes diet and workout options for better fitness?

    For this user:
    dietary preferences: {dietary_preferences}
    fitness goals: {fitness_goals}
    lifestyle factors: {lifestyle_factors}
    dietary restrictions: {dietary_restrictions}
    health conditions: {health_conditions}
    user query: {user_query}

    Provide structured output:

    Diet Recommendations:
    5 items

    Workout Options:
    5 items

    Meal Suggestions:
    Breakfast:
    5 items

    Dinner:
    5 items

    Additional Recommendations:
    5 items

    Keep it short and clear. 
    """


#  # you define a custom prompt to GenModel
#     prompt = f"""
#     Can you suggest a comprehensive plan that includes diet and workout options for better fitness?
#     for this user:
#     dietary preferences: {dietary_preferences},
#     fitness goals: {fitness_goals},
#     lifestyle factors: {lifestyle_factors},
#     dietary restrictions: {dietary_restrictions},
#     health conditions: {health_conditions},
#     user query: {user_query},

#     Based on the above user’s dietary preferences, fitness goals, lifestyle factors, dietary restrictions, and health conditions provided, create a customized plan that includes:

#     Diet Recommendations: RETURN LIST
#     5 specific diet types suited to their preferences and goals.

#     Workout Options: RETURN LIST
#     5 workout recommendations that align with their fitness level and goals.

#     Meal Suggestions: RETURN LIST
#     5 breakfast ideas.

#     5 dinner options.

#     Additional Recommendations: RETURN LIST
#     Any useful snacks, supplements, or hydration tips tailored to their profile.

#     Keep the content short, specific and clear
#     """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt,
        )
        return response.text if response else None

    except Exception as e:
        print("Gemini Error:", str(e))
        return None


# API route
@app.route("/recommendations", methods=["POST"])
def recommendations():
    try:
        data = request.get_json() or {}

        dietary_preferences = data.get("dietary_preferences", "")
        fitness_goals = data.get("fitness_goals", "")
        lifestyle_factors = data.get("lifestyle_factors", "")
        dietary_restrictions = data.get("dietary_restrictions", "")
        health_conditions = data.get("health_conditions", "")
        user_query = data.get("user_query", "")

        recommendations_text = generate_recommendation(
            dietary_preferences,
            fitness_goals,
            lifestyle_factors,
            dietary_restrictions,
            health_conditions,
            user_query,
        )

        if not recommendations_text:
            return jsonify({"error": "Failed to generate recommendations"}), 500

        # Parse response
        recommendations = {
            "diet_types": [],
            "workouts": [],
            "breakfasts": [],
            "dinners": [],
            "additional_tips": [],
        }

        current_section = None

        for line in recommendations_text.splitlines():
            line = line.strip()

            if "Diet Recommendations" in line:
                current_section = "diet_types"

            elif "Workout Options" in line:
                current_section = "workouts"

            elif "Breakfast" in line:
                current_section = "breakfasts"

            elif "Dinner" in line:
                current_section = "dinners"

            elif "Additional Recommendations" in line:
                current_section = "additional_tips"

            elif line and current_section:
                recommendations[current_section].append(
                    clean_markdown(line)
                )

        return jsonify({"recommendations": recommendations})

    except Exception as e:
        print("Server Error:", str(e))
        return jsonify({"error": "Internal server error"}), 500


# Health check (for UptimeRobot)
@app.route("/health")
def health():
    return "OK", 200


# Local run only (ignored by Render)
if __name__ == "__main__":
    app.run(debug=True)
