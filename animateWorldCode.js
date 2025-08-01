q=223
pms={}
cf={}
function add(x,y){
	return [x[0]+y[0],x[1]+y[2],x[2]+y[1]]
}
function add_n(x,y){
	return [x[0]+y[0],x[1]+y[1],x[2]+y[2]]
}
function Radd(x,y){
	return [x[0]-y[0],x[1]-y[2],x[2]-y[1]]
}
object_names = [
    "Head", 
    
    "Torso5",
    "Torso4",
    "Torso6",
	"Torso1",
    "Torso2",
    "Torso3",
	"RArm1",
    "RArm2",
    "RArm3",
    "LArm1",
    "LArm2",
    "LArm3",
    "RLeg1",
    "RLeg2",
    "RLeg3",
    "LLeg1",
    "LLeg2",
    "LLeg3",
    
]
tkt=0
animate_p={}
emote_layouts={}
function setDefaultMob(type, options){
	options.forEach(op=>{
		api.log(op)
	})
}
function onPlayerDamagingMob(id,id1){
	return "preventDamage"
}
function tick(){
	tkt++
	if (tkt%2===0){
		
		Object.keys(animate_p).forEach(id=>{
			if (animate_p[id].length>0){
				single_frame = animate_p[id][0]
				
				for (i=0;i<single_frame.length;i++){
					
					[mid, bd]=OBJC[object_names[i]]
					
					
					radded=[torad(single_frame[i][1][0]),torad(single_frame[i][1][1]),torad(single_frame[i][1][2])]
					api.updateEntityNodeMeshAttachment(attaCHES[id][mid], bd.node, "BloxdBlock", {blockName:bd.block, size:bd.size, meshOffset:[0, 0, 0]}, add(bd.offset,single_frame[i][0]),Radd(bd.deg,radded))
					
					
				}
				animate_p[id].shift()
			}
			
		})
	}

}
emots=["hi"]
function playerCommand(id,cmd){
	if (cmd.split(" ")[0]==="emote"){

		if (cmd.split(" ")[1]==="hi"){
			api.sendMessage(id, "Emoting "+cmd.split(" ")[1])
			for (const single_frame of hi_emote_full) {
				animate_p[id].push(single_frame)
		
			}
			return true
		}else if (cmd.split(" ")[1]==="1"){
			api.sendMessage(id, "Emoting "+cmd.split(" ")[1])
			for (const single_frame of test_emote) {
				animate_p[id].push(single_frame)
		
			}
			return true
		}else if (cmd.split(" ")[1]==="2"){
			for (const single_frame of tp0.concat(tp1)) {
				animate_p[id].push(single_frame)
		
			}
			return true
		}else if (cmd.split(" ")[1]==="3"){
			for (const single_frame of tp2.concat(tp3)) {
				animate_p[id].push(single_frame)
		
			}
			return true
		}else if (cmd.split(" ")[1]==="4"){
			for (const single_frame of tp4.concat(tp5)) {
				animate_p[id].push(single_frame)
		
			}
			return true
		}
		else if (cmd.split(" ")[1]==="4"){
			for (const single_frame of tp4.concat(tp6)) {
				animate_p[id].push(single_frame)
		
			}
			return true
		}
		

	}
}
function onPlayerJoin(id){
	cf[id]=0
	animate_p[id]=[]
	
}
