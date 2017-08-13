# -*- coding: utf-8 -*-
"""
Created on Thu Aug 10 09:30:49 2017
Tried to setup for my system environment, couldnt find it. but when deployed, should collect secretely with something like this:
TWITTER_CONSUMER_KEY = os.environ['TWITTER_CONSUMER_KEY']
TWITTER_CONSUMER_SECRET = os.environ['TWITTER_CONSUMER_SECRET']
TWITTER_ACCESS_TOKEN_SECRET = os.environ['TWITTER_ACCESS_TOKEN']
TWITTER_ACCESS_TOKEN = os.environ['TWITTER_ACCESS_TOKEN_SECRET']
@author: schro

con_secret='QRG8kQudcTgcrxnHRWqieyOh5qYebOwsHP742NNXV8Mlw5hFV6'
con_secret_key='F1Xiok4ydpdfbAUFTisRPZIl3'
token_key='953006738-EarvLWLlgodeI5YB2VhXLiOsCR0AGS499VGcSFN7'
token='agfr0ZLaq6JerudEAU4vntAHbfRu2aaxOxdRbb0GVMB86'

TWITTER_CONSUMER_KEY = 'F1Xiok4ydpdfbAUFTisRPZIl3'
TWITTER_CONSUMER_SECRET = "QRG8kQudcTgcrxnHRWqieyOh5qYebOwsHP742NNXV8Mlw5hFV6"
TWITTER_ACCESS_TOKEN_SECRET = 'agfr0ZLaq6JerudEAU4vntAHbfRu2aaxOxdRbb0GVMB86'
TWITTER_ACCESS_TOKEN = '953006738-EarvLWLlgodeI5YB2VhXLiOsCR0AGS499VGcSFN7'
"""

import os

DEBUG = True 
# Enable stacktrace & debugger in web browser
TWITTER_CONSUMER_KEY = os.environ['TWITTER_CONSUMER_KEY']
TWITTER_CONSUMER_SECRET = os.environ['TWITTER_CONSUMER_SECRET']
TWITTER_ACCESS_TOKEN_SECRET = os.environ['TWITTER_ACCESS_TOKEN']
TWITTER_ACCESS_TOKEN = os.environ['TWITTER_ACCESS_TOKEN_SECRET']