/**
========================================================
 _______       ___      .______       __  ___ 
|       \     /   \     |   _  \     |  |/  / 
|  .--.  |   /  ^  \    |  |_)  |    |  '  /  
|  |  |  |  /  /_\  \   |      /     |    <   
|  '--'  | /  _____  \  |  |\  \----.|  .  \  
|_______/ /__/     \__\ | _| `._____||__|\__\ 
                                              

.__   __.      ___       _______   _______  _______ .__   __. 
|  \ |  |     /   \     |       \ |   ____||   ____||  \ |  | 
|   \|  |    /  ^  \    |  .--.  ||  |__   |  |__   |   \|  | 
|  . `  |   /  /_\  \   |  |  |  ||   __|  |   __|  |  . `  | 
|  |\   |  /  _____  \  |  '--'  ||  |____ |  |____ |  |\   | 
|__| \__| /__/     \__\ |_______/ |_______||_______||__| \__| 
                                                              
.______     ______   .___________.
|   _  \   /  __  \  |           |
|  |_)  | |  |  |  | `---|  |----`
|   _  <  |  |  |  |     |  |     
|  |_)  | |  `--'  |     |  |     
|______/   \______/      |__|     
                                  
========================================================
 Copyright (C) 2022.                                                                                        
 Licensed under the  GPL-3.0 License;                                                      
 You may not use this file except in compliance with the License.    
 It is supplied in the hope that it may be useful                                     
 * @project_name : DARK NADEEN BOT                                                                    
 * @author : kushansewmina1234 <https://github.com/kushansewmina1234>   
 * @description : DARK NADEEN BOT ,A Multi-functional whatsapp bot @DINKA.       
 * @version 0.0.1                                                                                             
 ========================================================
 **/

 var alivemessage = `*HELLO IM DARK NADEEN BOT*
 
_IM MULTI DEVICE WWHATSAPP BOT_ 

_If any query : wa.me/94716769285_


*_Update Alive Message by adding text with Alive_*
*Eg: _.alive Your_Alive_Message_*`;
  





 const { tlang, ffmpeg,cmd ,alive,botpic} = require('../lib')

 cmd({
    pattern: "alive",
    category: "general",
    filename: __filename,
    desc: "is bot alive??"
},
async(Suhail, msg, text, {isCreator}) => {
  let get = text;
let urll = '';     
  let image = false;
  let video = false;
  
if(isCreator && text){
let aliv = await alive.findOne({ id:"Suhail_Md" }) || await new alive({ id:"Suhail_Md"}).save();
if (text.startsWith("get")) return msg.reply(aliv.get);

const linkPattern = /(https?:\/\/\S+)/gi;
const imageExtensions = ['.jpg', '.jpeg', '.png'];
const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.gif'];
let match = text.match(linkPattern) || false ; 
if(match)
{
    let i = 0;
    while (i < match.length && !image && !video ) 
    {
          urll = match[i];
          const extension = urll.substring(urll.lastIndexOf('.')).toLowerCase();
          if (imageExtensions.includes(extension)) { image = true;  video = false; } 
          else if (videoExtensions.includes(extension)) { video = true; image = false; }
          else { console.log(`Unknown link: ${urll}`)  }
          i++;
    }
}
if( video || image) { text = text.replace(urll, ''); }
await alive.updateOne({ id: 'Suhail_Md' }, { text: text, get : get, url: urll,  image: image,   video: video });
}
let aliv = await alive.findOne({ id:"Suhail_Md" }) || await new alive({ id:"Suhail_Md"}).save() ; 


alivemessage = aliv.text || "";
 

  image = aliv.image || false;
  video=aliv.video || false ;
  urll = aliv.url || await botpic() ;

  

const messageOptions = image ? { image: { url: urll }, caption: alivemessage } : video? { video: { url: urll },gifPlayback: true, caption: alivemessage } : {  text: alivemessage }

Suhail.sendMessage(msg.chat, messageOptions,{quoted : msg });
}
)

