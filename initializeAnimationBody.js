for (mid=0;mid<attaCHES[myId].length;mid++){
    bdinfo=places[mid]
	api.applyEffect(attaCHES[myId][mid], "Invisible", null, {inbuiltLevel:1})
    bdinfo.forEach(bd=>{
    api.updateEntityNodeMeshAttachment(attaCHES[myId][mid], bd.node, "BloxdBlock", {blockName:bd.block, size:bd.size, meshOffset:[0, 0, 0]}, bd.offset, bd.deg)
    })
}
