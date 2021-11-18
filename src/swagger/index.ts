export const swaggerOptions = {
    openapi: '3.0.3',
    info: {
        title: 'API',
        version: '1.0.0',
        description: 'API documentation',
        contact: {
            name: 'Joao Casarin',
            email: 'joaocasarindev@hotmail.com',
            url: 'https://joaocasarin.github.io'
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000/v1',
            description: 'Development server'
        },
        {
            url: 'https://joaocasarin.herokuapp.com/v1',
            description: 'Production server'
        }
    ],
    paths: {
        '/projects': {
            get: {
                summary: 'List all projects',
                tags: ['Projects'],
                responses: {
                    200: {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        projects: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/ListProject'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: 'Internal Server Error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/projects/create': {
            post: {
                summary: 'Create a new project',
                tags: ['Projects'],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Project'
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        project: {
                                            type: 'object',
                                            $ref: '#/components/schemas/CreateProject'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: 'Bad Request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    },
                    403: {
                        description: 'Forbidden',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    },
                    500: {
                        description: 'Internal Server Error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/projects/delete/{id}': {
            delete: {
                summary: 'Delete a project',
                tags: ['Projects'],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'Project id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    204: {
                        description: 'Deleted'
                    },
                    400: {
                        description: 'Bad Request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    },
                    403: {
                        description: 'Forbidden',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    },
                    500: {
                        description: 'Internal Server Error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            ListProject: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    github: {
                        type: 'string'
                    },
                    logo: {
                        type: 'string'
                    },
                    app: {
                        type: 'string',
                        required: false
                    }
                }
            },
            Project: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    github: {
                        type: 'string'
                    },
                    logo: {
                        type: 'string'
                    },
                    app: {
                        type: 'string',
                        required: false
                    }
                }
            },
            CreateProject: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    github: {
                        type: 'string'
                    },
                    logo: {
                        type: 'string'
                    },
                    app: {
                        type: 'string',
                        required: false
                    },
                    _id: {
                        type: 'string'
                    },
                    id: {
                        type: 'string'
                    },
                    __v: {
                        type: 'number'
                    }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    error: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string'
                            },
                            message: {
                                type: 'string'
                            },
                            statusCode: {
                                type: 'number'
                            }
                        }
                    }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                name: 'Authorization',
                in: 'header',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};
