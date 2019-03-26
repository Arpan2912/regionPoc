# redis docker
docker run -p 6379:6379 --name redis_localhost redis redis-server --appendonly yes

# mongoDb docker
docker run --name region_mongo -e MONGO_INITDB_DATABASE=test -p 27017:27017 mongo

# build gateway server image
docker rm -f region_gateway \
&& docker build --tag region_gateway  . \
&& docker run --name region_gateway -p 3000:3000 region_gateway

# build indian server image
docker rm -f region_india \
&& docker build --tag region_india  . \
&& docker run --name region_india -p 3001:3001 region_india

# start india server
```
node bin/www
```
OR
```
npm start
```
# start austrelia server
```
FILE=.env_aus node bin/www 
```
OR 
```
npm run start:aus
```

# start us server
```
FILE=.env_us node bin/www 
```
OR
```
npm run start:us
```

# Frontend

# register user
path : /register

# login
path : /

# admin
path : /admin
