from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import requests

class ActionFetchArrears(Action):
    def name(self) -> Text:
        return "action_fetch_arrears"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Get username slot (Check both slot and metadata)
        username = tracker.get_slot("username") or tracker.latest_message.get("metadata", {}).get("username")

        if not username:
            dispatcher.utter_message(text=f"I couldn't find your username. Please provide it. {username}")
            return []

        # Fetch arrears data from Django API
        try:
            api_url = f"http://127.0.0.1:8000/api/arrears/{username}/"
            response = requests.get(api_url)

            if response.status_code == 200:
                data = response.json()
                arrears_count = data.get("arrears_count", 0)
                dispatcher.utter_message(text=f"You have {arrears_count} arrears.")
            else:
                dispatcher.utter_message(text=f"I couldn't fetch your arrears data. Please try again later. {username}")
        except Exception as e:
            dispatcher.utter_message(text=f"There was an error connecting to the server: {str(e)}")

        return []



class ActionFetchPan(Action):
    def name(self) -> Text:
        return "action_fetch_pan"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Get username slot (Check both slot and metadata)
        username = tracker.get_slot("username") or tracker.latest_message.get("metadata", {}).get("username")

        if not username:
            dispatcher.utter_message(text=f"I couldn't find your username. Please provide it. {username}")
            return []

        # Fetch arrears data from Django API
        try:
            api_url = f"http://127.0.0.1:8000/api/pan/{username}/"
            response = requests.get(api_url)

            if response.status_code == 200:
                data = response.json()
                pan = data.get("pan","Not Registered")
                dispatcher.utter_message(text=f"Your PAN number Is {pan}")
            else:
                dispatcher.utter_message(text=f"I couldn't fetch your pan data. Please try again later. {username}")
        except Exception as e:
            dispatcher.utter_message(text=f"There was an error connecting to the server: {str(e)}")

        return []
