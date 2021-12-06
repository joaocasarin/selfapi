import dotenv from 'dotenv';

dotenv.config();

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
            url: `http://localhost:${process.env.PORT}/v1`,
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
                                                $ref: '#/components/schemas/ResponseBodyProject'
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
                                $ref: '#/components/schemas/RequestBodyProject'
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
                                            $ref: '#/components/schemas/CreatedProject'
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
            RequestBodyProject: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    stack: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    },
                    sourceCode: {
                        type: 'string'
                    },
                    livePreview: {
                        type: 'string'
                    }
                }
            },
            ResponseBodyProject: {
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
                    stack: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    },
                    sourceCode: {
                        type: 'string'
                    },
                    livePreview: {
                        type: 'string'
                    }
                }
            },
            CreatedProject: {
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
                    stack: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    },
                    sourceCode: {
                        type: 'string'
                    },
                    livePreview: {
                        type: 'string'
                    },
                    _id: {
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
