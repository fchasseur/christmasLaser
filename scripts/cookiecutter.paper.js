


var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 1
};

var pathMeta = {
    laserType: {name: 'Type', group: '', type: 'options', options: [ {text:'Applat', value: 'applat'} , {text:'Decoupe', value: 'cut'},{text:'Gravure', value: 'engraving'}] },
    strokeWidth: {name: "Epaisseur", group:'', type: 'options', options:  [{ text:"1", value: '5'},{ text:"2", value: '7'},{ text:"3", value: '10'},{ text:"4", value: '15'}] }
};

commonPathUpdate = function (val)
 {
 	var p = this;
	p.laserType =val.laserType;
	p.strokeWidth = val.strokeWidth;
	switch (p.laserType)
	{
		case "cut":
			p.strokeColor = 'red';
			p.fillColor = 'white';
			p.strokeWidth = 5;
		break;

		case "applat":
			p.strokeColor = 'black';
			p.fillColor = "black";
		break
		case "engraving":
			p.strokeColor = 'black';
			p.fillColor = "white";
		break;

	} 
	p.toolValues = val;
 }



var path;
//------------------------------------------------------------------------------
var penTool = new Tool();

penTool.meta = pathMeta ; 
penTool.toolValues =  {
	laserType:"applat",
	strokeWidth:1
}

penTool.updateObj = commonPathUpdate ; 
penTool.onMouseDown = function (event) {
	path = new Path();
	path.meta = penTool.meta;
	path.toolValues =penTool.toolValues;

	path.updateObj = penTool.updateObj;
	var val = $('#propGrid').jqPropertyGrid('get'); 
	path.updateObj(val);

	path.add(event.point);
};

penTool.onMouseDrag = function(event) {
	path.add(event.point);
}
penTool.onMouseUp = function (event)
{
	path.simplify(10);
	selectTool.activate();
	window.toolHasChanged(selectTool.meta, selectTool.toolValues)
}



//------------------------------------------------------------------------------



var circleTool = new Tool();
circleTool.meta = pathMeta ; 
circleTool.toolValues =  
{	laserType:"cut",
	strokeWidth:1
}


circleTool.updateObj = commonPathUpdate ; 
circleTool.onMouseDown = function (event) {

	circleTool.centerPoint = event.point;
	//path.add(event.point);
};

circleTool.onMouseDrag = function(event) {
	//path.add(event.point);
	path = new Path.Circle({
		center: circleTool.centerPoint,
		radius: (circleTool.centerPoint - event.point).length,
		fillColor:"black"
	}).removeOnDrag().removeOnUp();
	path.meta = circleTool.meta;
	path.toolValues =circleTool.toolValues;
	path.updateObj = circleTool.updateObj;


	var val = $('#propGrid').jqPropertyGrid('get'); 
	path.updateObj(val);
}
circleTool.onMouseUp = function (event)
{

	path = new Path.Circle({
		center: circleTool.centerPoint,
		radius: event.delta.length ,
		fillColor:"black"
	});
	path.meta = circleTool.meta;
	path.toolValues =circleTool.toolValues;
	path.updateObj = circleTool.updateObj;


	var val = $('#propGrid').jqPropertyGrid('get'); 
	path.updateObj(val);
	//selectTool.activate();
	//window.toolHasChanged(selectTool.meta, selectTool.toolValues)
}



//------------------------------------------------------------------------------


var starTool = new Tool();
starTool.meta = pathMeta ;
starTool.meta.points = {name: "Branches", group:'', type: 'options', options:  [{ text:"5", value: '5'},{ text:"6", value: '6'},{ text:"7", value: '7'},{ text:"9", value: '9'} ] };
starTool.toolValues =  {
	laserType:"cut",
	strokeWidth:1,
	points:5,
}


starTool.updateObj = commonPathUpdate ; 
starTool.onMouseDown = function (event) {

	starTool.centerPoint = event.point;
	//path.add(event.point);
};

starTool.onMouseDrag = function(event) {
	//path.add(event.point);
	var val = $('#propGrid').jqPropertyGrid('get'); 
	console.log(val)
	path = new Path.Star({
		center: starTool.centerPoint,
		radius1: (starTool.centerPoint - event.point).length,
		radius2: (starTool.centerPoint - event.point).length *0.5,
		points : val.points,
		fillColor:"black"
	}).removeOnDrag().removeOnUp();
	path.meta = starTool.meta;
	path.toolValues =starTool.toolValues;
	path.updateObj = starTool.updateObj;


	var val = $('#propGrid').jqPropertyGrid('get'); 
	path.updateObj(val);
}
starTool.onMouseUp = function (event)
{
	var val = $('#propGrid').jqPropertyGrid('get'); 
	

	path = new Path.Star({
		center: starTool.centerPoint,
		points : val.points,
		radius1: event.delta.length ,
			radius2:  event.delta.length*0.5,
		fillColor:"black"
	});
	path.meta = starTool.meta;
	path.toolValues =starTool.toolValues;
	path.updateObj = starTool.updateObj;


	var val = $('#propGrid').jqPropertyGrid('get'); 
	path.updateObj(val);
	//selectTool.activate();
	//window.toolHasChanged(selectTool.meta, selectTool.toolValues)
}



//-----------------------------------------------------

var snowFlakeTool = new Tool();
snowFlakeTool.meta = pathMeta ;
snowFlakeTool.meta.points = {name: "Branches", group:'', type: 'options', options:  [{ text:"5", value: '5'},{ text:"6", value: '6'},{ text:"7", value: '7'},{ text:"9", value: '9'} ] };
snowFlakeTool.toolValues =  {
	laserType:"cut",
	strokeWidth:1,
}


snowFlakeTool.updateObj = commonPathUpdate ; 
snowFlakeTool.onMouseDown = function (event) {

	snowFlakeTool.centerPoint = event.point;
	//path.add(event.point);
};
snowFlakeTool.flakePoints = [[558.8,196.9],[545.8,188.9],[535.8,205.4],[528.3,188.9],
						[516.3,197.1],[527.3,219.9],[511.8,246.9],[495.8,217.9],
						[507.8,196.4],[495.8,188.9],[488.3,205.4],[478.3,188.9],
						[465.3,196.9],[474.3,212.4],[457.3,211.9],[457.3,225.9],
						[481.3,226.4],[498.8,254.4],[466.8,254.4],[451.8,233.4],
						[441.8,241.4],[451.3,254.4],[432.8,254.4],[432.8,269.9],
						[450.3,269.9],[441.8,283.4],[451.3,291.9],[467.3,269.9],
						[498.3,269.9],[482.3,297.9],[457.3,300.9],[456.8,312.9],
						[473.8,312.9],[465.8,327.4],[478.3,335.9],[488.3,320.4],
						[495.8,335.9],[507.3,329.4],[495.8,305.9],[511.3,277.9],
						[527.8,305.4],[516.8,328.9],[528.3,335.9],[536.3,319.4],
						[544.8,335.9],[558.8,327.4],[549.3,311.9],[568.8,312.4],
						[568.8,300.4],[541.8,298.4],[525.8,269.9],[556.3,269.4],
						[571.8,291.9],[582.8,284.4],[572.8,269.9],[592.3,269.9],
						[592.3,254.9],[571.8,255.9],[582.3,239.4],[571.8,232.4],
						[557.3,254.9],[524.8,255.4],[540.8,227.4],[568.8,225.4],
						[566.3,212.4],[549.8,213.9]	]

snowFlakeTool.onMouseDrag = function(event) {
	//path.add(event.point);
	var val = $('#propGrid').jqPropertyGrid('get'); 
	path = new Path(snowFlakeTool.flakePoints
				).removeOnDrag().removeOnUp();
	//path.fitBounds(snowFlakeTool.centerPoint,  [event.delta,event.delta ]  )
	path.meta = snowFlakeTool.meta;
	path.closed = true;
	path.position = snowFlakeTool.centerPoint;
	path.scale( 2*(snowFlakeTool.centerPoint - event.point).length / path.bounds.width );
	path.fillColor = "black"
	path.toolValues =snowFlakeTool.toolValues;
	path.updateObj = snowFlakeTool.updateObj;

	console.log(path)

	var val = $('#propGrid').jqPropertyGrid('get'); 
	path.updateObj(val);
}
snowFlakeTool.onMouseUp = function (event)
{
	var val = $('#propGrid').jqPropertyGrid('get'); 
	

	path = new Path(snowFlakeTool.flakePoints)
	//path.fitBounds(snowFlakeTool.centerPoint,  [event.delta,event.delta ]  )
	path.meta = snowFlakeTool.meta;
	path.closed = true;
	path.position = snowFlakeTool.centerPoint;
	path.scale( 2*(snowFlakeTool.centerPoint - event.point).length / path.bounds.width );
	path.fillColor = "black"


	path.meta = snowFlakeTool.meta;
	path.toolValues =snowFlakeTool.toolValues;
	path.updateObj = snowFlakeTool.updateObj;


	var val = $('#propGrid').jqPropertyGrid('get'); 
	path.updateObj(val);
	//selectTool.activate();
	//window.toolHasChanged(selectTool.meta, selectTool.toolValues)
}






//---------------------------------------------------


var selectTool = new Tool();
selectTool.meta = {
};

selectTool.toolValues =  {
}

selectTool.updateObj = function (val){
	selectTool.selectedItem.updateObj(val)
}
selectTool.onKeyUp = function(event){
	if(event.key == 'delete')
	{
		if(selectTool.selectedItem)
		{
			selectTool.selectedItem.remove();
			selectTool.selectedItem = null;
		}
	}
}
selectTool.onKeyDown = function(event){
	if(event.key == 'left')
	{
		if(selectTool.selectedItem)
		{
			selectTool.selectedItem.rotate(-1);
		}
	}
	if(event.key == 'right')
	{
		if(selectTool.selectedItem)
		{
			selectTool.selectedItem.rotate(1);
		}
	}
}
selectTool.onMouseDown = function (event)
{
	project.activeLayer.selected = false;
	selectTool.selectedItem = event.item;
	if(event.item)
	{
		event.item.selected = true ;
		if(event.modifiers.shift)
		{
			selectTool.selectedItem.sendToBack();
		}
		window.toolHasChanged(selectTool.selectedItem.meta, selectTool.selectedItem.toolValues);

		segment  = null;
		var hitResult = selectTool.selectedItem.hitTest(event.point, hitOptions);
        if (hitResult) {
            if (event.modifiers.shift) {
                if (hitResult.type == 'segment') {
                    hitResult.segment.remove();
                };
                return;
            }
            if (hitResult.type == 'segment') {
                segment = hitResult.segment;
            } else if (hitResult.type == 'stroke') {
                var location = hitResult.location;
                segment = selectTool.selectedItem.insert(location.index + 1, event.point);
            }
        }
	}
	else
	{
		window.toolHasChanged({}, {});

	}
}
selectTool.onMouseDrag = function(event) {
	
	if(selectTool.selectedItem)
	{
		if(event.modifiers.control)
		{
			selectTool.selectedItem.scale( 1 + (event.delta.x/100));
		}
		else
		{
			if(segment)
			{
				segment.point += event.delta;
			}
			else
			{
				selectTool.selectedItem.position += event.delta;
			}				
		}	
	}
}
selectTool.onMouseUp = function(event){ }
selectTool.onMouseMove = function(event){ }






//----------------------------------------------


var polyLineTool = new Tool();

polyLineTool.c = new Path.Circle({
				center: [-10,-10],
				radius: 10,
				fillColor:"red",
				visible : false
			});


polyLineTool.line = new Path.Line( {
	strokeWidth:1,
	strokeColor:'black',
	visible : false,
	from: [0,0],
	to : [1,1]
});

polyLineTool.meta = pathMeta ; 
polyLineTool.toolValues =  {
	laserType:"cut",
	strokeWidth:1

}

polyLineTool.updateObj = commonPathUpdate;
polyLineTool.onKeyUp = function(event){ }

polyLineTool.stopPath = function(){
				console.log(polyLineTool.myPath);
				polyLineTool.myPath.updateObj(polyLineTool.myPath.toolValues) 
				polyLineTool.myPath.closed = true;
				polyLineTool.c.visible = polyLineTool.line.visible = false;

				// Change tool!
				selectTool.activate();
				window.toolHasChanged(selectTool.meta, selectTool.toolValues)

}

polyLineTool.myPath = null;
polyLineTool.onMouseDown = function (event)
{		
		polyLineTool.minDistance = 20;

		if( polyLineTool.c.visible)
		{
			console.log("hey");
			if( (event.point - polyLineTool.c.position).length < 10)
			{
					polyLineTool.stopPath();
			}
			else
			{
				polyLineTool.myPath.add(event.point);
				polyLineTool.line.strokeColor = polyLineTool.myPath.strokeColor;

			}
		}
		else
		{	
			polyLineTool.c.visible = polyLineTool.line.visible =  true;

			polyLineTool.c.position = event.point;

			polyLineTool.line.firstSegment.point = event.point;
			polyLineTool.line.lastSegment.point = event.point;

			var val = $('#propGrid').jqPropertyGrid('get'); 
			polyLineTool.myPath = new Path();
			polyLineTool.myPath.add(event.point);			
			polyLineTool.myPath.meta = polyLineTool.meta;
			polyLineTool.myPath.toolValues =polyLineTool.toolValues;
			polyLineTool.myPath.updateObj  = polyLineTool.updateObj;
			polyLineTool.myPath.updateObj(polyLineTool.myPath.toolValues) 
			polyLineTool.myPath.fillColor = null;
			polyLineTool.c.bringToFront();
		}

}
polyLineTool.smoothingIndex = -1;
polyLineTool.onMouseDrag = function(event) {
	
	if( polyLineTool.myPath)
	{
		if(polyLineTool.smoothingIndex == -1)
		 {
		 	polyLineTool.smoothingIndex = polyLineTool.myPath.segments.length;
		 }
		
		if( (event.point - polyLineTool.c.position).length < 21)
		{
			polyLineTool.stopPath();
		}
		else
		{
			polyLineTool.myPath.add(event.point);
		}

	}
	
}
polyLineTool.onMouseUp = function(event){ 
	polyLineTool.minDistance = 1;
	if(polyLineTool.smoothingIndex != -1)
	{
		console.log( { from: polyLineTool.smoothingIndex , 
									 to: polyLineTool.myPath.segments.length-1 });
		polyLineTool.myPath.smooth({from: polyLineTool.smoothingIndex , 
									 to: polyLineTool.myPath.segments.length-1 });
		polyLineTool.smoothingIndex = -1;
	}
}
polyLineTool.onMouseMove = function(event){
	if(polyLineTool.c.visible)
	{

		polyLineTool.line.firstSegment.point = polyLineTool.myPath.lastSegment.point ;
		polyLineTool.line.lastSegment.point = event.point;
	}
}



//------------------------------












// Activate first tool


snowFlakeTool.activate();
window.toolHasChanged(starTool.meta, snowFlakeTool.toolValues)









paper.settings.handleSize = 15;
/// Change tool
paper.changeTool = function(t){

	switch(t)
	{
		case "pen":
		penTool.activate();
		break;

		case "circle":
		circleTool.activate();
		break;

		case "select":
			selectTool.activate();
		break;


	}
}