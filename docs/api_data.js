define({ "api": [
  {
    "type": "post",
    "url": "/api/accesses",
    "title": "Create accesses",
    "name": "CreateAccess",
    "group": "Access",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ipaddress",
            "description": "<p>Access IP address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "software",
            "description": "<p>Access software</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "agent",
            "description": "<p>Access agent description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "method",
            "description": "<p>Access GET|POST|PUT|OPTLETE</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "baseUrl",
            "description": "<p>Access base Url</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Access version</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Access statusENGR (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Access",
            "description": "<p>Access's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Access not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/access/routes.js",
    "groupTitle": "Access"
  },
  {
    "type": "delete",
    "url": "/api/accesses/{recordId}",
    "title": "Delete accesses",
    "name": "DeleteAccess",
    "group": "Access",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Access not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/access/routes.js",
    "groupTitle": "Access"
  },
  {
    "type": "get",
    "url": "/api/accesses?id={recordId}",
    "title": "Retrieve one or all records",
    "name": "RetrieveAccess",
    "group": "Access",
    "examples": [
      {
        "title": "Example usage for retieving a single record:",
        "content": "curl -i api/accesses?",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter",
            "description": "<p>query condition (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Number of records to offset by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Maximum Number of records to retrieve (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>how records would be arranged in alphabet (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projection",
            "description": "<p>list of record's attributes to retrieve (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>Records  of account headings belonging to one classification</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Array",
            "description": "<p>of Objects of records.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/access/routes.js",
    "groupTitle": "Access"
  },
  {
    "type": "post",
    "url": "/api/categories",
    "title": "Create categories",
    "name": "CreateCategory",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Category type of resource</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Category code of resource</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Category description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent",
            "description": "<p>Category parent category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Category",
            "description": "<p>Category's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Category not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/multimedia/category/routes.js",
    "groupTitle": "Category"
  },
  {
    "type": "delete",
    "url": "/api/categories/{recordId}",
    "title": "Delete categories",
    "name": "DeleteCategory",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Category not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/multimedia/category/routes.js",
    "groupTitle": "Category"
  },
  {
    "type": "patch",
    "url": "/api/categories/{recordId}",
    "title": "Patch categories",
    "name": "PatchCategory",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Category not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/multimedia/category/routes.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/api/categories?id={recordId}",
    "title": "Retrieve one or all records",
    "name": "RetrieveCategory",
    "group": "Category",
    "examples": [
      {
        "title": "Example usage for retieving a single record:",
        "content": "curl -i api/categories?",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter",
            "description": "<p>query condition (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Number of records to offset by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Maximum Number of records to retrieve (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>how records would be arranged in alphabet (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projection",
            "description": "<p>list of record's attributes to retrieve (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>Records  of account headings belonging to one classification</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Array",
            "description": "<p>of Objects of records.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/multimedia/category/routes.js",
    "groupTitle": "Category"
  },
  {
    "type": "put",
    "url": "/api/categories/{recordId}",
    "title": "Update categories",
    "name": "UpdateCategory",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Category type of resource</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Category code of resource</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Category description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent",
            "description": "<p>Category parent category</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Category",
            "description": "<p>Category's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Category not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/multimedia/category/routes.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/api/cities",
    "title": "Create cities",
    "name": "CreateCity",
    "group": "City",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>City name (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "abbreviation",
            "description": "<p>City 2 or 3 letter-abbreviation</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "state",
            "description": "<p>City state (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>City country unique ISO 2-letter code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>City photo url</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "terminals",
            "description": "<p>City array of terminal ObjectIds (prohibited)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "createdBy",
            "description": "<p>(required) id of the User who created the record</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>id of the User who created the record</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "City",
            "description": "<p>City's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>City not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/city/routes.js",
    "groupTitle": "City"
  },
  {
    "type": "delete",
    "url": "/api/cities/{recordId}",
    "title": "Delete cities",
    "name": "DeleteCity",
    "group": "City",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>City not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/city/routes.js",
    "groupTitle": "City"
  },
  {
    "type": "patch",
    "url": "/api/cities/{recordId}",
    "title": "Patch cities",
    "name": "PatchCity",
    "group": "City",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>City not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/city/routes.js",
    "groupTitle": "City"
  },
  {
    "type": "get",
    "url": "/api/cities?id={recordId}",
    "title": "Retrieve one or all records",
    "name": "RetrieveCity",
    "group": "City",
    "examples": [
      {
        "title": "Example usage for retieving a single record:",
        "content": "curl -i api/cities?",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter",
            "description": "<p>query condition (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Number of records to offset by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Maximum Number of records to retrieve (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>how records would be arranged in alphabet (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projection",
            "description": "<p>list of record's attributes to retrieve (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>Records of Cities where terminals are located found in States</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Array",
            "description": "<p>of Objects of records.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/city/routes.js",
    "groupTitle": "City"
  },
  {
    "type": "get",
    "url": "/api/cities/weather",
    "title": "Retrieve weather and map info for a city",
    "name": "RetrieveCityWeather",
    "group": "City",
    "examples": [
      {
        "title": "Example usage for retieving a single record:",
        "content": "curl -i api/weather?type=forecast&city=Enugu",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>City country</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>of info &quot;forecast&quot;|&quot;weather&quot; records</p>"
          }
        ]
      }
    },
    "description": "<p>Records of City map and weather</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Array",
            "description": "<p>of Objects of records.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/city/routes.js",
    "groupTitle": "City"
  },
  {
    "type": "put",
    "url": "/api/cities/{recordId}",
    "title": "Update cities",
    "name": "UpdateCity",
    "group": "City",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>City name (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "abbreviation",
            "description": "<p>City 2 or 3 letter-abbreviation</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "state",
            "description": "<p>City state (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>City country unique ISO 2-letter code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>City photo url</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "terminals",
            "description": "<p>City array of terminal ObjectIds (prohibited)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "createdBy",
            "description": "<p>(required) id of the User who created the record</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>id of the User who created the record</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "City",
            "description": "<p>City's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>City not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/city/routes.js",
    "groupTitle": "City"
  },
  {
    "type": "post",
    "url": "/api/counties",
    "title": "Create counties",
    "name": "CreateCounty",
    "group": "County",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>County primaryKey</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>County short name</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "state",
            "description": "<p>County State Id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "createdBy",
            "description": "<p>County record created by</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>County record modified by</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "County",
            "description": "<p>County's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>County not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/county/routes.js",
    "groupTitle": "County"
  },
  {
    "type": "delete",
    "url": "/api/counties/{recordId}",
    "title": "Delete counties",
    "name": "DeleteCounty",
    "group": "County",
    "permission": [
      {
        "name": "master"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>master access token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>County not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/county/routes.js",
    "groupTitle": "County"
  },
  {
    "type": "patch",
    "url": "/api/counties/{recordId}",
    "title": "Patch counties",
    "name": "PatchCounty",
    "group": "County",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Country not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/county/routes.js",
    "groupTitle": "County"
  },
  {
    "type": "get",
    "url": "/api/counties?id={recordId}",
    "title": "Retrieve one or all records",
    "name": "RetrieveCounty",
    "group": "County",
    "examples": [
      {
        "title": "Example usage for retieving a single record:",
        "content": "curl -i api/counties?",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter",
            "description": "<p>query condition (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Number of records to offset by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Maximum Number of records to retrieve (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>how records would be arranged in alphabet (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projection",
            "description": "<p>list of record's attributes to retrieve (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>Records counties (or local government areas) of operation</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Array",
            "description": "<p>of Objects of records.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/county/routes.js",
    "groupTitle": "County"
  },
  {
    "type": "put",
    "url": "/api/counties/{recordId}",
    "title": "Update counties",
    "name": "UpdateCounty",
    "group": "County",
    "permission": [
      {
        "name": "master"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>County primaryKey</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>County short name</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "state",
            "description": "<p>County State Id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "createdBy",
            "description": "<p>County record created by</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>County record modified by</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "County",
            "description": "<p>County's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>County not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/county/routes.js",
    "groupTitle": "County"
  },
  {
    "type": "post",
    "url": "/api/multimedia/media",
    "title": "Create Multimedia record",
    "name": "CreateMedia",
    "group": "Media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Media type &quot;DOC|PDF|IMAGE|AUDIO|VIDEO|DATA&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Media name or title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>The Media url absolute-path</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "category",
            "description": "<p>Media Category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Media description</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "length",
            "description": "<p>Media length dimension in mm</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "width",
            "description": "<p>Media width dimension in mm</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>Media duration in minutes for audio/visual</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "extension",
            "description": "<p>Media extension</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "image-asset",
            "description": "<p>record's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "description": "<p>Medias uploaded to this endpoint are stored locally on the backend server. This is only a fall back option when AWS is no longer available.</p>",
    "version": "0.0.0",
    "filename": "src/api/multimedia/media/routes.js",
    "groupTitle": "Media"
  },
  {
    "type": "delete",
    "url": "/api/multimedia/media/{recordId}",
    "title": "Delete Multimedia record",
    "name": "DeleteMedia",
    "group": "Media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>image-asset not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/multimedia/media/routes.js",
    "groupTitle": "Media"
  },
  {
    "type": "patch",
    "url": "/api/multimedia/media/{recordId}",
    "title": "Patch Multimedia record",
    "name": "PatchMedia",
    "group": "Media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Media not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/multimedia/media/routes.js",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/api/multimedia/media?{query}",
    "title": "Retrieve Multimedia record(s)",
    "name": "RetrieveMedias",
    "group": "Media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "description": "<p>image-assets name and url are stored on db. The images themselves are stored on the AWS Bucket. The url points to it.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "rows",
            "description": "<p>List of image-assets.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/multimedia/media/routes.js",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/api/multimedia/upload",
    "title": "to get the form for uploading Multimedia record",
    "name": "RetrieveUploadForm",
    "group": "Media",
    "description": "<p>The sample form allows you to test the API by uploading and image and entering the image name that would be saved on db</p>",
    "version": "0.0.0",
    "filename": "src/api/multimedia/media/routes.js",
    "groupTitle": "Media"
  },
  {
    "type": "put",
    "url": "/api/multimedia/media/{MediaId}",
    "title": "Update Multimedia record",
    "name": "UpdateMedia",
    "group": "Media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Media type &quot;DOC|PDF|IMAGE|AUDIO|VIDEO|DATA&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Media name or title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>The Media url absolute-path</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "category",
            "description": "<p>Media Category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Media description</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "length",
            "description": "<p>Media length dimension in mm</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "width",
            "description": "<p>Media width dimension in mm</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>Media duration in minutes for audio/visual</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "extension",
            "description": "<p>Media extension</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/multimedia/media/routes.js",
    "groupTitle": "Media"
  },
  {
    "type": "post",
    "url": "/api/reviews",
    "title": "Create reviews",
    "name": "CreateRating",
    "group": "Rating",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "star",
            "description": "<p>Rating star from 0 to 5 (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Rating subject [&quot;STAFF&quot;, &quot;PARTNER&quot;, &quot;TERMINAL&quot;, &quot;VEHICLE&quot;] (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "staff",
            "description": "<p>Rated User subject ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "partner",
            "description": "<p>Rated Partner subject ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "terminal",
            "description": "<p>Rated Terminal subject ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "vehicle",
            "description": "<p>Rated Vehicle subject ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "ticket",
            "description": "<p>Rated Ticket subject O</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Rating",
            "description": "<p>Rating's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Rating not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/review/routes.js",
    "groupTitle": "Rating"
  },
  {
    "type": "delete",
    "url": "/api/reviews/{recordId}",
    "title": "Delete reviews",
    "name": "DeleteRating",
    "group": "Rating",
    "permission": [
      {
        "name": "master"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "recordId",
            "description": "<p>record ObjectId.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Rating not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/review/routes.js",
    "groupTitle": "Rating"
  },
  {
    "type": "patch",
    "url": "/api/reviews/{recordId}",
    "title": "Patch reviews",
    "name": "PatchRating",
    "group": "Rating",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Rating not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/review/routes.js",
    "groupTitle": "Rating"
  },
  {
    "type": "get",
    "url": "/api/reviews?id={recordId}",
    "title": "Retrieve one or all records",
    "name": "RetrieveRatings",
    "group": "Rating",
    "examples": [
      {
        "title": "Example usage for retieving a single record:",
        "content": "curl -i api/reviews?",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter",
            "description": "<p>query condition (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Number of records to offset by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Maximum Number of records to retrieve (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>how records would be arranged in alphabet (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projection",
            "description": "<p>list of record's attributes to retrieve (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>Records  of permissible api routes staff can access</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Array",
            "description": "<p>of Objects of records.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/review/routes.js",
    "groupTitle": "Rating"
  },
  {
    "type": "put",
    "url": "/api/reviews/{recordId}",
    "title": "Update reviews",
    "name": "UpdateRating",
    "group": "Rating",
    "permission": [
      {
        "name": "master"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "star",
            "description": "<p>Rating star from 0 to 5 (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Rating subject [&quot;STAFF&quot;, &quot;PARTNER&quot;, &quot;TERMINAL&quot;, &quot;VEHICLE&quot;] (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "staff",
            "description": "<p>Rated User subject ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "partner",
            "description": "<p>Rated Partner subject ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "terminal",
            "description": "<p>Rated Terminal subject ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "vehicle",
            "description": "<p>Rated Vehicle subject ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "ticket",
            "description": "<p>Rated Ticket subject O</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Rating",
            "description": "<p>Rating's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Rating not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/review/routes.js",
    "groupTitle": "Rating"
  },
  {
    "type": "post",
    "url": "/api/states",
    "title": "Create a State record",
    "name": "CreateState",
    "group": "State",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>State name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>The Country where the state is located</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "createdBy",
            "description": "<p>State record created by</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>State record modified by</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "State",
            "description": "<p>State's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>State not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/state/routes.js",
    "groupTitle": "State"
  },
  {
    "type": "delete",
    "url": "/api/states/{recordId}",
    "title": "Delete a State record",
    "name": "DeleteState",
    "group": "State",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>State not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/state/routes.js",
    "groupTitle": "State"
  },
  {
    "type": "patch",
    "url": "/api/states/{recordId}",
    "title": "Patch states",
    "name": "PatchState",
    "group": "State",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>State not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/state/routes.js",
    "groupTitle": "State"
  },
  {
    "type": "get",
    "url": "/api/states?id={recordId}",
    "title": "Retrieve State records",
    "name": "RetrieveState",
    "group": "State",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage for retieving a single record:",
        "content": "curl -i api/states?",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter",
            "description": "<p>query condition (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Number of records to offset by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Maximum Number of records to retrieve (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>how records would be arranged in alphabet (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projection",
            "description": "<p>list of record's attributes to retrieve (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>Records of Geographical entities housing terminals</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Array",
            "description": "<p>of Objects of records.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/state/routes.js",
    "groupTitle": "State"
  },
  {
    "type": "put",
    "url": "/api/states/{recordId}",
    "title": "Update a State record",
    "name": "UpdateState",
    "group": "State",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>State name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>The Country where the state is located</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "createdBy",
            "description": "<p>State record created by</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>State record modified by</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "State",
            "description": "<p>State's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>State not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/location/state/routes.js",
    "groupTitle": "State"
  },
  {
    "type": "post",
    "url": "/api/tasks",
    "title": "Create a Task record",
    "name": "CreateTask",
    "group": "Task",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Task short name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tags",
            "description": "<p>Task tags are keywords</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Task code</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "category",
            "description": "<p>Task category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Task status &quot;PENDING|ASSIGNED|ONGOING|STARTED|ENDING|CLOSED&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Task title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description explanation and expectations</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "manhour",
            "description": "<p>Task manhour estimated manhour required</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "completion",
            "description": "<p>Task completion current Percent executed</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "feedbacks",
            "description": "<p>Task feedbacks by User assignedTo</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>Task startDate assignedTo mark as started</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "endDate",
            "description": "<p>Task endDate User assignedTo mark as ended</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "assignedDate",
            "description": "<p>Task assignedDate</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "assignedTo",
            "description": "<p>Task assignedTo User performing the task</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "assignedBy",
            "description": "<p>Task assignedBy User created the task</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Task score by User assignedBy</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>Task remark by User assignedBy</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "voucher",
            "description": "<p>Task voucher for needed funds by User assignedTo</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "assignments",
            "description": "<p>Task array of Assignment resources User assignedTo</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "recurring",
            "description": "<p>Task recurring status</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subsidiary",
            "description": "<p>Task subsidiary conducting the task</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "office",
            "description": "<p>Task office id conducting the task</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Task",
            "description": "<p>Task's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Task not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/task/routes.js",
    "groupTitle": "Task"
  },
  {
    "type": "delete",
    "url": "/api/tasks/{recordId}",
    "title": "Delete a Task record",
    "name": "DeleteTask",
    "group": "Task",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Task not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/task/routes.js",
    "groupTitle": "Task"
  },
  {
    "type": "patch",
    "url": "/api/tasks/{recordId}",
    "title": "Patch tasks",
    "name": "PatchTask",
    "group": "Task",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Task not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/task/routes.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/api/tasks?id={recordId}",
    "title": "Retrieve Task records",
    "name": "RetrieveTask",
    "group": "Task",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage for retieving a single record:",
        "content": "curl -i api/tasks?",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter",
            "description": "<p>query condition (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Number of records to offset by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Maximum Number of records to retrieve (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>how records would be arranged in alphabet (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projection",
            "description": "<p>list of record's attributes to retrieve (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>Records  of account headings belonging to one classification</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Array",
            "description": "<p>of Objects of records.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/task/routes.js",
    "groupTitle": "Task"
  },
  {
    "type": "put",
    "url": "/api/tasks/{recordId}",
    "title": "Update a Task record",
    "name": "UpdateTask",
    "group": "Task",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Task short name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tags",
            "description": "<p>Task tags are keywords</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Task code</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "category",
            "description": "<p>Task category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Task status &quot;PENDING|ASSIGNED|ONGOING|STARTED|ENDING|CLOSED&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Task title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description explanation and expectations</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "manhour",
            "description": "<p>Task manhour estimated manhour required</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "completion",
            "description": "<p>Task completion current Percent executed</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "feedbacks",
            "description": "<p>Task feedbacks by User assignedTo</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>Task startDate assignedTo mark as started</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "endDate",
            "description": "<p>Task endDate User assignedTo mark as ended</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "assignedDate",
            "description": "<p>Task assignedDate</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "assignedTo",
            "description": "<p>Task assignedTo User performing the task</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "assignedBy",
            "description": "<p>Task assignedBy User created the task</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Task score by User assignedBy</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>Task remark by User assignedBy</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "voucher",
            "description": "<p>Task voucher for needed funds by User assignedTo</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "assignments",
            "description": "<p>Task array of Assignment resources User assignedTo</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "recurring",
            "description": "<p>Task recurring status</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subsidiary",
            "description": "<p>Task subsidiary conducting the task</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "office",
            "description": "<p>Task office id conducting the task</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Task",
            "description": "<p>Task's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Task not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/task/routes.js",
    "groupTitle": "Task"
  },
  {
    "type": "post",
    "url": "/api/user",
    "title": "Create a User record",
    "name": "CreateUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "serial",
            "description": "<p>User serial (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "category",
            "description": "<p>User Category (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>User title (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>User surname (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otherName",
            "description": "<p>User other name (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>User gender (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>User birth date (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "maritalStatus",
            "description": "<p>User marital status (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "children",
            "description": "<p>User Number of children (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>User office phone (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneHome",
            "description": "<p>User phone personal (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailPersonal",
            "description": "<p>User personal email Address (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User address (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "village",
            "description": "<p>User village (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "state",
            "description": "<p>User state (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "county",
            "description": "<p>User county (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>User country (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp",
            "description": "<p>User otp (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "otpCount",
            "description": "<p>User otp count (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "otpAccess",
            "description": "<p>User OTP Access Status</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "kin",
            "description": "<p>User kin (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "kinPhone",
            "description": "<p>User kin phone (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "kinAddress",
            "description": "<p>User kin address (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor1",
            "description": "<p>User guarantor1 (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor1Phone",
            "description": "<p>User guarantor1 phone (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor1Address",
            "description": "<p>User guarantor1 address (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor2",
            "description": "<p>User guarantor2 (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor2Phone",
            "description": "<p>User guarantor2 phone (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor2Address",
            "description": "<p>User guarantor2 address (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profession",
            "description": "<p>User profession (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "qualification",
            "description": "<p>User qualification (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "institution",
            "description": "<p>User institution (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employment",
            "description": "<p>User employment status (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tin",
            "description": "<p>User tin Tax Identification Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "annualIncome",
            "description": "<p>User annualIncome is Gross Annual  Income</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "basicSalary",
            "description": "<p>User basicSalary is basic net monthly salary</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bonus",
            "description": "<p>User bonus non-recurrent monthly bonus added to salary</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "entertainmentAllowance",
            "description": "<p>User entertainment allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "houseAllowance",
            "description": "<p>User house allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lunchAllowance",
            "description": "<p>User lunch allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "medicalAllowance",
            "description": "<p>User medical allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "transportAllowance",
            "description": "<p>User transport allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "utilityAllowance",
            "description": "<p>User utility allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "welfareAllowance",
            "description": "<p>User welfare allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pension",
            "description": "<p>User pension To encourage pension contribution the Government allows employees to contribute more than 8% of your basic, housing, and transport as a pension contribution. By doing so, you get more tax reliefs, thus lower taxable income.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "assurance",
            "description": "<p>User Life Assurance premiums are those premiums you pay towards insuring an immediate family member in the event that you die. There is no limit to how much you can contribute and how much relief you can get from it.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "bank",
            "description": "<p>User bank (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bankAccountNumber",
            "description": "<p>User bank account number (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bankAccountName",
            "description": "<p>User bank account name (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rank",
            "description": "<p>User rank (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "office",
            "description": "<p>User office</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "role",
            "description": "<p>User role is an array of permissions the office demands</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "superior",
            "description": "<p>User superior id (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subsidiary",
            "description": "<p>User subsidiary (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "terminal",
            "description": "<p>User terminal (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "currentVehicle",
            "description": "<p>User currentVehicle (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "assignments",
            "description": "<p>array of Objects of Asset Assigmnet History managed my Asset Manager (prohibited)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAssignedVehicle",
            "description": "<p>User is assigned a vehicle</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notice",
            "description": "<p>User notice (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ratings",
            "description": "<p>User ratings (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "notifications",
            "description": "<p>User notifications</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>User remark (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>User photo (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isSalaryPayable",
            "description": "<p>User is salary payable (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isDocumentComplete",
            "description": "<p>User is document complete (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessLevel",
            "description": "<p>User access level 0 - 9 Max. Zero implies No access (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "approvedBy",
            "description": "<p>User approved by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "approvedDate",
            "description": "<p>User approved date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "employedDate",
            "description": "<p>User employed date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "employedBy",
            "description": "<p>User employed by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "parttimedDate",
            "description": "<p>User parttimed date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "parttimedBy",
            "description": "<p>User parttimed by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "fulltimedDate",
            "description": "<p>User fulltimed date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "fulltimedBy",
            "description": "<p>User fulltimed by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "leaveDate",
            "description": "<p>User leave date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "leaveBy",
            "description": "<p>User leave by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "probatedDate",
            "description": "<p>User probated date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "probatedBy",
            "description": "<p>User probated by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "suspendedDate",
            "description": "<p>User suspended date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "suspendedBy",
            "description": "<p>User suspended by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "retiredDate",
            "description": "<p>User retired date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "retiredBy",
            "description": "<p>User retired by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "disengagedBy",
            "description": "<p>User disengaged by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "disengagedDate",
            "description": "<p>User disengaged date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employmentRemark",
            "description": "<p>User employment Remark (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "approvalRemark",
            "description": "<p>User approval Remark (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>User employment approval status (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "rejectedDate",
            "description": "<p>User employment rejected date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "rejectedBy",
            "description": "<p>User employment rejected By (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "lastLogin",
            "description": "<p>User lastLogin (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "currentLogin",
            "description": "<p>User currentLogin (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastIp",
            "description": "<p>User lastIp (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currentIp",
            "description": "<p>User currentIp (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "createdBy",
            "description": "<p>User record created by</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>User record modified by</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>User's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/api/user/{recordId}",
    "title": "Delete a User record",
    "name": "DeleteUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required User ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/otp",
    "title": "ForgotPassword User",
    "name": "ForgotUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email address (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>User official phone # (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>Login Successful.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "Login User",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>User Id (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email address (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "officePhone",
            "description": "<p>User official phone number (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp",
            "description": "<p>User One-Time-Password sent to phone (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Login type &quot;EMAIL&quot;, &quot;PHONE&quot;, &quot;OTP&quot; (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>Login Successful.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/api/user/{recordId}",
    "title": "Patch User",
    "name": "PatchUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>required record ObjectId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user?id={recordId}",
    "title": "Retrieve User records",
    "name": "RetrieveUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage for retieving a single record:",
        "content": "curl -i api/user?",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter",
            "description": "<p>query condition (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Number of records to offset by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Maximum Number of records to retrieve (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>how records would be arranged in alphabet (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projection",
            "description": "<p>list of record's attributes to retrieve (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>Records of User distributed across terminals.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Array",
            "description": "<p>of Objects of records.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/photo/{recordId}",
    "title": "updatePhoto User",
    "name": "UpdatePhoto",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>User Id (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>User official phone # (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>Login Successful.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/user/{recordId}",
    "title": "Update a User record",
    "name": "UpdateUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "serial",
            "description": "<p>User serial (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "category",
            "description": "<p>User Category (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>User title (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>User surname (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otherName",
            "description": "<p>User other name (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>User gender (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>User birth date (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "maritalStatus",
            "description": "<p>User marital status (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "children",
            "description": "<p>User Number of children (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>User office phone (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneHome",
            "description": "<p>User phone personal (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailPersonal",
            "description": "<p>User personal email Address (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User address (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "village",
            "description": "<p>User village (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "state",
            "description": "<p>User state (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "county",
            "description": "<p>User county (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>User country (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp",
            "description": "<p>User otp (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "otpCount",
            "description": "<p>User otp count (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "otpAccess",
            "description": "<p>User OTP Access Status</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "kin",
            "description": "<p>User kin (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "kinPhone",
            "description": "<p>User kin phone (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "kinAddress",
            "description": "<p>User kin address (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor1",
            "description": "<p>User guarantor1 (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor1Phone",
            "description": "<p>User guarantor1 phone (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor1Address",
            "description": "<p>User guarantor1 address (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor2",
            "description": "<p>User guarantor2 (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor2Phone",
            "description": "<p>User guarantor2 phone (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guarantor2Address",
            "description": "<p>User guarantor2 address (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profession",
            "description": "<p>User profession (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "qualification",
            "description": "<p>User qualification (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "institution",
            "description": "<p>User institution (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employment",
            "description": "<p>User employment status (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tin",
            "description": "<p>User tin Tax Identification Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "annualIncome",
            "description": "<p>User annualIncome is Gross Annual  Income</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "basicSalary",
            "description": "<p>User basicSalary is basic net monthly salary</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bonus",
            "description": "<p>User bonus non-recurrent monthly bonus added to salary</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "entertainmentAllowance",
            "description": "<p>User entertainment allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "houseAllowance",
            "description": "<p>User house allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lunchAllowance",
            "description": "<p>User lunch allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "medicalAllowance",
            "description": "<p>User medical allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "transportAllowance",
            "description": "<p>User transport allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "utilityAllowance",
            "description": "<p>User utility allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "welfareAllowance",
            "description": "<p>User welfare allowance (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pension",
            "description": "<p>User pension To encourage pension contribution the Government allows employees to contribute more than 8% of your basic, housing, and transport as a pension contribution. By doing so, you get more tax reliefs, thus lower taxable income.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "assurance",
            "description": "<p>User Life Assurance premiums are those premiums you pay towards insuring an immediate family member in the event that you die. There is no limit to how much you can contribute and how much relief you can get from it.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "bank",
            "description": "<p>User bank (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bankAccountNumber",
            "description": "<p>User bank account number (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bankAccountName",
            "description": "<p>User bank account name (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rank",
            "description": "<p>User rank (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "office",
            "description": "<p>User office</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "role",
            "description": "<p>User role is an array of permissions the office demands</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "superior",
            "description": "<p>User superior id (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subsidiary",
            "description": "<p>User subsidiary (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "terminal",
            "description": "<p>User terminal (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "currentVehicle",
            "description": "<p>User currentVehicle (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "assignments",
            "description": "<p>array of Objects of Asset Assigmnet History managed my Asset Manager (prohibited)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAssignedVehicle",
            "description": "<p>User is assigned a vehicle</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notice",
            "description": "<p>User notice (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ratings",
            "description": "<p>User ratings (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "notifications",
            "description": "<p>User notifications</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>User remark (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>User photo (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isSalaryPayable",
            "description": "<p>User is salary payable (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isDocumentComplete",
            "description": "<p>User is document complete (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessLevel",
            "description": "<p>User access level 0 - 9 Max. Zero implies No access (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "approvedBy",
            "description": "<p>User approved by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "approvedDate",
            "description": "<p>User approved date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "employedDate",
            "description": "<p>User employed date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "employedBy",
            "description": "<p>User employed by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "parttimedDate",
            "description": "<p>User parttimed date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "parttimedBy",
            "description": "<p>User parttimed by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "fulltimedDate",
            "description": "<p>User fulltimed date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "fulltimedBy",
            "description": "<p>User fulltimed by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "leaveDate",
            "description": "<p>User leave date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "leaveBy",
            "description": "<p>User leave by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "probatedDate",
            "description": "<p>User probated date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "probatedBy",
            "description": "<p>User probated by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "suspendedDate",
            "description": "<p>User suspended date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "suspendedBy",
            "description": "<p>User suspended by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "retiredDate",
            "description": "<p>User retired date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "retiredBy",
            "description": "<p>User retired by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "disengagedBy",
            "description": "<p>User disengaged by (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "disengagedDate",
            "description": "<p>User disengaged date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employmentRemark",
            "description": "<p>User employment Remark (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "approvalRemark",
            "description": "<p>User approval Remark (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>User employment approval status (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "rejectedDate",
            "description": "<p>User employment rejected date (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "rejectedBy",
            "description": "<p>User employment rejected By (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "lastLogin",
            "description": "<p>User lastLogin (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "currentLogin",
            "description": "<p>User currentLogin (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastIp",
            "description": "<p>User lastIp (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currentIp",
            "description": "<p>User currentIp (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "createdBy",
            "description": "<p>User record created by</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>User record modified by</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>User's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/user/approval/{recordId}",
    "title": "Update User approval status",
    "name": "UpdateUserApproval",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>User record id (primaryKey)</p>"
          },
          {
            "group": "Parameter",
            "type": "Enum",
            "optional": false,
            "field": "status",
            "description": "<p>User PENDING, APPROVED, REJECTED</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>record's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/user/approval/{recordId}",
    "title": "Update User approval status",
    "name": "UpdateUserApproval",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recordId",
            "description": "<p>User record id (primaryKey)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "verificationVideo",
            "description": "<p>Verification Video Media ObjectID [Video should have been uplaoded via 'api/media/video' route]</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "verificationDate",
            "description": "<p>Verification Date</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>record's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>master access only.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/routes.js",
    "groupTitle": "User"
  }
] });
