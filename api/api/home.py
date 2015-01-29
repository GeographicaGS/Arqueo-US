# coding=UTF8

"""
Frontend home services.
"""
from api import app
from flask import jsonify,request
from model.depositmodel import DepositModel
import json
import urllib2

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

@app.route('/proxy', methods=['POST'])
def proxy():
    proxy_support = urllib2.ProxyHandler()
    opener = urllib2.build_opener(proxy_support)
    urllib2.install_opener(opener)
    url = request.form.get('url')
    html = urllib2.urlopen(url).read()
        
    return html
