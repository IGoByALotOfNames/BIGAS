attaCHES[myId].forEach(id=>{
	api.removeFollowingEntityFromPlayer(myId, id)
	api.killLifeform(id)
})
attaCHES[myId]=[]
