var connection  =  new require('./kafka/Connection');

var getjobpost  = require('./services/getjobpost.js');
var jobpost     = require('./services/jobpost.js');
var GetProfile  = require('./services/getprofile.js');
var createUser  = require('./services/createuser');
var GetMinGraph = require('./services/getmingraph.js');
var loginUser   = require('./services/loginuser');
var getjobs   = require('./services/getjobs');

function handleTopicRequest(topic_name,fname){  
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
  
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
    
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
        
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log("Data: ",data);
            });
            return; 
        });  
    });
}

console.log("Kafka Backend");
handleTopicRequest("jobpost",jobpost);
handleTopicRequest("getjobpost",getjobpost);
handleTopicRequest("getprofile",GetProfile);
handleTopicRequest("createuser", createUser);
handleTopicRequest("getmingraph",GetMinGraph);
handleTopicRequest("loginuser",loginUser);
handleTopicRequest("getjobs",getjobs);
 