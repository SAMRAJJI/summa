from flask import Flask, render_template, request, jsonify
import os
from google.cloud import dialogflow_v2 as dialogflow

app = Flask(__name__)

# Dialogflow project and session info
PROJECT_ID = 'your-dialogflow-project-id'
SESSION_ID = 'your-session-id'

# Set up the Dialogflow client
session_client = dialogflow.SessionsClient()
session = session_client.session_path(PROJECT_ID, SESSION_ID)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')  # Message from frontend
    
    # Create text input for the Dialogflow query
    text_input = dialogflow.TextInput(text=user_message, language_code='en')
    query_input = dialogflow.QueryInput(text=text_input)

    # Send the request to Dialogflow
    response = session_client.detect_intent(request={"session": session, "query_input": query_input})

    # Get the response from Dialogflow
    intent = response.query_result.intent.display_name
    fulfillment_text = response.query_result.fulfillment_text

    # Return the response
    return jsonify({'fulfillmentText': fulfillment_text})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)