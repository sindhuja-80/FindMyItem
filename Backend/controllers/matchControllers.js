import Item from '../models/Item.js';
import Fuse from 'fuse.js';
export const findMatches = async (req, res) => {
    try {
        const lostItems = await Item.find({ type: 'lost' });
        const foundItems = await Item.find({ type: 'found' });
      
     const options={
       keys: ["itemName","location","category","tags"],
        threshold: 0.4
     }
     const fuse=new Fuse(foundItems,options)
       const matches = [];
       lostItems.forEach((lost)=>{
        const result=fuse.search(lost.itemName)
        result.forEach((r)=>{
            const found=r.item
             let score = 0

        if(found.itemName.includes(lost.itemName)) score += 3
        if(found.tags && lost.tags){
            const commonTags = found.tags.filter(tag => lost.tags.includes(tag));
            if(commonTags) score+=2
        }

        if(found.location === lost.location) score += 2
        matches.push({
            lostItem:lost,
            foundItem:found,
        })
        })
        })
        matches.sort((a,b)=>b.score-a.score)
            res.json({ success: true, matches });
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
}