	var readline = require('readline');
	var fs = require('fs');
	var stream = require('stream');
	var jsonArray = [];                               //creating a new Array
	var count_of_true = [];                                   //creating a  Array for the count of arrest is true
	var count_of_false = [];
	var i = 0;
	var j = 0;
	for(i = 2001;i <= 2016;i++)                                         //Array
	{
	  count_of_true[i] = 0;   
	  count_of_false[i] = 0;
	}
	rl=readline.createInterface(
	{                              //creating a interface to read a file
	  input:fs.createReadStream('crimedw.csv')    
	});

	var outstream = fs.createWriteStream('barchart_arrest.json');             //outputfile to write a file
	rl.on('line',function(line)
	{
	var finalLine=line.split(",");
	for(i=2001;i<=2016;i++)
	{
	    if(" "+finalLine[17]==" "+i && finalLine[5]=="ASSAULT")
		{
		if(finalLine[8]=="true")
		{
			count_of_true[i]++;
		}
		if(finalLine[8]=="false")
		{
			count_of_false[i]++;
		}
	    }
	}
	});

	rl.on('close',function()
	{
	for(var k=2001;k<=2016;k++)
	{
	  tempObj={};                          //creating a JSON Object
	  tempObj["year"]=k;
	  tempObj["count_of_True"]=ctrue[k];
	  tempObj["count_of_False"]=cfalse[k];
	  jsonArray.push(tempObj);
	}
	console.log(jsonArray);
	outstream.write(JSON.stringify(jsonArray));
	});


