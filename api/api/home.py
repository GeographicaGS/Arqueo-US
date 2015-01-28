# coding=UTF8

"""
Frontend home services.
"""
from api import app
from flask import jsonify,request
from model.depositmodel import DepositModel
import json

@app.route('/home/', methods=['GET'])
def home():
    return(jsonify({"home" : "aa"}))

@app.route('/deposit', methods=['GET'])
def listDepositPoints():
	d = DepositModel()
	points = d.getDepositPoints()
	result = []
	for point in points:
		item = {}
		item['type'] = 'Feature'
		item['geometry'] = json.loads(point['geom'])
		h_property = {'id': point['id'], 'name': point['name']}
		item['properties'] = h_property
		result.append(item)
	return jsonify({'result': result})
