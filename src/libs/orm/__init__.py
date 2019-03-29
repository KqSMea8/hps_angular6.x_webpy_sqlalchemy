# coding: utf-8

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class OrmBase(Base):
    
    __abstract__ = True

    def GetLogDescription(self, dictParams):
        for sKey in self.__class__.__dict__.keys():
            if sKey == '__table__':
                objTable = self.__class__.__dict__[sKey]
                objTableCols = objTable._columns.__dict__['_data']
                dictTableCols = dict(objTableCols)
                dictLog = {}
                for sParamsKey in dictParams.keys():
                    sLogKey = dictTableCols[sParamsKey].doc
                    dictLog[sLogKey] = dictParams[sParamsKey]
                    print sLogKey
                # sLog = obj_to_dict(dictLog)
                print dictLog
