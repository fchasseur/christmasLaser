var hitOptions = {
    segments: true,
    stroke: true,
    tolerance: 10
};

var pathMeta = {
    info : { 
        name : " ", group : "Info", type:"label"},
    laserType: {
        name: 'Type',
        group: 'Outils',
        type: 'options',
        options: [{
            text: 'Applat',
            value: 'applat'
        }, {
            text: 'Decoupe',
            value: 'cut'
        }, {
            text: 'Gravure',
            value: 'engraving'
        }]
    },
    strokeWidth: {
        name: "Epaisseur",
        group: 'Outils',
        type: 'options',
        options: [{
            text: "1",
            value: '0.25'
        }, {
            text: "3",
            value: '3'
        }, {
            text: "7",
            value: '7'
        }, {
            text: "12",
            value: '12'
        }]
    },
    
};

commonPathUpdate = function(val,info) {
    var p = this;
    p.laserType = val.laserType;
    p.strokeWidth = val.strokeWidth;
    switch (p.laserType) {
        case "cut":
            p.strokeColor = 'red';
            p.fillColor = 'white';
            p.fillColor.alpha = 0.1;
            p.strokeWidth = 0.25;
            break;

        case "applat":
            p.strokeColor = 'black';
            p.fillColor = "black";
            p.fillColor.alpha = 0.9;

            break
        case "engraving":
            if(p.strokeWidth == 0.25)
                 p.strokeColor = '#00FF00';
            else
                p.strokeColor = "black";
            p.fillColor = "white";
            p.fillColor.alpha = 0.1;


            break;

    }
    p.toolValues = val;
    if( info)
        p.toolValues.info = info;
}



var path;


//------------------------------------------------------------------------------
var penTool = new Tool();

penTool.meta = JSON.parse(JSON.stringify(pathMeta));
penTool.meta.laserType.group = penTool.meta.strokeWidth.group = "Crayon"
penTool.toolValues = {
    laserType: "engraving",
    strokeWidth: 1,
    info : "Garder le bouton de la souris pour dessiner"
}

penTool.updateObj = commonPathUpdate;
penTool.onMouseDown = function(event) {
    path = new Path();
    path.meta = penTool.meta;
    path.toolValues = penTool.toolValues;

    path.updateObj = penTool.updateObj;
    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);

    path.add(event.point);
};

penTool.onMouseDrag = function(event) {
    path.add(event.point);
}
penTool.onMouseUp = function(event) {
    path.simplify(10);
    path = null;
    
    //$("#move").click();
}



penTool.onKeyDown = function(event){

     if( event.key == "escape")
        {
            if(path)
            {
                path.remove();
            }
            // Remove item
            $("#move").click();

        }
}


//------------------------------------------------------------------------------

var circleTool = new Tool();
circleTool.meta = JSON.parse(JSON.stringify(pathMeta));;
circleTool.meta.laserType.group = circleTool.meta.strokeWidth.group = "Cercle"
circleTool.toolValues = {
    laserType: "cut",
    strokeWidth: 1
}


circleTool.updateObj = commonPathUpdate;
circleTool.onMouseDown = function(event) {

    circleTool.centerPoint = event.point;
    //path.add(event.point);
};

circleTool.onMouseDrag = function(event) {
    //path.add(event.point);
    path = new Path.Circle({
        center: circleTool.centerPoint,
        radius: (circleTool.centerPoint - event.point).length,
        fillColor: "black"
    }).removeOnDrag().removeOnUp();
    path.meta = circleTool.meta;
    path.toolValues = circleTool.toolValues;
    path.updateObj = circleTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);
}
circleTool.onMouseUp = function(event) {

    path = new Path.Circle({
        center: circleTool.centerPoint,
        radius: event.delta.length,
        fillColor: "black"
    });
    path.flatten (2);
    path.meta = circleTool.meta;
    path.toolValues = circleTool.toolValues;
    path.updateObj = circleTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);
    //$("#move").click();
     path = null;

}



circleTool.onKeyDown = function(event){

     if( event.key == "escape")
        {
            if(path)
            {
                path.remove();
            }
            // Remove item
            $("#move").click();

        }
}



//------------------------------------------------------------------------------

var rectangleTool = new Tool();
rectangleTool.meta = JSON.parse(JSON.stringify(pathMeta));;
rectangleTool.meta.laserType.group = rectangleTool.meta.strokeWidth.group = "Rectangle"
rectangleTool.toolValues = {
    laserType: "cut",
    strokeWidth: 1
}


rectangleTool.updateObj = commonPathUpdate;
rectangleTool.onMouseDown = function(event) {

    rectangleTool.centerPoint = event.point;
    //path.add(event.point);
};

rectangleTool.onMouseDrag = function(event) {
    //path.add(event.point);
    path = new Path.Rectangle({
        from: rectangleTool.centerPoint,
        to: (event.point),
        fillColor: "black"
    }).removeOnDrag().removeOnUp();
    path.meta = rectangleTool.meta;
    path.toolValues = rectangleTool.toolValues;
    path.updateObj = rectangleTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);
}
rectangleTool.onMouseUp = function(event) {

    path = new Path.Rectangle({
        from: rectangleTool.centerPoint,
        to: (event.point),
        fillColor: "black"
    });
    path.meta = rectangleTool.meta;
    path.toolValues = rectangleTool.toolValues;
    path.updateObj = rectangleTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);

    //$("#move").click();
     path = null;

}


rectangleTool.onKeyDown = function(event){

     if( event.key == "escape")
        {
            if(path)
            {
                path.remove();
            }
            // Remove item
            $("#move").click();

        }
}


//------------------------------------------------------------------------------

var starTool = new Tool();
starTool.meta = JSON.parse(JSON.stringify(pathMeta));;
starTool.meta.laserType.group = starTool.meta.strokeWidth.group = "Etoile"

starTool.meta.points = {
    name: "Branches",
    group: 'Etoile',
    type: 'options',
    options: [{
        text: "5",
        value: '5'
    }, {
        text: "6",
        value: '6'
    }, {
        text: "7",
        value: '7'
    }, {
        text: "20",
        value: '20'
    }]
};
starTool.toolValues = {
    laserType: "cut",
    strokeWidth: 1,
    points: 5,
}


starTool.updateObj = commonPathUpdate;
starTool.onMouseDown = function(event) {

    starTool.centerPoint = event.point;
    //path.add(event.point);
};

starTool.onMouseDrag = function(event) {
    //path.add(event.point);
    var val = $('#propGrid').jqPropertyGrid('get');
    var factor = 0.5;
    if (val.points > 10) {
        factor = 0.8;
    }
    path = new Path.Star({
        center: starTool.centerPoint,
        radius1: (starTool.centerPoint - event.point).length,
        radius2: (starTool.centerPoint - event.point).length * factor,
        points: val.points,
        fillColor: "black"
    }).removeOnDrag().removeOnUp();
    path.meta = starTool.meta;
    path.toolValues =  starTool.toolValues;
    path.updateObj = starTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);
}
starTool.onMouseUp = function(event) {
    var val = $('#propGrid').jqPropertyGrid('get');
    var factor = 0.5;
    if (val.points > 10) {
        factor = 0.8;
    }
    path = new Path.Star({
        center: starTool.centerPoint,
        points: val.points,
        radius1: event.delta.length,
        radius2: event.delta.length * factor,
        fillColor: "black"
    });
    path.meta = JSON.parse(JSON.stringify(pathMeta));;
    path.meta.laserType.group = path.meta.strokeWidth.group = "Etoile"

    path.updateObj = starTool.updateObj;
    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);
    
    path.toolValues = {laserType:  starTool.toolValues.laserType, strokeWidth:starTool.toolValues.strokeWidth};

    //$("#move").click();
    //editTool.activate();
    //window.toolHasChanged(editTool.meta, editTool.toolValues)
     path = null;
}




starTool.onKeyDown = function(event){

     if( event.key == "escape")
        {
            if(path)
            {
                path.remove();
            }
            // Remove item
            $("#move").click();

        }
}





//-----------------------------------------------------

var snowFlakeTool = new Tool();
snowFlakeTool.meta = JSON.parse(JSON.stringify(pathMeta));;
snowFlakeTool.meta.laserType.group = snowFlakeTool.meta.strokeWidth.group = "Flocon"


snowFlakeTool.meta.points = {
    name: "Branches",
    group: '',
    type: 'options',
    options: [{
        text: "5",
        value: '5'
    }, {
        text: "6",
        value: '6'
    }, {
        text: "7",
        value: '7'
    }, {
        text: "9",
        value: '9'
    }]
};
snowFlakeTool.toolValues = {
    laserType: "cut",
    strokeWidth: 1,
}


snowFlakeTool.updateObj = commonPathUpdate;
snowFlakeTool.onMouseDown = function(event) {

    snowFlakeTool.centerPoint = event.point;
    //path.add(event.point);
};
snowFlakeTool.flakePoints = [
    [558.8, 196.9],
    [545.8, 188.9],
    [535.8, 205.4],
    [528.3, 188.9],
    [516.3, 197.1],
    [527.3, 219.9],
    [511.8, 246.9],
    [495.8, 217.9],
    [507.8, 196.4],
    [495.8, 188.9],
    [488.3, 205.4],
    [478.3, 188.9],
    [465.3, 196.9],
    [474.3, 212.4],
    [457.3, 211.9],
    [457.3, 225.9],
    [481.3, 226.4],
    [498.8, 254.4],
    [466.8, 254.4],
    [451.8, 233.4],
    [441.8, 241.4],
    [451.3, 254.4],
    [432.8, 254.4],
    [432.8, 269.9],
    [450.3, 269.9],
    [441.8, 283.4],
    [451.3, 291.9],
    [467.3, 269.9],
    [498.3, 269.9],
    [482.3, 297.9],
    [457.3, 300.9],
    [456.8, 312.9],
    [473.8, 312.9],
    [465.8, 327.4],
    [478.3, 335.9],
    [488.3, 320.4],
    [495.8, 335.9],
    [507.3, 329.4],
    [495.8, 305.9],
    [511.3, 277.9],
    [527.8, 305.4],
    [516.8, 328.9],
    [528.3, 335.9],
    [536.3, 319.4],
    [544.8, 335.9],
    [558.8, 327.4],
    [549.3, 311.9],
    [568.8, 312.4],
    [568.8, 300.4],
    [541.8, 298.4],
    [525.8, 269.9],
    [556.3, 269.4],
    [571.8, 291.9],
    [582.8, 284.4],
    [572.8, 269.9],
    [592.3, 269.9],
    [592.3, 254.9],
    [571.8, 255.9],
    [582.3, 239.4],
    [571.8, 232.4],
    [557.3, 254.9],
    [524.8, 255.4],
    [540.8, 227.4],
    [568.8, 225.4],
    [566.3, 212.4],
    [549.8, 213.9]
]

snowFlakeTool.onMouseDrag = function(event) {
    //path.add(event.point);
    var val = $('#propGrid').jqPropertyGrid('get');
    path = new Path(snowFlakeTool.flakePoints).removeOnDrag().removeOnUp();
    //path.fitBounds(snowFlakeTool.centerPoint,  [event.delta,event.delta ]  )
    path.meta = snowFlakeTool.meta;
    path.closed = true;
    path.position = snowFlakeTool.centerPoint;
    path.scale(2 * (snowFlakeTool.centerPoint - event.point).length / path.bounds.width);
    path.fillColor = "black"
    path.toolValues = snowFlakeTool.toolValues;
    path.updateObj = snowFlakeTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);
}
snowFlakeTool.onMouseUp = function(event) {
    var val = $('#propGrid').jqPropertyGrid('get');


    path = new Path(snowFlakeTool.flakePoints)
        //path.fitBounds(snowFlakeTool.centerPoint,  [event.delta,event.delta ]  )
    path.meta = snowFlakeTool.meta;
    path.closed = true;
    path.position = snowFlakeTool.centerPoint;
    path.scale(2 * (snowFlakeTool.centerPoint - event.point).length / path.bounds.width);
    path.fillColor = "black"


    path.meta = snowFlakeTool.meta;
    path.toolValues = snowFlakeTool.toolValues;
    path.updateObj = snowFlakeTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);
    //$("#move").click();
    //editTool.activate();
    //window.toolHasChanged(editTool.meta, editTool.toolValues)
     path = null;



}



snowFlakeTool.onKeyDown = function(event){

     if( event.key == "escape")
        {
            if(path)
            {
                path.remove();
            }
            // Remove item
            $("#move").click();

        }
}


//------------------------------


//-----------------------------------------------------

var treeTool = new Tool();
treeTool.meta = JSON.parse(JSON.stringify(pathMeta));;
treeTool.meta.laserType.group = treeTool.meta.strokeWidth.group = "Sapin"


treeTool.meta.points = {
    name: "Branches",
    group: '',
    type: 'options',
    options: [{
        text: "5",
        value: '5'
    }, {
        text: "6",
        value: '6'
    }, {
        text: "7",
        value: '7'
    }, {
        text: "9",
        value: '9'
    }]
};
treeTool.toolValues = {
    laserType: "cut",
    strokeWidth: 1,
}


treeTool.updateObj = commonPathUpdate;
treeTool.onMouseDown = function(event) {

    treeTool.centerPoint = event.point;
    //path.add(event.point);
};
treeTool.treePoints = "m 69.299878,45.25848 c -0.086,0.178 -8.508,17.396 -26.112,17.833 l -0.896,6.248 c -0.011,0.072 -0.031,0.15 -0.063,0.219 -0.057,0.122 -1.437,3.031 -4.866,3.031 l -11.857,0 c -3.432,0 -4.813,-2.909 -4.867,-3.031 -0.031,-0.068 -0.055,-0.146 -0.068,-0.219 l -0.893,-6.248 c -17.6059999,-0.438 -26.0279998,-17.655 -26.1119998,-17.833 -0.141,-0.291 -0.086,-0.646 0.138,-0.883 0.224,-0.236 0.576,-0.313 0.8729999,-0.189 2.016,0.82 4.008,1.236 5.92400002,1.236 6.26299998,0 10.45299988,-4.439 12.09399988,-6.547 -6.7239999,-1.044 -11.4709999,-9.008 -11.68199988,-9.367 -0.146,-0.244 -0.148,-0.547 -0.008,-0.791 0.14299998,-0.248 0.40599998,-0.398 0.68799998,-0.398 7.945,0 13.5849999,-3.787 16.0389999,-5.81 -8.8589999,-0.752 -10.5989999,-6.557 -10.6739999,-6.823 -0.068,-0.24 -0.018,-0.492 0.13,-0.693 0.151,-0.192 0.383,-0.313 0.63,-0.313 12.1899999,0 22.8909999,-23.0210001 22.9999999,-23.2520001 0.258,-0.562 1.177,-0.562 1.435,0 0.107,0.232 10.805,23.2520001 22.997,23.2520001 0.245,0 0.479,0.12 0.628,0.313 0.148,0.201 0.2,0.453 0.133,0.693 -0.073,0.266 -1.813,6.065 -10.667,6.82 2.456,2.025 8.109,5.813 16.031,5.813 0.284,0 0.547,0.15 0.688,0.398 0.141,0.244 0.136,0.547 -0.005,0.791 -0.214,0.359 -4.961,8.323 -11.683,9.367 1.636,2.107 5.828,6.547 12.094,6.547 1.914,0 3.906,-0.416 5.922,-1.236 0.3,-0.123 0.648,-0.047 0.875,0.189 0.217,0.237 0.272,0.592 0.134,0.883 z"

treeTool.onMouseDrag = function(event) {
    //path.add(event.point);
    var val = $('#propGrid').jqPropertyGrid('get');
    path = new Path(treeTool.treePoints).removeOnDrag().removeOnUp();
    //path.fitBounds(treeTool.centerPoint,  [event.delta,event.delta ]  )
    path.meta = treeTool.meta;
    path.closed = true;
    path.position = treeTool.centerPoint;
    path.scale(2 * (treeTool.centerPoint - event.point).length / path.bounds.width);
    path.fillColor = "black"
    path.toolValues = treeTool.toolValues;
    path.updateObj = treeTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);
}
treeTool.onMouseUp = function(event) {
    var val = $('#propGrid').jqPropertyGrid('get');


    path = new Path(treeTool.treePoints)
        //path.fitBounds(treeTool.centerPoint,  [event.delta,event.delta ]  )
    path.meta = treeTool.meta;
    path.closed = true;
    path.position = treeTool.centerPoint;
    path.scale(2 * (treeTool.centerPoint - event.point).length / path.bounds.width);
    path.fillColor = "black"
    path.flatten (2);


    path.meta = treeTool.meta;
    path.toolValues = treeTool.toolValues;
    path.updateObj = treeTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);
    path = null;
    //$("#move").click();

    //editTool.activate();
    //window.toolHasChanged(editTool.meta, editTool.toolValues)
}



treeTool.onKeyDown = function(event){

     if( event.key == "escape")
        {
            if(path)
            {
                path.remove();
            }
            // Remove item
            $("#move").click();

        }
}



//------------------------------------------------------------------------------

var ellipseTool = new Tool();
ellipseTool.meta = JSON.parse(JSON.stringify(pathMeta));;
ellipseTool.meta.laserType.group = ellipseTool.meta.strokeWidth.group = "Ellipse"
ellipseTool.toolValues = {
    laserType: "cut",
    strokeWidth: 1
}


ellipseTool.updateObj = commonPathUpdate;
ellipseTool.onMouseDown = function(event) {

    ellipseTool.centerPoint = event.point;
    //path.add(event.point);
};

ellipseTool.onMouseDrag = function(event) {
    //path.add(event.point);
    path = new Path.Ellipse({
        from: ellipseTool.centerPoint,
        to: (event.point),
        fillColor: "black"
    }).removeOnDrag().removeOnUp();
    path.meta = ellipseTool.meta;
    path.toolValues = ellipseTool.toolValues;
    path.updateObj = ellipseTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);
}
ellipseTool.onMouseUp = function(event) {

    path = new Path.Ellipse({
        from: ellipseTool.centerPoint,
        to: (event.point),
        fillColor: "black"
    });
    path.meta = ellipseTool.meta;
    path.toolValues = ellipseTool.toolValues;
    path.updateObj = ellipseTool.updateObj;


    var val = $('#propGrid').jqPropertyGrid('get');
    path.updateObj(val);

    //$("#move").click();
     path = null;

}


ellipseTool.onKeyDown = function(event){

     if( event.key == "escape")
        {
            if(path)
            {
                path.remove();
            }
            // Remove item
            $("#move").click();

        }
}





//---------------------------------------------------


var editTool = new Tool();
editTool.meta = JSON.parse(JSON.stringify(pathMeta));;
editTool.meta.laserType.group = editTool.meta.strokeWidth.group =  editTool.meta.info.group =  "Edition"
editTool.toolValues = {
    laserType: "cut",
    strokeWidth: 1,
    info  :"Click --> Sélection <br/>Click + Drag --> Déplacer un point <br/>   Shift+click --> Retirer un point <br/> [Delete] pour supprimer la forme",
}

editTool.updateObj = function(val) {
   editTool.selectedItem.updateObj(val, editTool.toolValues.info);

}
editTool.onKeyUp = function(event) {
    if (event.key == 'delete') {
        if (editTool.selectedItem) {
            editTool.selectedItem.remove();
            editTool.selectedItem = null;
        }
    }
     if( event.key == "escape")
        {
            if(polyLineTool.myPath)
            {
                polyLineTool.myPath.remove();
            }
             polyLineTool.c.visible = polyLineTool.line.visible = false;

            // Remove item
            $("#move").click();
        }
}
editTool.onKeyDown = function(event) {

}
editTool.onMouseDown = function(event) {
    paper.settings.handleSize = 10;
    project.activeLayer.selected = false;
    editTool.selectedItem = event.item;
    if (event.item) {
        event.item.selected = true;
        if (editTool.selectedItem.meta) {
            editTool.selectedItem.toolValues.info = editTool.toolValues.info
            editTool.selectedItem.meta.info.group = "Edition";
            window.toolHasChanged(editTool.selectedItem.meta, editTool.selectedItem.toolValues);
        } else {
            window.toolHasChanged({}, {})
        }

        segment = null;
        var hitResult = editTool.selectedItem.hitTest(event.point, hitOptions);
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
                segment = editTool.selectedItem.insert(location.index + 1, event.point);
            }
        }

    } else {
        window.toolHasChanged({}, {});

    }
}
editTool.onMouseDrag = function(event) {

    if (editTool.selectedItem) {
        if (event.modifiers.control) {
            editTool.selectedItem.scale(1 + (event.delta.x / 100));
        } else {
            if (segment) {
                segment.point += event.delta;
            } 
        }
    }
}
editTool.onMouseUp = function(event) {
	//editTool.selectedItem = null;
}
editTool.onMouseMove = function(event) {}

//--------------------------------------------




var moveTool = new Tool();
moveTool.meta = JSON.parse(JSON.stringify(pathMeta));;
moveTool.meta.laserType.group = moveTool.meta.strokeWidth.group= moveTool.meta.info.group = "Déplacement";
moveTool.toolValues = {
    info :"Click --> Sélection <br/> Shift + click --> Mettre en arrière plan <br/> Ctrl+click --> Changer la taille <br/> Les flèches   --> rotation"
}

moveTool.updateObj = function(val) {
    moveTool.selectedItem.updateObj(val,moveTool.toolValues.info)
}
moveTool.onKeyUp = function(event) {
    if (event.key == 'delete') {
        if (moveTool.selectedItem) {
            moveTool.selectedItem.remove();
            moveTool.selectedItem = null;
        }
    }
}
moveTool.onKeyDown = function(event) {
    if (event.key == 'left') {
        if (moveTool.selectedItem) {
            moveTool.selectedItem.rotate(-1);
        }
    }
    if (event.key == 'right') {
        if (moveTool.selectedItem) {
            moveTool.selectedItem.rotate(1);
        }
    }

}
moveTool.onMouseDown = function(event) {
    paper.settings.handleSize = 1;
    project.activeLayer.selected = false;
    moveTool.selectedItem = event.item;
    if (event.item) {
        event.item.selected = true;
         if (moveTool.selectedItem.meta) {
            moveTool.selectedItem.meta.info.group = "Déplacement";
            moveTool.selectedItem.toolValues.info = editTool.toolValues.info
            window.toolHasChanged(moveTool.selectedItem.meta, moveTool.selectedItem.toolValues);
        } 



        if (event.modifiers.shift) {

            moveTool.selectedItem.sendToBack();
            if (raster)
                raster.sendToBack();
        } 

    } 
}
moveTool.onMouseDrag = function(event) {

    if (moveTool.selectedItem) {
        if (event.modifiers.control) {
            moveTool.selectedItem.scale(1 + (event.delta.x / 100));
        } else {
            moveTool.selectedItem.position += event.delta;
        }
    }
}
moveTool.onMouseUp = function(event) {
}
moveTool.onMouseMove = function(event) {}








//----------------------------------------------


var polyLineTool = new Tool();

polyLineTool.c = new Path.Circle({
    center: [-10, -10],
    radius: 10,
    fillColor: "red",
    visible: false
});


polyLineTool.line = new Path.Line({
    strokeWidth: 1,
    strokeColor: 'black',
    visible: false,
    from: [0, 0],
    to: [1, 1]
});

polyLineTool.meta = JSON.parse(JSON.stringify(pathMeta));;
polyLineTool.toolValues = {
    laserType: "cut",
    strokeWidth: 1,
    info : "Click pour ajouter un segment. <br/> Click + Drag pour dessiner <br/> <br/> Terminer en cliquant sur le point de départ."

}

polyLineTool.meta.laserType.group = polyLineTool.meta.strokeWidth.group = "Polyline"

polyLineTool.updateObj = commonPathUpdate;
polyLineTool.onKeyUp = function(event) {}

polyLineTool.stopPath = function() {
    polyLineTool.myPath.updateObj(polyLineTool.myPath.toolValues)
    polyLineTool.myPath.closed = true;
    polyLineTool.c.visible = polyLineTool.line.visible = false;
    //$("#move").click();

}

polyLineTool.myPath = null;
polyLineTool.onMouseDown = function(event) {
    polyLineTool.minDistance = 20;

    if (polyLineTool.c.visible) {
        if ((event.point - polyLineTool.c.position).length < 10) {
            polyLineTool.stopPath();

        } else {
            polyLineTool.myPath.add(event.point);
            polyLineTool.line.strokeColor = polyLineTool.myPath.strokeColor;
        }
    } else {
        polyLineTool.c.visible = polyLineTool.line.visible = true;

        polyLineTool.c.position = event.point;

        polyLineTool.line.firstSegment.point = event.point;
        polyLineTool.line.lastSegment.point = event.point;

        var val = $('#propGrid').jqPropertyGrid('get');
        polyLineTool.myPath = new Path();
        polyLineTool.myPath.add(event.point);
        polyLineTool.myPath.meta = polyLineTool.meta;
        polyLineTool.myPath.toolValues = polyLineTool.toolValues;
        polyLineTool.myPath.updateObj = polyLineTool.updateObj;
        polyLineTool.myPath.updateObj(polyLineTool.myPath.toolValues)
        polyLineTool.myPath.fillColor = null;
        polyLineTool.c.bringToFront();

    }

}
polyLineTool.smoothingIndex = -1;
polyLineTool.onMouseDrag = function(event) {

    if (polyLineTool.myPath) {
        if (polyLineTool.smoothingIndex == -1) {
            polyLineTool.smoothingIndex = polyLineTool.myPath.segments.length;
        }

        if ((event.point - polyLineTool.c.position).length < 21) {
            polyLineTool.stopPath();
        } else {
            polyLineTool.myPath.add(event.point);
        }

    }

}
polyLineTool.onMouseUp = function(event) {
    polyLineTool.minDistance = 1;
    if (polyLineTool.smoothingIndex != -1) {
        console.log({
            from: polyLineTool.smoothingIndex,
            to: polyLineTool.myPath.segments.length - 1
        });
        polyLineTool.myPath.smooth({
            from: polyLineTool.smoothingIndex,
            to: polyLineTool.myPath.segments.length - 1
        });
        polyLineTool.smoothingIndex = -1;
    }
}
polyLineTool.onMouseMove = function(event) {
    if (polyLineTool.c.visible) {

        polyLineTool.line.firstSegment.point = polyLineTool.myPath.lastSegment.point;
        polyLineTool.line.lastSegment.point = event.point;
    }
}
polyLineTool.onKeyDown = function(event){

     if( event.key == "escape")
        {
            if(polyLineTool.myPath)
            {
                polyLineTool.myPath.remove();
            }
             polyLineTool.c.visible = polyLineTool.line.visible = false;

            // Remove item
            $("#move").click();

        }
}


//------------------------------



// Activate first tool
 moveTool.activate();
 window.toolHasChanged(moveTool.meta, moveTool.toolValues)

paper.settings.handleSize = 10;
paper.settings.hitTolerance = 20;
/// Change tool
paper.changeTool = function(t) {
    project.activeLayer.selected = false;

    switch (t) {
        case "pen":
            penTool.activate();
            window.toolHasChanged(penTool.meta, penTool.toolValues)
            break;

        case "polyline":
            polyLineTool.activate();
            window.toolHasChanged(polyLineTool.meta, polyLineTool.toolValues)

            break;

        case "circle":
            circleTool.activate();
            window.toolHasChanged(circleTool.meta, circleTool.toolValues)
            break;

        case "rectangle":
            rectangleTool.activate();
            window.toolHasChanged(rectangleTool.meta, rectangleTool.toolValues)
            break;

        case "ellipse":
            ellipseTool.activate();
            window.toolHasChanged(ellipseTool.meta, ellipseTool.toolValues)
            break;

        case "tree":
            treeTool.activate();
            window.toolHasChanged(treeTool.meta, treeTool.toolValues)
            break;

        case "flake":
            snowFlakeTool.activate();
            window.toolHasChanged(snowFlakeTool.meta, snowFlakeTool.toolValues)
            break;

        case "star":
            starTool.activate();
            window.toolHasChanged(starTool.meta, starTool.toolValues)
            break;

        case "select":
            editTool.activate();
            window.toolHasChanged(editTool.meta, editTool.toolValues)
            break;
        case "move":
            moveTool.activate();
            window.toolHasChanged(moveTool.meta, moveTool.toolValues)
            break;


    }
}
paper.loadImage = function(img) {
    handleImage(img);
};


var raster;

function handleImage(image) {
    count = 0;
    /* if (group)
         group.remove();*/
    if (raster) {
        raster.remove();
    }
    raster = new Raster(image);
    raster.fitBounds(view.bounds, false);
    raster.scale(0.7);
    raster.position = new Point(view.bounds.width / 2, raster.bounds.height / 2 + 20);
    raster.sendToBack();
}


paper.downloadAsSVG = function(fileName) {

    if (!fileName) {
        fileName = "paperjs_example.svg"
    }
    for (var i = paper.project.activeLayer.children.length - 1; i >= 0; i--) {
        if(paper.project.activeLayer.children[i].fillColor)
            {
                paper.project.activeLayer.children[i].fillColor.alpha = 1;
            }
    };

    var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({
        asString: true
    }));

    var link = document.createElement("a");
    link.download = fileName  + ".svg";
    link.href = url;
    link.click();
}

