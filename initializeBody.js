function setDefaultMob(type, options){
	
	Object.keys(options).forEach(op=>{
		api.setDefaultMobSetting(type, op, options[op])
	})
}
function clearAniBodies(id){
    if (!attaCHES[myId]){
        return
    }
    attaCHES[myId].forEach(id=>{
	api.removeFollowingEntityFromPlayer(myId, id)
	api.killLifeform(id)
    })
    attaCHES[myId]=[]
}
function spawnAnimationBody(id){

    pos=api.getPosition(myId)
    x=pos[0]
    y=pos[1]
    z=pos[2]
    setDefaultMob("Draugr Zombie",{"hostilityRadius":0,"attackImpulse":0,"baseWalkingSpeed":0,"baseRunningSpeed":0})
    mobid=api.attemptSpawnMob("Draugr Zombie", x, y, z, {})
	api.scalePlayerMeshNodes(mobid, scales)
    if (!attaCHES[myId]){
        attaCHES[myId]=[]
    }
    attaCHES[myId].push(mobid)
	
    api.addFollowingEntityToPlayer(myId, mobid,[0,0,10])
	try{
		api.setPlayerPose(mobid, "standing")
	}catch{}
	
}
function torad(deg){
	return deg/180 * Math.PI
}
scales={"TorsoNode":[1,1,1], "HeadMesh":[0,0,0], "ArmRightMesh":[1,1,1], "ArmLeftMesh":[1,1,1],"LegLeftMesh":[1,1,1], "LegRightMesh":[1,1,1]}
places={0:[{node:"TorsoNode", block:"Blue Concrete", size:.25,offset:[0.11,0.6,0],deg:[torad(0), torad(0),torad(0)]},
            {node:"ArmRightMesh", block:"Blue Concrete", size:.25,offset:[0,-0.12,0],deg:[torad(0), torad(0),torad(0)]},
            {node:"ArmLeftMesh", block:"Blue Concrete", size:.25,offset:[0,-0.12,0],deg:[torad(0), torad(0),torad(0)]},
            {node:"LegRightMesh", block:"Blue Concrete", size:.25,offset:[0,-0.12,0],deg:[torad(0), torad(0),torad(0)]},
            {node:"LegLeftMesh", block:"Blue Concrete", size:.25,offset:[0,-0.12,0],deg:[torad(0), torad(0),torad(0)]}  
        ],
        1:[{node:"TorsoNode", block:"Blue Concrete", size:.25,offset:[0.11,0.35,0],deg:[torad(0), torad(0),torad(0)]},
           {node:"ArmRightMesh", block:"Blue Concrete", size:.25,offset:[0,-0.37,0],deg:[torad(0), torad(0),torad(0)]},
           {node:"ArmLeftMesh", block:"Blue Concrete", size:.25,offset:[0,-0.37,0],deg:[torad(0), torad(0),torad(0)]},
			{node:"LegLeftMesh", block:"Blue Concrete", size:.25,offset:[0,-0.37,0],deg:[torad(0), torad(0),torad(0)]},
           {node:"LegRightMesh", block:"Blue Concrete", size:.25,offset:[0,-0.37,0],deg:[torad(0), torad(0),torad(0)]},
           
     
        ],
        2:[
			{node:"TorsoNode", block:"Cyan Ceramic", size:.5,offset:[0,0.97,0],deg:[torad(0), torad(-90),torad(0)]},
           {node:"ArmRightMesh", block:"Blue Concrete", size:.25,offset:[0,-0.62,0],deg:[torad(0), torad(0),torad(0)]},
           {node:"ArmLeftMesh", block:"Blue Concrete", size:.25,offset:[0,-0.62,0],deg:[torad(0), torad(0),torad(0)]},
           {node:"LegRightMesh", block:"Blue Concrete", size:.25,offset:[0,-0.62,0],deg:[torad(0), torad(0),torad(0)]},
           {node:"LegLeftMesh", block:"Blue Concrete", size:.25,offset:[0,-0.62,0],deg:[torad(0), torad(0),torad(0)]}
        ],
		3:[
			{node:"TorsoNode", block:"Blue Concrete", size:.25,offset:[0.11,0.1,0],deg:[torad(0), torad(0),torad(0)]},
           {node:"LegRightMesh", block:"Blue Concrete", size:.25,offset:[0.01,0.35,0],deg:[torad(0), torad(0),torad(0)]},
           {node:"ArmLeftMesh", block:"Blue Concrete", size:.25,offset:[-0.47,-0.12,0],deg:[torad(0), torad(0),torad(0)]},
          	{node:"ArmRightMesh", block:"Blue Concrete", size:.25,offset:[0.25,-0.62,0],deg:[torad(0), torad(0),torad(0)]},
           
        ]
		
    }

INDEXES=["HeadMesh","TorsoNode","ArmRightMesh","ArmLeftMesh","LegRightMesh","LegLeftMesh"]

OBJC={"Head": [2,places[2][0]], 
    "Torso1": [0,places[0][0]],
	"Torso2":[1,places[1][0]],
	"Torso3": [3,places[3][0]],
	"Torso4":[3,places[3][1]],
	"Torso5": [3,places[3][2]],
	"Torso6":[3,places[3][3]],
    "LArm1":[0,places[0][2]],
    "LArm2":[1,places[1][2]],
    "LArm3":[2,places[2][2]],
    "RArm1":[0,places[0][1]],
    "RArm2":[1,places[1][1]],
    "RArm3":[2,places[2][1]],
    "LLeg1":[0,places[0][4]],
    "LLeg2":[1,places[1][4]],
    "LLeg3":[2,places[2][4]],
    "RLeg1":[0,places[0][3]],
    "RLeg2":[1,places[1][3]],
    "RLeg3":[2,places[2][3]],
    }
try{
    attaCHES
}catch{
    attaCHES={}
    attaCHES[myId]=[]
}
clearAniBodies(myId)
api.applyEffect(myId, "Invisible",null,{})
for (i=0;i<Object.keys(places).length;i++){
    spawnAnimationBody(myId)
}
