	var readline = require('readline');
	var fs = require('fs');
	var stream = require('stream');
	var jsonArray = [];                              //creating a JSON Array
	var above = [];          	                         //creating a  Array for the count of arrest is true
	var below = [];
	var i = 0, j = 0;
	for(i = 2001; i <= 2016; i++)
		{
			above[i] = 0;   
			below[i] = 0;
		}
	rl = readline.createInterface(
		{                                                          //creating a interface to read a file
			input:fs.createReadStream('crimedw.csv')    
		});
	var outstream = fs.createWriteStream('barchart_theftcase.json');             //outputfile to write a file
	rl.on('line',function(line)
		{

	    var finalLine=line.split(",");

	    for(i = 2001;i <= 2016;i++)
			{
				if(" "+finalLine[17] == " "+i && finalLine[5] == "THEFT")
		  
				{
					if(finalLine[6] == "OVER $500")
						{
							above[i]++;
						}
					if(finalLine[6] == "$500 AND UNDER")
						{
							below[i]++;
		  
						}
				}
			}
		});
	rl.on('close',function()
		{

			for(var k = 2001;k <=2016;k++)
			{
				tempObj = {};                          //creating a JSON Object as tempobj
				tempObj["year"] = k;
				tempObj["Over$500"] = above[k];
				tempObj["under$500"] = below[k];
				jsonArray.push(tempObj);
			}
	console.log(jsonArray);
	outstream.write(JSON.stringify(jsonArray));
	});


