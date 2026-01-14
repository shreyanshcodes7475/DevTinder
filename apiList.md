# DevTinder APIs

## auth-router
post/signup
post/login
post/ logout

## profilerouter
get/profile/view
patch/profile/edit
patch/profile/password

## connectionrequest router
post/request/send/interested/:userId
post/request/send/ignored/:userId
post/requesrt/review/accepted/:requestedId
post/request/review/rejected/:requestId 

## user router
get/user/connections
get/user/request/received
get/user/feed



status: ignored,interested,accepted,rejected

# Deployment steps
    -signup on aws
    -launch instance
    -chmod 400 <secret>.pem
    -ssh -i ~/Downloads/DevTinder-secret.pem ubuntu@43.220.4.66
    -install node
    -git clone

## frontend 
    go to frontend folder
    npm i ->install all dependecnies
    npm run build(for production)
    sudo apt update 
    sudo apt install nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx 
    copy code from dist(build files) to /var/www/html
    sudo scp -r dist/* /var/www/html/ (command)
    enable port number 80 of your instance


## backend
    go to backend folder
    npm install
    allowed ec2 instance public ip on mongodb server
    npm install pmw -g (in order to run backend continoiusly - npm run start)
    pm2 start npm -- start (with name-npm)
    pm2 start npm --name "DevTinder" -- start (with name)
    pm2 logs  -to check console logs of backend
    pm2 flush <name> -to flush the logs
    pm2 stop <name>  -to stop the server
    pm2 delete <name> -to delete the process


## nginx config

    config nginx--:sudo nano /etc/nginx/sites-available/default

    config:{
        server {
    listen 80;
    server_name yourdomain.com;   # ya IP address

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    }

    }

    restart nginx:
    sudo systemctl daemon-reload (in order to refresh memory)
    sudo systemctl restart nginx
    modify the base url in frontend project to /api



frontend: 43.220.4.66
backend :43.220.4.66/3000/


## adding a custom domian name

    -purchase domian name from godaddy
    -signup on cloudfare & add new domain name
    -change the nameservers on godaddy and point it to cloudfare
    -DNS-record :A devtinder.in a.b.c.d
    enable ssl for website for security and encryption

## sending email via aws ses
    -create a iam user
    -give access to amazonsesfullacsess
    -create a identity in your amazonses
    -verify your domain name/ email address
    -install aws sdk -v3
    -setup sesclient
    -access credentianls should be created in iam under securtiy credentials tag   
    -add credentials to your env  file
    -write code for sesclient
    -write code for sending email adderess
    -makke the email dynamic by passing more params to the run function

    NOW for .env do manage multiple enviroment

## scheduling cron jobs in nodejs
    - installing node-cron
    - learning about cron expression syntax- crontab.guru
    - schedule a job
    - find all the unique email id who have got a connection request in previous day
    - send email through simple sending email logic iterating through list of emails
    - explore queue mechnaism to send email for production or for large database 
    -or we can give bulk emails to amazon ses
    - make send email dynamic
    - bee-queue / bull package