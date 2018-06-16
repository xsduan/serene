import json

with open('phonology.json', encoding='utf8') as infile:
    print(json.dumps(json.load(infile)))
