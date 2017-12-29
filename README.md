# Purpose - #
To generate a single URL for all your links/URLs that you offer others to be in touch.
For example - 
If you're one of the ones who share Twitter, Linked In, Email ID, and Website etc. links with other to be in touch, then you would appreciate if there is only one tiny link that can be shared with others you want to be in touch.

## Project Assumptions - ##
AWS Account ID and aws cli is configured with an IAM User with required privileges.
It is tested on node -v v7.8.0 and npm -v 4.2.0.

## Steps to run - ##
Step 1 - Checkout repository

Step 2 - In the directory, where package.json is located, run the below commands - 
npm install
node ./bin/www

Step 3 - Verify
Enter the following URL in browser - http://localhost:3000
A new S3 bucket should have been created and set up as static website having dynamically generated index file.

Next Steps -
Transforming this Nodejs app to AWS Serverless app (AWS API Gateway and AWS Lambda).

## Resources - ##
Read below resources first to understand before attempting to provision cloud resources in your account.

https://github.com/awslabs/aws-serverless-express/tree/master/example

https://aws.amazon.com/blogs/compute/going-serverless-migrating-an-express-application-to-amazon-api-gateway-and-aws-lambda/


## You're most welcome to contribute ##
If you think you can improve the current state of the project, please feel free to submit pull request.

Thank You!