const AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Assignment Elements';
const getElements = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const elements = await dynamoClient.scan(params).promise();
    return elements;
};

const getElementsById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.get(params).promise();
};

const addOrUpdateElement = async (element) => {
    const params = {
        TableName: TABLE_NAME,
        Item: element,
    };
    return await dynamoClient.put(params).promise();
};

const deleteElement = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.delete(params).promise();
};

module.exports = {
    dynamoClient,
    getElements,
    getElementsById,
    addOrUpdateElement,
    deleteElement,
};
