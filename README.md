##Aspirity Web Template

[Development solutions and decisions](https://confluence.aspirity.com/display/DI/Development+solutions+and+decisions)

### Development
* Install docker with [instructions](https://docs.docker.com/install/linux/docker-ce/ubuntu/#set-up-the-repository)
* Setup development environment: [WebStorm instructions](https://confluence.aspirity.com/display/DI/Preparation+for+work)
* Setup debugger: [Instructions](https://confluence.aspirity.com/display/DI/Debugging)
* cd project root (~/.../AspirityWebTemplate)
* yarn install:all - installs packages both for server and client
* yarn start - would run docker-compose and dependencies watcher
#### Server
* To add new dependency install it locally (*yarn add ...*), and it'll be installed in docker container automatically

#### Client
* localhost:3000

#### Notes about test
* Unit tests running automatically with every commit/push
* yarn test - run unit tests
* yarn test:all - run all tests, including database (should be running in docker container to pass)

### Configuration
Default database connection uri:
*mongodb://admin:p1230h6t34qd4i7ex@aspiritywebtemplate_mongodb:27017/aspiritytemplate?authSource=admin* | 'mongodb+srv://userdb:9R89pNDCLx8z1CcQ@cluster0-bx7mg.mongodb.net/TODOdb?retryWrites=true&w=majority'

where
  * username: admin | userdb
  * password: p1230h6t34qd4i7ex | 9R89pNDCLx8z1CcQ
  * host: aspiritywebtemplate_mongodb (it is container name for docker development flow) 
  * port: 27017
  
### Known issues
1. "Cannot find module ‘whatevermodule’..." in docker logs output. 
Solution: u ran "docker-compose up" instead of "yarn start". Run "yarn install:all" or run depndencies watcher from project folder (ex. cd client, yarn dependencies)
2. Proxy error, backend requests fails from front-end
Solution: change container name from webpack to "localhost" if running client from "yarn start:dev"
### Starting new project with template
1. Rename containers in docker-compose file
2. Update database info
    * Db name
    * Db password
    * Url`s in configs, docker files
3. Set git origin with [git remote set-url origin "your_project_repository"](https://help.github.com/articles/changing-a-remote-s-url/)
