export default {
  "workflowApiVersion": "1.1",
  "metaData": {
    "icon": "images/icon.png",
    "category": "message"
  },
  "type": "Rest",
  "lang": {
    "en-US": {
      "name": "Custom Activity WOM",
      "description": "A custom Journey Builder activity using workflow API v1.1 format."
    }
  },
  "arguments": {
    "execute": {
      "inArguments": [],
      "outArguments": [],
      "verb": "POST",
      "body": "",
      "header": "",
      "format": "json",
      "useJwt": true,
      "timeout": 100000,
      "retryCount": 1,
      "retryDelay": 10000,
      "concurrentRequests" : 5,
      "url": "https://campaignmanager-dev.middlewom.co/rmwomcolombia/activity/execute"
    }
  },
  "configurationArguments": {
    "applicationExtensionKey": "c25e6739-ff7f-4a85-b0f4-08a96d49c862",
    "save": {
      "url": "https://campaignmanager-dev.middlewom.co/rmwomcolombia/activity/save/?user_key=8af062179c87257dd430ddef563b6a10",
      "verb": "POST",
      "useJwt": true
    },
    "publish": {
      "url": "https://campaignmanager-dev.middlewom.co/rmwomcolombia/activity/publish/?user_key=8af062179c87257dd430ddef563b6a10",
      "verb": "POST",
      "useJwt": true
    },
    "validate": {
      "url": "https://campaignmanager-dev.middlewom.co/rmwomcolombia/activity/validate/?user_key=8af062179c87257dd430ddef563b6a10",
      "verb": "POST",
      "useJwt": true
    },
    "stop": {
      "url": "https://campaignmanager-dev.middlewom.co/rmwomcolombia/activity/stop/?user_key=8af062179c87257dd430ddef563b6a10",
      "verb": "POST",
      "useJwt": true
    }
  },
  "outcomes": [
    {
      "arguments": {
        "branchResult": "sent"
      },
      "metaData": {
        "label": "Sent"
      }
    },
    {
      "arguments": {
        "branchResult": "notsent"
      },
      "metaData": {
        "label": "Not Sent"
      }
    }
  ],
  "userInterfaces": {
    "configModal": {
      "height": 680,
      "width": 800,
      "fullscreen": false
    }
  },
  "schema": {
    "arguments": {
      "execute": {
        "inArguments": [],
        "outArguments": [{
          "branchResult": {
            "dataType": "Text",
            "isNullable": false,
            "direction": "out"
          }
        },
        {
          "requestId": {
            "dataType": "Number",
            "isNullable": true,
            "direction": "out"
          }
        },
        {
          "status": {
            "dataType": "Text",
            "isNullable": true,
            "direction": "out"
          }
        },
        {
          "statusCode": {
            "dataType": "Number",
            "isNullable": true,
            "direction": "out"
          }
        },
        {
          "error": {
            "dataType": "Text",
            "isNullable": true,
            "direction": "out"
          }
        }]
      }
    }
  }
}