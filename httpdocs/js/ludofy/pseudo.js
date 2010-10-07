
var a = new Action();
var aList = new LazyLoadingActionList(match);

// do all rules pass for this action?
if(!d.every(ruleList,'item.isFair(a,aList')) throw new Error('You broke the rules'); 

var newRewardList = d.flatmap(resultList,'item.apply(a,aList)');

rewardManager.apply(match,newRewardList);
