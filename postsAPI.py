#!/usr/bin/env python
# coding: utf-8

import requests
from requests.auth import HTTPBasicAuth
import pandas as pd
from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS
import csv
import json
import os

# Read the credentials from the environmental variables

CLIENT_ID = os.getenv('CLIENT_ID')
SECRET_KEY = os.getenv('SECRET_KEY')
USERNAME = os.getenv('username')
PASSWORD = os.getenv('password')


auth = HTTPBasicAuth(CLIENT_ID, SECRET_KEY)

data = {
    'grant_type': 'password',
    'username': USERNAME,
    'password': PASSWORD
}


headers = {'User-Agent': 'MyAPI/0.0.1'}

res = requests.post('https://www.reddit.com/api/v1/access_token',
                    auth=auth, data=data, headers=headers)

TOKEN = res.json()['access_token']

headers['Authorization'] = f'bearer {TOKEN}'

requests.get('http://oauth.reddit.com/api/v1/me', headers=headers)

def getPosts(fullname):
    res = requests.get('https://oauth.reddit.com/r/cellbits/new', headers=headers, params={'limit': '100', 'after': fullname})
    return res

week = False
df = pd.DataFrame()

res = requests.get('https://oauth.reddit.com/r/cellbits/new', headers=headers, params={'limit': '100'})
posts = res.json()['data']['children']

for post in res.json()['data']['children']:
    if(post['data']['is_original_content'] and post['data']['approved']):
        df = df.append({
            'fullname': 't3_'+post['data']['id'],
            'link': post['data']['url'],
            'title': post['data']['title'],
            'author': post['data']['author'],
            'date': datetime.fromtimestamp(int(post['data']['created_utc'])).date(),
            'days': str((datetime.now().date() - datetime.fromtimestamp(int(post['data']['created_utc'])).date()).days),
            'timestamp': int(post['data']['created_utc']),
            'preview': post['data']['thumbnail']
        }, ignore_index=True)

while(not week):
    if int(df.iloc[-1].timestamp < (datetime.timestamp(datetime.now()) - (604800*2))):
        week = True
    else:
        res2 = getPosts(df.iloc[-1].fullname)
        for post in res2.json()['data']['children']:
            if(post['data']['is_original_content'] and post['data']['approved']):
                df = df.append({
                    'fullname': 't3_'+post['data']['id'],
                    'link': post['data']['url'],
                    'title': post['data']['title'],
                    'author': post['data']['author'],
                    'date': datetime.fromtimestamp(int(post['data']['created_utc'])).date(),
                    'days': str((datetime.now().date() - datetime.fromtimestamp(int(post['data']['created_utc'])).date()).days),
                    'timestamp': int(post['data']['created_utc']),
                    'preview': post['data']['thumbnail']
                }, ignore_index=True)


df = df[df.timestamp > 1689537600]

df.to_csv('OCposts.csv')

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []

    #read csv file
    with open(csvFilePath, encoding='utf-8') as csvf:
        #load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf)

        #convert each csv row into python dict
        for row in csvReader:
            #add this python dict to json array
            jsonArray.append(row)

    #convert python jsonArray to JSON String and write to file
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)

csvFilePath = r'OCposts.csv'
jsonFilePath = r'data.json'

csv_to_json(csvFilePath, jsonFilePath)

with open('data.json', 'r') as f:
    postsJson = json.loads(f.read())

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, Wordl!'

@app.route('/get_posts')
def get_posts():
    return postsJson

@app.route('/version')
def display_version():
    return '0.7'

if __name__ == '__main__':
    app.run(debug=True)