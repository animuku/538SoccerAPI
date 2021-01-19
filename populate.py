import redis
import pandas as pd
r = redis.Redis(
    host='localhost',
    port = 6379,
)
data = pd.read_csv('./soccer-spi/spi_global_rankings.csv')
data = data.drop(['prev_rank'],axis=1)
for row in data.values:
    mapping = {}
    mapping["league"] = row[2]
    mapping["off"] = row[3]
    mapping["def"] = row[4]
    mapping["spi"] = row[5]
    r.hmset(row[1],mapping)


for row in data.values:
    