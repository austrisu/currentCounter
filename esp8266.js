
    function init(){
        var wifi = require("Wifi");
        var http = require("http");
    
    
        wifi.connect("ALHN-096D", {password:"7381491319"}, function(err){
          console.log("connected? err=", err, "info=", wifi.getIP());
        });
        wifi.stopAP();
    
    
        //NodeMCU.xx is converter to espruino pins 
        I2C1.setup({ 'scl': NodeMCU.D2, // pin D4 (in espruino firmware, diferent phizical pin)
                     'sda': NodeMCU.D1, // pin D5 (in espruino firmware, diferent phizical pin)
                     bitrate: 100000 }); // set bitrate just in case arduino is talking in diferent bitrate
    
        //function tu sort and arrange data in normal order
        function sort(data){
          //position cursor, points to position in data array
    
          var position = 0;
          //creates empty array, later strings will be appended
          var string_arr = [];
          //first while loop exits when pointer reads 255
          while(data[position] != 255){
    
            //creats epty string important to have "" not just epmty!!!
             var string = "";
            //second while loop stops when pointer reaches 44 -> in ascii ","
             while(data[position] != 44){
    
              //inserts last digit first, function converts decimal to string
              string = String.fromCharCode(data[position]) + string;
              //increments pointer
              position++;
             }
    
            //incremets pointer to position after the "," (44)
            position++;
            //pushes newly created string in to the array
            string_arr.push(string);
          }
    
          return string_arr;
        }
    
        //sends data to server by get request
        function sendToServer(sensor){
        //makes request and sends data implemented in http url
          http.get("https://web-dev-bootcamp-austrisu.c9users.io/send?temp0="+ sensor[0] +"&temp1=" + sensor[1], function(res){
            res.on('data', function(serverData) {
            console.log(serverData);
            });
          });
        }
    
    
        function read(){
          //witers data recieved fro arduino
          //I2C1.readFrom(<ID of device>, <number of bytes to recieve>);
          //ID of deveice is set in Arduino firmware
          //ID in official docs is represented in hex 0x but works as decimal, need to be identical
          var rawData = I2C1.readFrom(8, 20);
          
          //sorts data and saves to var
          var sortedData = sort(rawData);
    
    
          //console logs data
          //sort function returns sorted string array with numbers in right order
          console.log("Recieved ... " + rawData);
          console.log("Reversing and sorting ... ");
          console.log("Recieved sorted ... " + sortedData);
          
          sendToServer(sortedData);
        }
    
    
        //function calls anonymos function each second
        setInterval(function(){
            console.log("Reading...");
            read();
          }, 10000);
    }
    //this code is initialized on nodemcy startup
    E.on('init', function() { init();});
    //save code from the top to nodeMCU
    save();


    function average(...items) {
        let sum = 0;
        
        if(items.length === 0){
            return 0;
        }
        
        for(const num of items){
            sum += num;
        }
        return sum/items.length;
    }
