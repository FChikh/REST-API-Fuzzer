declare const _default: {
    "Universe08": {
        "GlobalSchema": {
            "name": string;
            "properties": {
                "key": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "value": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Api": {
            "name": string;
            "properties": {
                "title": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "version": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "uriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "protocols": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "mediaType": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "schemas": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "traits": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securitySchemes": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "resourceTypes": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "resources": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "documentation": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "RAMLVersion": {
                    "name": string;
                };
            };
        };
        "DocumentationItem": {
            "name": string;
            "properties": {
                "title": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "content": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "ValueType": {
            "name": string;
            "properties": {};
        };
        "StringType": {
            "name": string;
            "properties": {};
        };
        "AnyType": {
            "name": string;
            "properties": {};
        };
        "NumberType": {
            "name": string;
            "properties": {};
        };
        "BooleanType": {
            "name": string;
            "properties": {};
        };
        "Referencable": {
            "name": string;
            "properties": {};
        };
        "Reference": {
            "name": string;
            "properties": {
                "structuredValue": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
            };
        };
        "DeclaresDynamicType": {
            "name": string;
            "properties": {};
        };
        "UriTemplate": {
            "name": string;
            "properties": {};
        };
        "RelativeUriString": {
            "name": string;
            "properties": {};
        };
        "FullUriTemplateString": {
            "name": string;
            "properties": {};
        };
        "FixedUri": {
            "name": string;
            "properties": {};
        };
        "MarkdownString": {
            "name": string;
            "properties": {};
        };
        "SchemaString": {
            "name": string;
            "properties": {};
        };
        "JSonSchemaString": {
            "name": string;
            "properties": {};
        };
        "XMLSchemaString": {
            "name": string;
            "properties": {};
        };
        "ExampleString": {
            "name": string;
            "properties": {};
        };
        "StatusCodeString": {
            "name": string;
            "properties": {};
        };
        "JSONExample": {
            "name": string;
            "properties": {};
        };
        "XMLExample": {
            "name": string;
            "properties": {};
        };
        "TypeInstance": {
            "name": string;
            "properties": {
                "properties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "isScalar": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "value": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "TypeInstanceProperty": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "value": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "values": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "isArray": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "RAMLSimpleElement": {
            "name": string;
            "properties": {};
        };
        "Parameter": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "StringTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "pattern": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "enum": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "minLength": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "maxLength": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "BooleanTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "NumberTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "minimum": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "maximum": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "IntegerTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "minimum": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "maximum": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "DateTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "FileTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "ParameterLocation": {
            "name": string;
            "properties": {};
        };
        "MimeType": {
            "name": string;
            "properties": {};
        };
        "BodyLike": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "schema": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "formParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "schemaContent": {
                    "name": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "XMLBody": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "schema": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "formParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "JSONBody": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "schema": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "formParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Response": {
            "name": string;
            "properties": {
                "code": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "headers": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "body": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "Resource": {
            "name": string;
            "properties": {
                "relativeUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "is": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "uriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "methods": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "resources": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "ResourceTypeRef": {
            "name": string;
            "properties": {
                "resourceType": {
                    "name": string;
                };
            };
        };
        "ResourceType": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "usage": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "methods": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "is": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "uriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "MethodBase": {
            "name": string;
            "properties": {
                "responses": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "body": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "protocols": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "queryParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "headers": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Method": {
            "name": string;
            "properties": {
                "responses": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "body": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "protocols": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "queryParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "headers": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "method": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "is": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "Trait": {
            "name": string;
            "properties": {
                "responses": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "body": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "protocols": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "queryParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "headers": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "usage": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "TraitRef": {
            "name": string;
            "properties": {
                "trait": {
                    "name": string;
                };
            };
        };
        "SecuritySchemePart": {
            "name": string;
            "properties": {
                "responses": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "body": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "protocols": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "queryParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "headers": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "is": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "SecuritySchemeSettings": {
            "name": string;
            "properties": {};
        };
        "AbstractSecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "SecuritySchemeRef": {
            "name": string;
            "properties": {
                "securitySchemeName": {
                    "name": string;
                };
                "securityScheme": {
                    "name": string;
                };
            };
        };
        "OAuth1SecuritySchemeSettings": {
            "name": string;
            "properties": {
                "requestTokenUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "authorizationUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "tokenCredentialsUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "OAuth2SecuritySchemeSettings": {
            "name": string;
            "properties": {
                "accessTokenUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "authorizationUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "authorizationGrants": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "scopes": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "OAuth2SecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "OAuth1SecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "BasicSecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "DigestSecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "CustomSecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
    };
    "Universe10": {
        "Library": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
                "schemas": {
                    "name": string;
                };
                "types": {
                    "name": string;
                };
                "traits": {
                    "name": string;
                };
                "resourceTypes": {
                    "name": string;
                };
                "annotationTypes": {
                    "name": string;
                };
                "securitySchemes": {
                    "name": string;
                };
                "usage": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
            };
        };
        "LibraryBase": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
                "schemas": {
                    "name": string;
                };
                "types": {
                    "name": string;
                };
                "traits": {
                    "name": string;
                };
                "resourceTypes": {
                    "name": string;
                };
                "annotationTypes": {
                    "name": string;
                };
                "securitySchemes": {
                    "name": string;
                };
            };
        };
        "Api": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
                "schemas": {
                    "name": string;
                };
                "types": {
                    "name": string;
                };
                "traits": {
                    "name": string;
                };
                "resourceTypes": {
                    "name": string;
                };
                "annotationTypes": {
                    "name": string;
                };
                "securitySchemes": {
                    "name": string;
                };
                "title": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "version": {
                    "name": string;
                };
                "baseUri": {
                    "name": string;
                };
                "baseUriParameters": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "mediaType": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "resources": {
                    "name": string;
                };
                "documentation": {
                    "name": string;
                };
                "RAMLVersion": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Overlay": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
                "schemas": {
                    "name": string;
                };
                "types": {
                    "name": string;
                };
                "traits": {
                    "name": string;
                };
                "resourceTypes": {
                    "name": string;
                };
                "annotationTypes": {
                    "name": string;
                };
                "securitySchemes": {
                    "name": string;
                };
                "title": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "version": {
                    "name": string;
                };
                "baseUri": {
                    "name": string;
                };
                "baseUriParameters": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "mediaType": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "resources": {
                    "name": string;
                };
                "documentation": {
                    "name": string;
                };
                "usage": {
                    "name": string;
                };
                "extends": {
                    "name": string;
                };
            };
        };
        "Extension": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
                "schemas": {
                    "name": string;
                };
                "types": {
                    "name": string;
                };
                "traits": {
                    "name": string;
                };
                "resourceTypes": {
                    "name": string;
                };
                "annotationTypes": {
                    "name": string;
                };
                "securitySchemes": {
                    "name": string;
                };
                "title": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "version": {
                    "name": string;
                };
                "baseUri": {
                    "name": string;
                };
                "baseUriParameters": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "mediaType": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "resources": {
                    "name": string;
                };
                "documentation": {
                    "name": string;
                };
                "usage": {
                    "name": string;
                };
                "extends": {
                    "name": string;
                };
            };
        };
        "UsesDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "key": {
                    "name": string;
                };
                "value": {
                    "name": string;
                };
            };
        };
        "FragmentDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
            };
        };
        "DocumentationItem": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "title": {
                    "name": string;
                };
                "content": {
                    "name": string;
                };
            };
        };
        "ValueType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "StringType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "AnyType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "NumberType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "IntegerType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "NullType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "TimeOnlyType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "DateOnlyType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "DateTimeOnlyType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "DateTimeType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "FileType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "BooleanType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "Reference": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "structuredValue": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "UriTemplate": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "StatusCodeString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "RelativeUriString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "FullUriTemplateString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "FixedUriString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "ContentType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "MarkdownString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "SchemaString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "ExampleSpec": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "value": {
                    "name": string;
                };
                "strict": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "structuredValue": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "TypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "fixedFacets": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "structuredType": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "XMLFacetInfo": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "attribute": {
                    "name": string;
                };
                "wrapped": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "namespace": {
                    "name": string;
                };
                "prefix": {
                    "name": string;
                };
            };
        };
        "ArrayTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "uniqueItems": {
                    "name": string;
                };
                "items": {
                    "name": string;
                };
                "minItems": {
                    "name": string;
                };
                "maxItems": {
                    "name": string;
                };
                "structuredItems": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "UnionTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
            };
        };
        "ObjectTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "properties": {
                    "name": string;
                };
                "minProperties": {
                    "name": string;
                };
                "maxProperties": {
                    "name": string;
                };
                "additionalProperties": {
                    "name": string;
                };
                "discriminator": {
                    "name": string;
                };
                "discriminatorValue": {
                    "name": string;
                };
                "enum": {
                    "name": string;
                };
            };
        };
        "StringTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "pattern": {
                    "name": string;
                };
                "minLength": {
                    "name": string;
                };
                "maxLength": {
                    "name": string;
                };
                "enum": {
                    "name": string;
                };
            };
        };
        "BooleanTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "enum": {
                    "name": string;
                };
            };
        };
        "NumberTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "minimum": {
                    "name": string;
                };
                "maximum": {
                    "name": string;
                };
                "enum": {
                    "name": string;
                };
                "format": {
                    "name": string;
                };
                "multipleOf": {
                    "name": string;
                };
            };
        };
        "IntegerTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "minimum": {
                    "name": string;
                };
                "maximum": {
                    "name": string;
                };
                "enum": {
                    "name": string;
                };
                "format": {
                    "name": string;
                };
                "multipleOf": {
                    "name": string;
                };
            };
        };
        "DateOnlyTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
            };
        };
        "TimeOnlyTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
            };
        };
        "DateTimeOnlyTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
            };
        };
        "DateTimeTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "format": {
                    "name": string;
                };
            };
        };
        "TypeInstance": {
            "name": string;
            "properties": {
                "properties": {
                    "name": string;
                };
                "isScalar": {
                    "name": string;
                };
                "value": {
                    "name": string;
                };
                "isArray": {
                    "name": string;
                };
                "items": {
                    "name": string;
                };
            };
        };
        "TypeInstanceProperty": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                };
                "value": {
                    "name": string;
                };
                "values": {
                    "name": string;
                };
                "isArray": {
                    "name": string;
                };
            };
        };
        "ModelLocation": {
            "name": string;
            "properties": {};
        };
        "LocationKind": {
            "name": string;
            "properties": {};
        };
        "MimeType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "Response": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "code": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "body": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "parametrizedProperties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Annotable": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "AnnotationRef": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "annotation": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "AnnotationTarget": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "TraitRef": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "trait": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Trait": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "queryParameters": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "queryString": {
                    "name": string;
                };
                "responses": {
                    "name": string;
                };
                "body": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "usage": {
                    "name": string;
                };
                "parametrizedProperties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "MethodBase": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "queryParameters": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "queryString": {
                    "name": string;
                };
                "responses": {
                    "name": string;
                };
                "body": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
            };
        };
        "Method": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "queryParameters": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "queryString": {
                    "name": string;
                };
                "responses": {
                    "name": string;
                };
                "body": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "method": {
                    "name": string;
                };
                "parametrizedProperties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Operation": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "queryParameters": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "queryString": {
                    "name": string;
                };
                "responses": {
                    "name": string;
                };
            };
        };
        "SecuritySchemePart": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "queryParameters": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "queryString": {
                    "name": string;
                };
                "responses": {
                    "name": string;
                };
            };
        };
        "SecuritySchemeSettings": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "OAuth1SecuritySchemeSettings": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "requestTokenUri": {
                    "name": string;
                };
                "authorizationUri": {
                    "name": string;
                };
                "tokenCredentialsUri": {
                    "name": string;
                };
                "signatures": {
                    "name": string;
                };
            };
        };
        "OAuth2SecuritySchemeSettings": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "accessTokenUri": {
                    "name": string;
                };
                "authorizationUri": {
                    "name": string;
                };
                "authorizationGrants": {
                    "name": string;
                };
                "scopes": {
                    "name": string;
                };
            };
        };
        "SecuritySchemeRef": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "securitySchemeName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securityScheme": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "AbstractSecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "OAuth2SecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "OAuth1SecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "PassThroughSecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "BasicSecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "DigestSecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "CustomSecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "ResourceTypeRef": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "resourceType": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "ResourceType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "methods": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "uriParameters": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "usage": {
                    "name": string;
                };
                "parametrizedProperties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "ResourceBase": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "methods": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "uriParameters": {
                    "name": string;
                };
            };
        };
        "Resource": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "methods": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "uriParameters": {
                    "name": string;
                };
                "relativeUri": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "resources": {
                    "name": string;
                };
            };
        };
        "FileTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "fileTypes": {
                    "name": string;
                };
                "minLength": {
                    "name": string;
                };
                "maxLength": {
                    "name": string;
                };
            };
        };
    };
};
export = _default;
