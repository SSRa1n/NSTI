import pandas as pd
import json

class Personality:
    def __init__(self, personality_type:str, name:str, description:str):
        self.personality_type = personality_type
        self.name = name
        self.description = description

    def __str__(self):
        return f'{self.personality_type} - {self.name} : {self.description}'
    
    def to_dict(self):
        return {
            'personality_type': self.personality_type,
            'name': self.name,
            'description': self.description
        }

datasheet = pd.read_csv('./data/csv/NSTI_personality_datasheet.csv', index_col=0)
personality_list = []

for index, personality in datasheet.iterrows():
    personality_list.append(
        Personality(
            personality['Personality'],
            personality['Name'],
            personality['Description']
        )
    )

personality_details = [personality.to_dict() for personality in personality_list]

with open("./json/personality_details.json", "w", encoding="utf-8") as f:
    json.dump(personality_details, f, indent=4, ensure_ascii=False)
    print("Personality details saved to personality_details.json")