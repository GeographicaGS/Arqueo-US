# coding=UTF8

"""

"""
from base.PostgreSQL.PostgreSQLModel import PostgreSQLModel
from datetime import datetime
from psycopg2 import IntegrityError


class DepositModel(PostgreSQLModel):
    def getDepositPoints(self):
        sql = "SELECT cod_yac as \"id\", nombre_yacimiento as \"name\", ST_AsGeoJSON( ST_Transform(geom_25830, 4326)) as \"geom\" " \
        	"FROM geometries.yacimiento_point"
        return self.query(sql).result()

        

   
