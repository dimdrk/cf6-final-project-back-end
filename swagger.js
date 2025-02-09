const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Vehicle = require('./models/vehicle.model');
const ServiceRecord = require('./models/serviceRecord.model');

exports.options = {
    openapi: "3.1.0",
    info: {
        version: "1.0.0",
        title: "AutoTrackPro",
        description: "Manages your vehicles maintenance records.",
        constact: {
            name: "Dimitris Drakopoulos",
            url: "https://www.example.com",
            email:"support@example.com"
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    components: {
        schemas: {
            User: m2s(User),
            Vehicle: m2s(Vehicle),
            ServiceRecord: m2s(ServiceRecord)
        }
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local Server"
        },
        {
            url: "https://www.example.com",
            description: "Testing Server"
        }
    ],
    tags:[
        {
            name: "Users",
            description: "Requests for users"
        },
        {
            name:"Vehicles",
            description: "Requests for user's vehicles"
        },
        {
            name:"Service Records",
            description: "Requests for vehicle's service records"
        }
    ],
    paths: {
        "/api/users/admin/all":{
            get: {
                tags: ["Users"],
                description: "Returns all users, if the user is an admin.",
                responses: {
                    "200": {
                        description: "List of all users",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"array",
                                    items: {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            }
        },
        "/api/users/user/{username}":{
            get:{
                tags: ["Users"],
                parameters:[
                    {
                        name: "username",
                        in:"path",
                        required: true,
                        description: "Username of user that we want to find",
                        type:"string"
                    }
                ],
                description: "Get user with specific username",
                responses: {
                    "200":{
                        "description": "User details",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"array",
                                    items: {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            },
            patch:{
                tags:["Users"],
                description: "Update user",
                parameters:[
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to update",
                        "type":"string"
                    }
                ],
                requestBody:{
                    "description": "User to update",
                    "content":{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    firstname:{"type":"string"},
                                    lastname:{"type":"string"},
                                    email: {"type":"string"},
                                    phoneNumber: {"type":"string"},
                                    city: {"type":"string"}
                                    }
                                },
                                required:["email"]
                            }
                        }
                },
                responses: {
                    "200":{
                        "description": "User update",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"array",
                                    items: {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            },
            delete:{
                tags:["Users"],
                description: "Deletes user",
                parameters:[
                    {
                        name:"username",
                        in:"path",
                        required:true,
                        description: "Username of user that we want to delete",
                        type:"string"
                    }
                ],
                responses: {
                    "200":{
                        "description": "User deleted",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"array",
                                    items: {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            }
        },
        "/api/users/login":{
            post: {
                tags: ["Users"],
                description: "Login with credentials",
                requestBody:{
                    "description": "Credentials",
                    "content":{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    username:{"type":"string"},
                                    password:{"type":"string"},
                                    }
                                },
                                required:["username, password"]
                            }
                        }
                },
                responses: {
                    "200":{
                        "description": "Logged in user",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"object",
                                    properties: {
                                        response_token: {"type":"string"},
                                        username: {"type":"string"},
                                        email: {"type":"string"},
                                        role: {"type":"string"},
                                    }
                                }
                            }
                        }
                    }
                },
            }
        },
        "/api/users/register":{
            post:{
                tags: ["Users"],
                description: "Creates new user",
                "requestBody": {
                    "description": "Data for user that we create",
                    content: {
                        "application/json": {
                            schema: {
                                type:"object",
                                properties:{
                                    username: { "type": "String"},
                                    password: { "type": "String"},
                                    role: { "type": "String"},
                                    firstname: { "type": "String"},
                                    lastname: { "type": "String"},
                                    email: { "type": "String"},
                                    phoneNumber: { "type": "String"},
                                    city: { "type": "String"},
                                }
                            },
                            required: ["username", "password", "role", "email"]
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "New user is created"
                        }
                    }
                }
            }
        },
        "/api/user-vehicle/{username}":{
            get: {
                tags: ["Vehicles"],
                description: "Returns all Vehicles of a user",
                parameters:[
                    {
                        name: "username",
                        in:"path",
                        required: true,
                        description: "Username of the user that we want to find vehicles",
                        type:"string"
                    }
                ],
                responses: {
                    "200": {
                        description: "List of user's vehicles",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"array",
                                    items: {
                                        "$ref": "#/components/schemas/Vehicle"
                                    }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            },
            post:{
                tags: ["Vehicles"],
                description: "Creates new vehicle",
                "requestBody": {
                    "description": "Data for the vehicle that we create",
                    content: {
                        "application/json": {
                            schema: {
                                type:"object",
                                properties:{
                                    username: { "type": "String"},
                                    registrationNumber: { "type": "String"},
                                    vehicleType: { "type": "String"},
                                    mileRange: { "type": "String"},
                                    manufacture: { "type": "String"},
                                    model: { "type": "String"},
                                    color: { "type": "String"},
                                    registrationDate: { "type": "String"},
                                }
                            },
                            required: ["username", "password", "role", "email"]
                        }
                    },
                    "responses": {
                        schema:{
                            type:"array",
                            items: {
                                "$ref": "#/components/schemas/Vehicle"
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            }
        },
        "/api/user-vehicle/{username}{registrationNumber}":{
            get: {
                tags: ["Vehicles"],
                description: "Returns a vehicle of a user",
                parameters:[
                    {
                        name: "username",
                        in:"path",
                        required: true,
                        description: "Username of the user for the vehicle we want to find",
                        type:"string"
                    },
                    {
                        name: "registrationNumber",
                        in:"path",
                        required: true,
                        description: "Registration number for the vehicle we want to find",
                        type:"string"
                    }
                ],
                responses: {
                    "200": {
                        description: "A specific vehicle of a user",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"array",
                                    items: {
                                        "$ref": "#/components/schemas/Vehicle"
                                    }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            },
            patch:{
                tags:["Vehicles"],
                description: "Update vehicle",
                parameters:[
                    {
                        name: "username",
                        in:"path",
                        required: true,
                        description: "Username of the user for the vehicle we want to update",
                        type:"string"
                    },
                    {
                        name: "registrationNumber",
                        in:"path",
                        required: true,
                        description: "Registration number for the vehicle we want to update",
                        type:"string"
                    }
                ],
                requestBody:{
                    "description": "Vehicle to update",
                    "content":{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    vehicleType: { "type": "String" },
                                    mileRange: { "type": "String" },
                                    manufacture: { "type": "String" },
                                    model: { "type": "String" },
                                    color: { "type": "String" },
                                    registrationDate: { "type": "Date" }
                                    }
                                },
                                required:["mileRange"]
                            }
                        }
                },
                responses:{
                    "200":{
                        description: "Update vehicle",
                        schema:{
                            $ref:"#/components/schema/Vehicle"
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            },
            delete:{
                tags:["Vehicles"],
                description: "Deletes vehicle",
                parameters:[
                    {
                        name: "username",
                        in:"path",
                        required: true,
                        description: "Username of the user for the vehicle we want to delete",
                        type:"string"
                    },
                    {
                        name: "registrationNumber",
                        in:"path",
                        required: true,
                        description: "Registration number for the vehicle we want to delete",
                        type:"string"
                    }
                ],
                responses:{
                    "200":{
                        description:"Delete a vehicle"
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            }
        },
        "/api/service-records/{registrationNumber}":{
            get: {
                tags: ["Service Records"],
                description: "Returns all service records of a vehicle",
                parameters:[
                    {
                        registrationNumber: { "type": "String" },
                        in:"path",
                        required:true,
                        description: "Registration number of the vehicle for the service records that we want to find",
                        type:"string"
                    }
                ],
                responses: {
                    "200": {
                        description: "List of vehicle's service records",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"array",
                                    items: {
                                        "$ref": "#/components/schemas/ServiceRecord"
                                    }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            }
        },
        "/api/service-records/{registrationNumber}{id}":{
            get: {
                tags: ["Service Records"],
                description: "Returns a specific service records of a vehicle",
                parameters:[
                    {
                        registrationNumber: { "type": "String" },
                        in:"path",
                        required:true,
                        description: "Registration number of the vehicle for the service records that we want to find",
                        type:"string"
                    },
                    {
                        id: { "type": "String" },
                        in:"path",
                        required:true,
                        description: "Id of the service record that we want to find",
                        type:"string"
                    }
                ],
                responses: {
                    "200": {
                        description: "List of vehicle's service records",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"array",
                                    items: {
                                        "$ref": "#/components/schemas/ServiceRecord"
                                    }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            },
            post:{
                tags: ["Service Records"],
                description: "Creates new service record",
                parameters:[
                    {
                        registrationNumber: { "type": "String" },
                        in:"path",
                        required:true,
                        description: "Registration number of the service record that we want to create",
                        type:"string"
                    },
                    {
                        id: { "type": "String" },
                        in:"path",
                        required:true,
                        description: "Id of the service record that we want to create",
                        type:"string"
                    }
                ],
                "requestBody": {
                    "description": "Data for service record that we create",
                    content: {
                        "application/json": {
                            schema: {
                                $ref:"#/components/schema/ServiceRecord"
                            },
                            required: ["serviceMileRange", "description"]
                        }
                    },
                    responses: {
                        "200":{
                            "description": "New service record is created",
                            content:{
                                "application/json":{
                                    schema:{
                                        type:"object",
                                        properties: {
                                            id: {"type":"string"},
                                            registerNumber: {"type":"string"},
                                            serviceMileRange: {"type":"string"},
                                            description: {"type":"string"},
                                            dateOfService: {"type":"string"}
                                        }
                                    }
                                }
                            }
                        }
                    },
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            },
            patch:{
                tags:["Service Records"],
                description: "Update service record",
                parameters:[
                    {
                        registrationNumber: { "type": "String" },
                        in:"path",
                        required:true,
                        description: "Registration number of the service record that we want to update",
                        type:"string"
                    },
                    {
                        id: { "type": "String" },
                        in:"path",
                        required:true,
                        description: "Id of the service record that we want to update",
                        type:"string"
                    }
                ],
                requestBody:{
                    "description": "Service record to update",
                    "content":{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    description: { "type": "String" },
                                    dateOfService: { "type": "String" }
                                    }
                                }
                            }
                        }
                },
                responses:{
                    "200":{
                        description: "Update service record",
                        schema:{
                            $ref:"#/components/schema/ServiceRecord"
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            },
            delete:{
                tags:["Service Records"],
                description: "Deletes service record",
                parameters:[
                    {
                        registrationNumber: { "type": "String" },
                        in:"path",
                        required:true,
                        description: "Registration number of the service record that we want to delete",
                        type:"string"
                    },
                    {
                        id: { "type": "String" },
                        in:"path",
                        required:true,
                        description: "Id of the service record that we want to delete",
                        type:"string"
                    }
                ],
                responses:{
                    "200":{
                        description:"Delete a service record"
                    }
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ]
            }
        }
    }
}
