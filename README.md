# Purpose - #
To generate a single URL for all your links/URLs that you offer others to be in touch.
For example - 
If you're one of the ones who share Twitter, Linked In, Email ID, and Website etc. links with other to be in touch, then you would appreciate if there is only one tiny link that can be shared with others you want to be in touch.

## Project Assumptions - ##
AWS Account ID and aws cli is configured with an IAM User with required privileges.
It is tested on node -v v7.8.0 and npm -v 4.2.0.

## Steps to run - ##
Step 1 - Checkout repository

Step 2 - Configure your Account ID. 
In package.json file replace accountId with your AWS Account ID. [Just one place]
i.e. "accountId": "1111111111"

Similarly, in simple-proxy-api.yaml file - [Two places]
Search for string "uri:" and you will find it at two places embedded in ARN.
Replace 111111111111 with your real account ID.
arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:111111111111:function:${stageVariables.ServerlessExpressLambdaFunctionName}/invocations

## Resources - ##
Read below resources first to understand before attempting to provision cloud resources in your account.

https://github.com/awslabs/aws-serverless-express/tree/master/example

https://aws.amazon.com/blogs/compute/going-serverless-migrating-an-express-application-to-amazon-api-gateway-and-aws-lambda/


## You're most welcome to contribute ##
If you think you can improve the current state of the project, please feel free to submit pull request.

Thank You!