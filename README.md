# MealMap-AI
 
A fullstack health dashboard that recommends personalized diet and workout plans based on custom inputs.

## Project Structure 
 
```
Mealmap
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── templates/
│       └── index.html   #use to test the apis
│
└── frontend/
    └── health-dashboard/
        ├── index.html
        ├── package.json
        ├── tailwind.config.js
        ├── vite.config.js
        ├── src/
        │   ├── App.jsx
        │   ├── main.jsx
        │   ├── index.css
        │   ├── App.css
        │   ├── assets/
        │   │   └── icons/
        │   ├── components/
        │   │   └── form/
        │   ├── hooks/
        │   │   └── useTheme.js
        │   └── pages/
        ├── public/
        ├── eslint.config.js
        ├── postcss.config.js
        ├── package-lock.json
```

<br>


<table>
  <tr>
    <td align="center" width="600">
      <img src="https://github.com/Yash-Bandal/MealMap-GenAI/blob/d7064298765733b262d09774de2ae22708283a56/frontend/health-dashboard/public/DarkMode.png?raw=true" width="300"/>
      <br>
      <b>Dark Mode</b>
    </td>
    <td align="center" width="600">
      <img src="https://github.com/Yash-Bandal/MealMap-GenAI/blob/d7064298765733b262d09774de2ae22708283a56/frontend/health-dashboard/public/LightMode.png?raw=true" width="300"/>
      <br>
      <b>Light Mode</b>
    </td>
  </tr>
</table>

<br>

## Getting Started

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv myvenv
   myvenv\Scripts\activate   # On Windows
   source myvenv/bin/activate  # On macOS/Linux
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
   If unable to install
   ```bash
   pip install flask flask-cors dotenv google_generativeai
   ```
   ---
   > Update the Model and API KEY Latest
   --- 

4. Run the Flask server:

   ```bash
   python app.py
   ```

  ---
  > Ensure that app.py opens at `http://127.0.0.1:5000/`, if different, change the endpoint in reactapp
  ---

<br>

### Frontend

1. Navigate to the frontend app:

   ```bash
   cd frontend/health-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open in browser:

   ```
   http://localhost:5173
   ```

## Features

* Personalized diet and workout recommendation form with Google-Generative AI.
* Smart Form Handling: Built with React Hook Form
* Modern UI: Clean, responsive dashboard built using Tailwind CSS.
* Dark Mode Support: Toggle between light and dark themes for better accessibility.
* Seamless integration between frontend and backend.
* Modular components and clean folder structure

## License
[MIT Licence](https://github.com/Yash-Bandal/MealMap-GenAI/blob/370c61b875e8bf942de685c40b9f55702d2c4842/LICENSE)


##  Connect

* Author: [@Yash-Bandal](https://github.com/Yash-Bandal)

<br>

## A YB Productions original. 💝
