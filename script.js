let currentsong = new Audio()
let run = document.getElementById("play")
let realdata = [];
let currf // jisse har bar naya folder ka name jaye to currf update ho jaye kahi aisa nhi hona chahiye ki pahle ka folder ka name hi use hota rahe

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);          // get whole minutes
    const secs = Math.floor(seconds % 60);          // get remaining seconds
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`; // add leading 0 if needed
}


// YAAD RAKHO YE TRACKS.JSON USE KAR RAHA HAI TO JAB BHI NAYA FOLDER BANAOGE YA NAYE SONGS ADD KAROGE TO node MAKE-JSON.JS POWERSHELL ME CHALANA HOGA JISSE FOLDER AND SONGS APNE APNE TRACKS.JSON KE FOLDER ME ADD HOJAYE AUR FIR BSS HO GAYA

async function getdata(folder) {
    currf = folder
    realdata = []
    let request = await fetch(`/songs/${currf}/tracks.json`)
    let response = await request.json() // here we got all mp3 in the response
    console.log(response.songs)
    // console.log(data)
    // console.log(realdata)

    let z = document.querySelector(".left-second-second").getElementsByTagName("ul")[0]
    z.innerHTML = ""
    for (const gaana of response.songs) {
        let a = `/songs/${currf}/${encodeURIComponent(gaana)}` // ye encodeURIComponent HAMNE USE KIA TAKI HAM IS LINK ME %20 AUR BHI YE SAB BKWASS LA SKE ENCODE KARKE KYOKI HAMARI CURRENTSONG.SRC ME BHI SAME BKWWAAS HAI ENCODED HAI TO DONO MATCH HO SKE ISLIYE HAMNE APNI LINK KO BHI ENCODE KAR DIA SAME FORM ME
        realdata.push(a)
        z.innerHTML = z.innerHTML + `<li class="song-item" data-url="/songs/${currf}/${gaana}">
                            <img src="img/photo.jpg" alt="">
                            <div class="list-name">
                                <h5>${gaana.split("-")[0]}</h5>  
                                <h5 style="color: rgb(179, 179, 179);;">${gaana.split("-")[1].replace(".mp3", "")}</h5>
                            </div>
                            <img src="img/play.svg" alt="">
                        </li> `
    }

    attachSongListeners();  // We are applying event listner each time when realdata is updated since realdata update means list update so everytime eventlistener should update

    //THIS IS WHAT SPLIT FUNCTION DO:-

    // let a="Abroad%20Again%20-%20Jeremy%20Blake.mp3"
    // undefined
    // a.split("Blake")
    // (2) ['Abroad%20Again%20-%20Jeremy%20', '.mp3']
}

function attachSongListeners() {
    document.querySelectorAll(".song-item").forEach((e) => {
        e.children[2].addEventListener("click", () => {
            playmusic(e.dataset.url);
        });
    });
}

function playmusic(link, pause = false) {
    currentsong.src = link  // We are using a global variable currentsong and using src ko har bar change kar rahe hai us link se jo aa rahi hai kisi particular list ko click karke,jisse har bar src change hogi aur ek time par ek hi song play hoga
    if (!pause) {

        //when the page is loaded then first song reached into the link through playmusic(readdata[0],true) but alongwith that true    also came so pause become true and hence !pause becomes false so if block did not run and hence only the first song get loaded, its name and time get updated on the page. As be press the play button which is assigned run variable in js, run.addeventlistner works and checks if the song is paused then play it, if played then pause it.

        currentsong.play()
        run.src = "img/paused.svg"
    }
    document.querySelector(".songname").innerHTML = `${link.split(currf + "/")[1].replaceAll("%20", " ").replace(".mp3", "")}`

    // Applying songtime

    // Update initially when metadata is loaded , starting me time 00:00/  show karne ke liye ye use kia hai
    currentsong.addEventListener("loadedmetadata", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`
    });

    // Update continuously while playing
    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`

        //Targeting circle for its movement  (Here we will use currenttime and duration only in seconds to compute the left distance in %)
        if (currentsong.currentTime == currentsong.duration) {
            run.src = "img/play.svg"
        }

        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
        // Ex:- Let we are at 50s and total song is of 100s so by calculation it caomes 50% which we want the circle to move throght transition ease

    })
    checkWidth();
}

//function to clean urls

function cleanURL(url) {
    return url
        .replace(/%5C/g, "/")              // encoded backslashes
        .replace(/\\/g, "/")               // raw backslashes
        .replace(/\/{2,}/g, "/")           // remove extra slashes
        .replace("http:/", "http://")      // fix http:/ to http://
        .replace(/ProjectSpotifyClone\/ProjectSpotifyClone/g, "ProjectSpotifyClone");
}



// To create cards according to the folders present inside the songs folder
// we are using different approach not directory listing
async function displayalbums() {
    let waitt = await fetch(`/songs/tracks.json`)
    let collect = await waitt.json() // now data contains a json file, so data is an object which contains an array of folder objects
    console.log(collect)
    for (const foldname of collect.folders) { //collect.folders directly throgh us to the array of folder object
        const fold = foldname.name
        //    console.log(fold)
        const response = await fetch(`/songs/${fold}/info.json`)
        const data = await response.json()
        cardcontainer = document.querySelector(".album-container")
        cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div class="album1 card" data-folder="${fold}">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1cm" height="1cm"
                                fill="#1DB954">
                                <circle cx="12" cy="12" r="12" fill="#1DB954" />
                                <polygon points="9,7 15,12 9,17" fill="white" />
                            </svg>
                        </div>
                        <img src="songs/${fold}/cover.jpg" alt="">
                        <h3>${data.title}</h3>
                        <p>${data.detail}</p>
                    </div>`

    }
}


const mq = window.matchMedia("(min-width: 300px) and (max-width: 450px)");
function checkWidth() {
    if (mq.matches) {
        console.log("Width is between 300 and 450px");

        if (!currentsong.src) return; // no song loaded yet

        // Extract name from currentsong.src instead of first song-item
        let link = currentsong.src;
        document.querySelector(".songname").innerHTML =
            `${link.split(currf + "/")[1].replaceAll("%20", " ").replace(".mp3", "").split("-")[0]}`;
    }
}



mq.addEventListener("change", checkWidth);
checkWidth(); // run once on load



async function recievedata() {


    //Problem:- untill the user click on the card nothing will be displayed in the your library since js is stuck at await folder whose promise will be resolved until the user click a card 
    //SOLUTION:- To solve the problem that some song list should appear as the page loads , songlist should not be empty as page loads
    await getdata("AngerArena")
    playmusic(realdata[0], true) //To display the song details on the playlist

    //Now creating something that will display different songlist in the your library on clicking different cards
    folder()

    async function folder() {
        //Pahle problem aa rahi thi aur maine use galat smj lia, maine smja ki promise return nhi kara hai to eventlistner work nhi karega immediately folder function khatam ho jayega par aisa nhi tha folder function aur uske andar event listener proper work kar rahe the songs bhi fetch hokar list bana rahe the, dikkat ye thi ki playmusic bahar tha to due to asynchonous nature of javascript folder aur playmusic sath me chale par jab tk folder khatam nhi hoga tab bhi realdata exits nhi karega aur tab tk playmusic ke pass realdata[0] empty hoga to dono sath me chalenge erros aaye ab maine playmusic ko andar likh dia to bo folder ke har bar realdata aane par click par, playmusic ke andar pahla song bhej raha tha which solved the problem

        document.querySelectorAll(".card").forEach((e) => {
            e.addEventListener("click", async item => {
                console.log(item.currentTarget.dataset.folder)
                await getdata(item.currentTarget.dataset.folder)
                playmusic(realdata[0]) // everytime realdata is updated,its 0th child song details should get loaded in the playlist and should be played
                run.src = "img/paused.svg"
                document.querySelector(".circle").style.left = 0 + "%"
            })
        })

    }

    // console.log(realdata)



    // Applying Event Listener on on the play button of playlist
    run.addEventListener("click", () => {
        if (currentsong.paused) {
            console.log(realdata[0])
            console.log(currentsong.src)
            currentsong.play()
            run.src = "img/paused.svg"
        }
        else {
            currentsong.pause()
            run.src = "img/play.svg"
        }
    })

    // Applying Event Listener on on the previous button of playlist
    document.getElementById("previous").addEventListener("click", () => {
        // let templ=currentsong.src;
        let relativePath = new URL(currentsong.src).pathname; //kyoki hamare realdata array me http bali line nhi thi usme bss pathname tha har song ka , par currentsong.src me htttp bhi aa raha tha pathname ke sath to hamne bss currentsong.src se uska pathname le lia jissse ham use match kar ske realdata array se aur index pata kar ske
        console.log(relativePath)
        // console.log(templ)

        let position = realdata.indexOf(relativePath)
        // console.log(realdata)
        // console.log(position)
        if (position - 1 >= 0) {
            playmusic(realdata[position - 1]) //true isliye bheja hai taki next previous karne par song directly play nhi ho user ki marzi hai play karna play button dabakar
        }
        else {
            position = realdata.length - 1;
            // console.log(position)
            playmusic(realdata[position]) // jump to last song,true isliye bheja hai taki next previous karne par song directly play nhi ho user ki marzi hai play karna play button dabakar
        }
        checkWidth();
    })

    // Applying Event Listener on on the next button of playlist

    document.getElementById("next").addEventListener("click", () => {
        // let templ=currentsong.src;
        let relativePath = new URL(currentsong.src).pathname; //same as previous logic
        // console.log(templ)

        let position = realdata.indexOf(relativePath)
        if (position + 1 < realdata.length) {
            playmusic(realdata[position + 1])//true isliye bheja hai taki next previous karne par song directly play nhi ho user ki marzi hai play karna play button dabakar
        }
        else {
            position = 0;
            playmusic(realdata[position])  // jump back to first song,true isliye bheja hai taki next previous karne par song directly play nhi ho user ki marzi hai play karna play button dabakar
        }
        checkWidth();
    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {

        // Important terms to understand
        // 1. clientX:- It is the distance in pixel from the left edge of the screen to the point you clicked 
        // 2.rect.left:- It gives the distance from the left edge of the screen to the starting point of the seekbar
        // 3. clientX-rect.left :-It gives the distance on the seekbar you have to move
        // 4. getBoundingClientReact():- It gives various things like width,left,right etc.. and we can use anything we want to use from this using the variable in which the data is stored

        //  Property	     Meaning
        //  rect.left	      Distance in pixels from left edge of viewport to left edge of element
        //  rect.top	      Distance in pixels from top edge of viewport to top edge of element
        //  rect.width	      Width of the element in pixels
        //  rect.height      Height of the element in pixels
        //  rect.right	      Distance from left edge of viewport to right edge of element (left + width)
        //  rect.bottom      Distance from top edge of viewport to bottom edge of element (top + height)

        let rect = document.querySelector(".seekbar").getBoundingClientRect()
        let offsetX = e.clientX - rect.left
        let distance = (offsetX / rect.width) * 100
        document.querySelector(".circle").style.left = distance + "%";
        currentsong.currentTime = (distance * currentsong.duration) / 100  // since currenttime/duration*100 gives distance and we add % after it so distance without percent multiplied by duration and divide by 100 will give currenttime whenever clicked 
    })



    // Targeting hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0
    })

    // Targeting close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = -120 + "%"
    })

    //Targetting input range to control volume
    document.getElementById("vol").addEventListener("input", (e) => {
        currentsong.volume = (e.target.value) / 100
        // Dekho volume hoti hai 0 se 1 ke beech 0 means mute and 1 means 100, e.target means event jis target par laga hai(jo ki yaha par hai input range ) uski value do aur divide by hundred karo(for ex:- 20/100=0.2 implies that 20% volume )

        // You can use two things change and input but change shows result when you leave mouse after dragging while input shows result with the dragging of the mouse
        if (e.target.value == 0) {
            document.querySelector(".speakicon").src = "img/mute.svg"
        }
        else {
            document.querySelector(".speakicon").src = "img/speaker.svg"
        }

    })

    //Targetting speakicon to change when someone click on it

    let si = document.querySelector(".speakicon")
    si.addEventListener("click", (e) => {
        console.log(e)
        if (si.src.includes("speaker.svg")) {
            // Jab ham check karte hai tab directly check nhi kar skte ki si.src="img/speaker.svg" kykoki iska actual path ye hai hi nhi iska actual path hai http://127.0.0.1:5500/img/speaker.svg isliye checking ke liye includes use karna padta hai

            currentsong.volume = 0
            vol.value = 0
            si.src = "img/mute.svg"  // Jab ham set karte hai to ho jata hai directly kyoki js ise path provide kar deta hai
        }
        else {
            currentsong.volume = 0.1 // kyoki surrentsong.volume 0 se1 ke beech hoti hai 
            vol.value = 10
            si.src = "img/speaker.svg"  // Jab ham set karte hai to ho jata hai directly kyoki js ise path provide kar deta hai
        }
    })

}
async function main(params) {
    await displayalbums()
    recievedata()
}

main()

// Folder bale function me hame promise ki zaroorat padi kyoki usme evenlistener laga hua hai jiski bajah se js turant exit kar jayengi agar promise nhi hua isliye eventlistener ko poora chalane ke liye uske end me promise resolve kara hai
// displayalbums bale function me hame promise return nhi karna pada kyoki usme fetch ,text(),.json() ye sab ho rahe the jo ki khud apne aap promise return karte hai completion par to isme js ko rukna hi padta hai hence doesnt need extra promise



//Problem:- untill the user click on the card nothing will be displayed in the your library since js is stuck at await folder whose promise will be resolved until the user click a card  --solved 