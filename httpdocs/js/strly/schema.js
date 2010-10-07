{
 Player:
  {contains:{Matches:{denormalize:true,type}},
   fields:['firstname','lastname']}
Game:
  {fields:['name'],
      relations:{Player:{type:one}},
Match:
    {contains:{CanDo:{type:one}}},
CanDo:
    {relations:{Game:{type:many,denormalize:true}},type:{Type:one}}
Done:
    
Result:
	done_id: Int
