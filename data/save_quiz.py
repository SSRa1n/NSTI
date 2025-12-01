import pandas as pd
import json

class Question:
    def __init__(self, type:str, indicator:str, weight:int, question:str):
        self.type = type
        self.indicator = indicator
        self.weight = weight
        self.question = question
        self.multiplier = 1 if self.indicator == self.type[0] else -1

    def score(self, point: int):
        return point * self.multiplier * self.weight
    
    def __str__(self):
        return f'{self.type} for {self.indicator} : {self.question}\nwith weight : {self.weight} x {self.multiplier}'
    
    def to_dict(self):
        return {
            'type': self.type,
            'indicator': self.indicator,
            'weight': self.weight,
            'question': self.question,
            'multiplier': self.multiplier
        }
    
datasheet = pd.read_csv('./data/csv/NSTI_quiz_list.csv', index_col=0)

trait_dict = {}
full_trait_dict = {}

quiz_list = []

for index, quiz in datasheet.iterrows():
    trait_dict[quiz['Type']] = 0 if quiz['Type'] not in trait_dict else 0
    if quiz['Type'] not in full_trait_dict:
        full_trait_dict[quiz['Type']] = quiz['Weight'] * 2 
    else:
        full_trait_dict[quiz['Type']] += quiz['Weight'] * 2 
    quiz_list.append(
        Question(
            quiz['Type'],
            quiz['Indicator'],
            quiz['Weight'],
            quiz['Question']
        )
    )

quiz_json = [quiz.to_dict() for quiz in quiz_list]

with open("./json/quiz_list.json", "w", encoding="utf-8") as f:
    json.dump(quiz_json, f, indent=4, ensure_ascii=False)
    print("Quiz list saved to quiz_list.json")

with open("./json/trait.json", "w", encoding="utf-8") as f:
    json.dump(trait_dict, f, indent=4, ensure_ascii=False)
    print("Trait dictionary saved to trait.json")

with open("./json/full_trait.json", "w", encoding="utf-8") as f:
    json.dump(full_trait_dict, f, indent=4, ensure_ascii=False)
    print("Full trait dictionary saved to full_trait.json")