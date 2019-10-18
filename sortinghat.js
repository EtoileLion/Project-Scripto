on("chat:message", function(msg) {
	if(msg.type === "api" && msg.content.indexOf("!sortchar") !== -1) {
		let charname = msg.content.slice(msg.content.indexOf(" ")+1).trim();	    
		let chars = findObjs({name: charname,"_type":"character"});
		log(chars);
		if(chars.length == 0) {
		    sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" You cannot put me on a head that does not exist!");
		    return;
		}
		chars = chars[0];
		//let attrs = findObjs({_type:"attribute",_characterid:chars.get("_id")}).filter(function(obj) { 
		//    let name = obj.get("name");
		//    return name.indexOf("repeating_postraits") != -1 || name.indexOf("repeating_negtraits") != -1;
		//});
	    //if(attrs.length == 0) {
	    //    sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" A blank personality has no house.")
	    //    return
	    //}
	    //Start
	    sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" "+sorting_messages.starting[Math.floor(Math.random() * sorting_messages.starting.length)]) };
	    //Muse
		setTimeout(function() { sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" "+sorting_messages.musing[Math.floor(Math.random() * sorting_messages.musing.length)]) },3000);
		//Decide
		let scores = [0,0,0,0];
		let start = 0;
		let unknowns = [];
		while(true) {
		    attr = getAttrByName(chars.get("_id"),"repeating_postraits_$"+start+"_postrait")
		    start++
		    if(attr == undefined) {
		        break;
		    }
		    if(!sorting_traits.hasOwnProperty(attr)) {
		        unknowns.push(attr);
		        continue;
		    }
		    let vals = sorting_traits[attr].map(function(x) { return x * Math.max((5-start),0); })
		    scores = scores.map(function(x,i) { return x + vals[i]; })
		}
		let start = 0;
		while(true) {
		    attr = getAttrByName(chars.get("_id"),"repeating_negtraits_$"+start+"_negtrait")
		    start++
		    if(attr == undefined) {
		        break;
		    }
		    if(!sorting_traits.hasOwnProperty(attr)) {
		        unknowns.push(attr);
		        continue;
		    }		    
		    let vals = sorting_traits[attr].map(function(x) { return x * Math.max((5-start),0); })
		    scores = scores.map(function(x,i) { return x + vals[i]; })
		}
		log(scores)
		if(unknowns.length > 0) {
		    sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" I don't recognize the following traits: "+unknowns.join(","))
		}
		let score2 = scores;
		let house = houses[scores.indexOf(Math.max(scores))];
		score2.sort()
		let backups = []
		if(score2[0]-score2[1] <= 5) {
		    backups.push(houses[scores.indexOf(score2[1])]);
		    if(score2[0]-score2[2] <= 5) {
		        backups.push(houses[scores.indexOf(score2[2])]);
		        if(score2[0]-score2[3] <= 5) {
		            backups.push(houses[scores.indexOf(score2[3])]);
		        }
		    }
		}
		setTimeout(function() { sendChat("The Sorting Hat","/w "+msg.who.replace(" (GM)","")+" "+sorting_messages.decision[Math.floor(Math.random() * sorting_messages.decision.length)]) } ,6000);
		setTimeout(function() { sendChat("The Sorting Hat",'/emas "The Sorting Hat" '+sorting_messages.emote[Math.floor(Math.random() * sorting_messages.emote.length)].replace("#CHARNAME#",charname).replace("#HOUSE#",house)+((backups.length > 0)?"<br>Alternatives: "+backups.join(","):"")) },7500);
	}
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}
let houses = ["Gryffindor","Hufflepuff","Ravenclaw","Slytherin"];
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
    "reserved":[0,0,1,0],
    "secretive":[0,0,1,1],
    "self-righteous":[1,0,0,0],
    "skeptical":[0,0,1,1],
    "soft":[0,1,0,1],
    "standoffish":[0,0,1,0],
    "strict":[0,0,0,1]
}

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
        "Ah, I know.",
        "Best to put you into...",
        "I've made my call, your house will be.."
        ],
    'emote':[
        "considers for a few moments before opening its mouth wide and proclaims... #CHARNAME# belongs in #HOUSE#!"
        ]
}