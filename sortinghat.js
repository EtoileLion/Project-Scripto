on("chat:message", function(msg) {
	if(msg.type === "api" && msg.content.indexOf("!sortchar") !== -1) {
		let charname = msg.content.slice(msg.content.indexOf(" ")+1).trim();	    
		let chars = findObjs({name: charname,"_type":"character"});
		//log(chars);
		if(chars.length == 0) {
		    sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" You cannot put me on a head that does not exist!");
		    return;
		}
		chars = chars[0];	
		//Decide
		let scores = [0,0,0,0];
		let start = 0;
		let unknowns = [];
		let ptraits = [];
		let ntraits = [];
		while(start < 5) {
		    attr = attrLookup(chars,"repeating_postraits_$"+start+"_postrait", false);			
		    if(attr == undefined) {
		        break;
		    }
			attr = attr.get('current')
			log(attr);
		    if(!sorting_traits.hasOwnProperty(attr.toLowerCase())) {
		        unknowns.push(attr);
		        continue;
		    }
		    ptraits.push(attr);
		    let vals = sorting_traits[attr.toLowerCase()].map(function(x) { return x * (5-start); })
		    scores = scores.map(function(x,i) { return x + vals[i]; })
			start++
		}
		start = 0;
		while(start < 5) {
		    attr = attrLookup(chars,"repeating_negtraits_$"+start+"_negtrait", false);
		    start++
		    if(attr == undefined) {
		        break;
		    }
			attr = attr.get('current')			
			log(attr);			
		    if(!sorting_traits.hasOwnProperty(attr.toLowerCase())) {
		        unknowns.push(attr);
		        continue;
		    }
		    ntraits.push(attr);
		    let vals = sorting_traits[attr.toLowerCase()].map(function(x) { return x * Math.max((6-start),0); })    		    
		    scores = scores.map(function(x,i) { return x + vals[i]; })
		}
		log(scores)
		if(unknowns.length > 0) {
		    sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" I don't recognize the following traits: "+unknowns.join(","))
		    return;
		}
		let scoreres = _.chain(scores)
		.map(function(score,key) { return {"name":houses[key],"sdiff":Math.max(...scores)-score}; })
		.filter(function(result) { return result.sdiff <= 5; })
		.sortBy(function(result) { return 5-result.sdiff; })
		.pluck('name')
		.value();
		let house = _.first(scoreres)
		let alternatives = ""+_.rest(scoreres).join(",");

	    //Start
		sendChat("The Sorting Hat",'/emas "The Sorting Hat" is placed upon '+charname+"'s head...")
	    sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" "+sorting_messages.starting[Math.floor(Math.random() * sorting_messages.starting.length)]);
	    //Muse
		setTimeout(function() { sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" "+sorting_messages.musing[Math.floor(Math.random() * sorting_messages.musing.length)]) },3000);
		setTimeout(function() { sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" "+sorting_messages.decision[Math.floor(Math.random() * sorting_messages.decision.length)].replace("#POS1#",ptraits[0]).replace("#NEG1#",ntraits[0])) } ,6000);
		setTimeout(function() { sendChat("The Sorting Hat",'/emas "The Sorting Hat" '+sorting_messages.emote[Math.floor(Math.random() * sorting_messages.emote.length)].replace("#CHARNAME#",charname).replace("#HOUSE#",house.toUpperCase())) },7500);
		if (alternatives != "") { setTimeout( function() { sendChat("The Sorting Hat","<span class='sheet-smalltext'>Alternative(s): "+alternatives+"</span>"); },7550); }
	}
});

let houses = ["Gryffindor","Hufflepuff","Ravenclaw","Slytherin"];
let sorting_messages = {
    'starting':[
        "Hmmm, let's see...",
        "Ah, another one to be sorted...",
        "Time to find your footing.",
        "Oh you may not think I'm pretty, but don't judge on what you see, I'll eat myself if you can find a smarter hat than me.",
        "Are you afraid of what you'll hear? Afraid I'll speak the name you fear?"
        ],
    'musing':[
        "Interesting...",
        "Where to put you",
        "Where shall your future lie..."
        ],
    'decision':[
        "#POS1#, but also #NEG1#... better be..",
        "Ah, I know.",
        "Best to put you into...",
        "I've made my call, your house will be.."
        ],
    'emote':[
        "hardly sits upon #CHARNAME#'s head for a moment before pronouncing '#HOUSE#!'",
        "considers for a few moments before opening its mouth wide and proclaims... #CHARNAME# belongs in #HOUSE#!"
        ]
}
let sorting_traits = {
    "adventurous": [1,0,0,0],
    "ambitious": [0,0,1,1],
    "brave": [1,0,0,0],
    "caring":[0,1,1,0],
    "cautious":[0,0,0,1],
    "charming":[1,0,0,1],
    "chivalrous":[1,0,0,0],
    "clever":[0,0,1,1],
    "cooperative":[0,1,0,0],
    "creative":[0,0,1,0],
    "determined":[1,0,0,1],
    "empathetic":[0,1,0,0],
    "enduring":[0,1,0,1],
    "fair":[1,1,0,0],
    "hard working":[0,1,1,0],
    "honest":[1,1,0,0],
    "industrious":[1,1,0,0],
    "intimidating":[1,0,0,1],
    "intuitive":[0,0,1,0],
    "loyal":[1,1,0,0],
    "methodical":[0,0,0,1],
    "nurturing":[1,1,0,0],
    "observant":[0,1,1,0],
    "obsessive":[0,0,0,1],
    "open-minded":[0,1,1,0],
    "patient":[0,1,0,0],
    "philosophical":[0,0,1,0],
    "reliable":[0,1,0,1],
    "reserved":[0,0,1,1],
    "sly":[1,0,0,1],
    "smart":[0,0,1,0],
    "soulful":[0,0,1,1],
    "strong":[1,0,0,1],
    "studious":[0,1,1,0],
    "traditional":[0,0,0,1],
    "witty":[1,0,1,0],
    "abrasive":[1,0,0,1],
    "aggressive":[1,0,0,0],
    "aloof":[0,0,1,0],
    "anxious":[0,0,1,0],
    "arrogant":[1,0,0,0],
    "callous":[0,0,0,1],
    "clueless":[1,1,0,0],
    "clumsy":[1,1,0,0],
    "conforming":[0,1,0,0],
    "critical":[1,0,1,0],
    "deceitful":[0,0,0,1],
    "dismissive":[0,0,1,1],
    "dominating":[1,0,0,0],
    "dull":[0,1,0,0],
    "eccentric":[0,0,1,0],
    "gullible":[1,1,0,0],
    "indecisive":[0,0,1,0],
    "insecure":[0,1,0,1],
    "know-it-all":[0,0,1,0],
    "lazy":[0,1,0,0],
    "manipulative":[0,0,0,1],
    "melancholic":[0,0,1,1],
    "naive":[1,1,0,0],
    "narcissistic":[1,0,0,1],
    "ordinary":[0,1,0,0],
    "passive":[0,1,1,0],
    "prideful":[1,0,0,1],
    "pushover":[0,1,0,0],
    "quiet":[0,1,1,0],
    "reckless":[1,0,0,0],
    "secretive":[0,0,1,1],
    "self-righteous":[1,0,0,0],
    "skeptical":[0,0,1,1],
    "soft":[0,1,0,1],
    "standoffish":[0,0,1,0],
    "strict":[0,0,0,1]
}

/*With eternal thanks to The Aaron, who knows this stuff so well it's scary. */
const attrLookup = (character,name,caseSensitive) => {
        let match=name.match(/^(repeating_.*)_\$(\d+)_.*$/);
        if(match){
            let index=match[2],
                attrMatcher=new RegExp(`^${name.replace(/_\$\d+_/,'_([-\\da-zA-Z]+)_')}$`,(caseSensitive?'i':'')),
                createOrderKeys=[],
                attrs=_.chain(findObjs({type:'attribute', characterid:character.id}))
                    .map((a)=>{
                        return {attr:a,match:a.get('name').match(attrMatcher)};
                    })
                    .filter((o)=>o.match)
                    .each((o)=>createOrderKeys.push(o.match[1]))
                    .reduce((m,o)=>{ m[o.match[1]]=o.attr; return m;},{})
                    .value(),
                sortOrderKeys = _.chain( ((findObjs({
                        type:'attribute',
                        characterid:character.id,
                        name: `_reporder_${match[1]}`
                    })[0]||{get:_.noop}).get('current') || '' ).split(/\s*,\s*/))
                    .intersection(createOrderKeys)
                    .union(createOrderKeys)
                    .value();
            if(index<sortOrderKeys.length && _.has(attrs,sortOrderKeys[index])){
				log("Returned From Find")
                return attrs[sortOrderKeys[index]];
            }
            return;
        } 
		log("Returned From NoMatch")		
        return findObjs({ type:'attribute', characterid:character.id, name: name}, {caseInsensitive: !caseSensitive})[0];
    };