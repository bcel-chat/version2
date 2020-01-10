<?php
try { 
    //require_once("lib/nusoap.php");//nusoap
    //require_once("test/test1.php");//nusoap
    
    $client = new SoapClient("http://10.0.2.125:5566/SMSService.asmx?wsdl",
       array(
         "trace"      => 0,		// enable trace to view what is happening
         "exceptions" => 0,		// disable exceptions
         "cache_wsdl" => 0) 		// disable any caching on the wsdl, encase you alter the wsdl server
    );
    
     // get a response from the WSDL zend server function getQuote for the day monday
     //print_r( $client->Add(array("a" => "5", "b" =>"2")));
    $strReq='';
    $params = array(
                   'UserID' => 'kongxiong',
                   'strPwd' => 'qwerty',
                   'strPhone' => '8562022215828',
                   'strContent' => 'KONG TEST ALERT',
                   'Header' => 'alert',
                   //doHellow
                   'Sender' => 'alert',

   );
   $data=$client->SendSMS($params);
   //echo $client->call('HelloWorld', $param); 
    //$data = $client->HelloWorld();

   print_r($data);

   echo "<hr>";

       //   echo $data->HelloWorldResult;
   echo $data->SendSMSResult;
          //echo "<hr>";

    
     // display what was sent to the server (the request)
     //echo "<p>Request :".htmlspecialchars($client->__getLastRequest()) ."</p>";
     // display the response from the server
     //echo "<p>Response:".htmlspecialchars($client->__getLastResponse())."</p>";
} catch(Exception $e) { 
   var_dump($e); 
} 

?>