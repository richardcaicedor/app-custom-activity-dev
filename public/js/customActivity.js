define(["postmonger"], function (Postmonger) {
  "use strict";
  var connection = new Postmonger.Session();
  var payload = {};
  var personalizations = [];
  var personalizationsUrl = [];
  var inArgument = {};
  var eventDefinitionKey = "";
  var example = {};
  var dataExtensionId = "";
  var hasInArguments = false;
  var steps = [{ label: "Configure Message", key: "step1" }];

  $(window).ready(onRender);
  connection.on("initActivity", initialize);
  connection.on("clickedNext", onClickedNext);

  connection.on(
    "requestedTriggerEventDefinition",
    function (eventDefinitionModel) {
      eventDefinitionKey = eventDefinitionModel.eventDefinitionKey;
      example = eventDefinitionModel;
    }
  );
  connection.on("requestedInteraction", function (payload) {
    for(var activity of payload.activities){
      console.log("requestInteraction => ", activity.key);
    }
    
  });

  function onGetEndpoints(endpoints) {
    console.log("____________________________");
    console.log("onGetEndpoints Called");
  }

  function onGetTokens(tokens) {
    console.log("____________________________");
    console.log("onGetTokens Called");
  }

  function onRender() {
    console.log("____________________________");
    console.log("onRender Called");
    connection.trigger("requestTriggerEventDefinition");
    connection.trigger("ready");
    connection.trigger("requestInteraction");
  }

  


  function initialize(data) {
    console.log("____________________________");
    console.log("hola mundo => " + eventDefinitionKey);
    console.log("hola mundo2 => " + JSON.stringify(example));
    dataExtensionId = example.dataExtensionId;
    console.log("hola mundo2  dataExtensionId => " + dataExtensionId);
    console.log("hola mundo2  data => " + JSON.stringify(data));
    console.log("____________________________");
    if (data) {
      payload = data;
    }

    console.log('payload: ', JSON.stringify(payload));
   
    hasInArguments = Boolean(
      payload["arguments"] &&
        payload["arguments"].execute &&
        payload["arguments"].execute.inArguments &&
        payload["arguments"].execute.inArguments.length > 0
    );

    console.log("=> hasInArguments => ", JSON.stringify(hasInArguments));
    var inArguments = hasInArguments
      ? payload["arguments"].execute.inArguments
      : {};
    // Load attribute sets
    if (inArguments.length > 0) {
      console.log("=> inArguments => ", JSON.stringify(inArguments));
      inArgument = inArguments[inArguments.length - 1];
      console.log("=> inArgument => ", JSON.stringify(inArgument));
      
      /***
       * configurar datos para UI
       */
      console.log("inArguments.phoneNumber", inArgument.phoneNumber);
      document.getElementById("phoneNumber").value = inArgument.phoneNumber;
      document.getElementById("message").value = inArgument.message;
      document.getElementById("eventId").value = inArgument.eventId;
    }
    connection.trigger("updateButton", {
      button: "next",
      text: "done",
      visible: true,
    });
  }
  // Navigation functions
  function onClickedNext() {
    console.log("onClickedNext Called");
    if (ValidateStep1()) save();
    else connection.trigger("ready");
  }
  // Validates step 1 required fields
  function ValidateStep1() {
    var step1Valid = true;
    return step1Valid;
  }
  // Save function
  function save() {
    var inArgs = [];
    var arg = {};
    var tempPhoneNumber = document.getElementById("phoneNumber").value;
    var tempMessage = document.getElementById("message").value;
    var tempEventId = document.getElementById("eventId").value;

    arg.phoneNumber = tempPhoneNumber; 
    arg.message = tempMessage; 
    arg.eventId = tempEventId; 
    inArgs.push(arg);
    payload["arguments"].execute.inArguments = inArgs;
    payload["metaData"].isConfigured = true;
    console.log("PAYLOAD FINAL", JSON.stringify(payload));
    connection.trigger("updateActivity", payload);
  }
});
