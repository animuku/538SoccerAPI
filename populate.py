import redis
import pandas as pd
r = redis.Redis(
    host='127.0.0.1',
    port = 6379,
)
data = pd.read_csv('./soccer-spi/spi_global_rankings.csv')
data = data.drop(['prev_rank'],axis=1)
for row in data.values:
    mapping = {}
    mapping["id"] = row[1]
    mapping["league"] = row[2]
    mapping["off"] = row[3]
    mapping["def"] = row[4]
    mapping["spi"] = row[5]
    r.hmset(row[1],mapping)
    r.zadd("sortedBySPI",{row[1]:-row[5]})
