const getGoals = (req,res) => {
    res.status(200).json({message : 'GET Goals'})
}

const postGoal = (req,res)=>{

if(req.body.text){
res.status(400).json({
    
})
}

res.status(200).json({message : 'POST Goal'})
}

const putGoal =  (req,res) =>{
    res.status(200).json({ message : 'PUT the goal'})
    console.log(`PUT ID ${req.params.id}`)
}

const deleteGoal = (req,res)=>{
    res.status(200).json({message : 'DELETE the goal'})
     console.log(`DELETE ID ${req.params.id}`)
}

module.exports = {getGoals,postGoal,putGoal,deleteGoal}