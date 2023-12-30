const leagues_url="https://api-football-beta.p.rapidapi.com/leagues?country=";
const standings_url="https://api-football-beta.p.rapidapi.com/standings?season=2023&league=";
const playerstats_url="https://api-football-beta.p.rapidapi.com/players/topscorers?season=2023&league=";
const matches_url="https://api-football-beta.p.rapidapi.com/fixtures?date=";
const options={
    method:"GET",
    headers:{
        'X-RapidAPI-Key': 'b95a4219c8msh9b913764c776818p1b95d1jsn6b530f0e9e2a',
		'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
    }
};

let leagueSection=document.getElementById("leagues");
let leagueName=document.getElementById("league-name");
let matchBtn=document.getElementById("matchBtn");
let standingsBtn=document.getElementById("standingsBtn");
let statsBtn=document.getElementById("statsBtn");
let matchSection=document.getElementById("match-section");
let standingsSection=document.getElementById("standings-section");
let statSection=document.getElementById("stats-section");
let firstSection=document.getElementById("first-section");
let secondSection=document.getElementById("second-section");
let thirdSection=document.getElementById("third-section");
let date=document.getElementById("date");
let season=document.getElementById("season");
let searchDateBtn=document.getElementById("dateBtn");
let country=document.getElementById("country");
let searchLeagueBtn=document.getElementById("search-league-btn");
let leagueBoxes=document.querySelectorAll(".league-boxs");
let leagueId=1;
let statsRank=0;
let counter=0;

searchLeagueBtn.addEventListener("click",()=>{
    let countryLeague=country.value.toLowerCase();
    leagueSection.innerHTML="";
    leagueNames(countryLeague);
});

function selectedleagueIds(id){
    leagueId=id;
}


matchBtn.addEventListener("click",()=>{
    standingsSection.style.display="none";
    secondSection.style.display="none";
    statSection.style.display="none";
    thirdSection.style.display="none";
    firstSection.style.display="block";
    matchSection.style.display="block";
});

searchDateBtn.addEventListener("click",()=>{
    counter++;
    let selectedDate=date.value;
    let selectedSeason=season.value;
    let leagueIds=leagueId;
    standingsSection.style.display="none";
    secondSection.style.display="none";
    statSection.style.display="none";
    thirdSection.style.display="none";
    if(counter==1){
        matchDetails(selectedDate,selectedSeason,leagueIds);
    }else{
        matchSection.innerHTML="";
        matchDetails(selectedDate,selectedSeason,leagueIds);
    }
});

standingsBtn.addEventListener("click",()=>{
    matchSection.style.display="none";
    statSection.style.display="none";
    firstSection.style.display="none";
    thirdSection.style.display="none";
    secondSection.style.display="block";
    standingsSection.style.display="block";
    let leagueIds=leagueId;
    standingsSection.innerHTML="";
    liveStandings(leagueIds);
});

statsBtn.addEventListener("click",()=>{
    matchSection.style.display="none";
    secondSection.style.display="none";
    firstSection.style.display="none";
    standingsSection.style.display="none";
    thirdSection.style.display="block";
    statSection.style.display="block";
    let leagueIds=leagueId;
    statSection.innerHTML="";
    statsRank=0;
    playerStats(leagueIds);
});

async function leagueNames(country){
    const leagues=await fetch(leagues_url+country,options);
    var leagueData=await leagues.json();
    leagueData.response.forEach((leaguesData)=>{
        let leagueBox=document.createElement("div");
        leagueBox.classList.add('w-32', 'h-32', 'bg-white', 'rounded-full', 'ease-in-out', 'flex', 'items-center', 'justify-center', 'cursor-pointer', 'shadow-lg', 'shadow-gray-400', 'hover:border','border-blue-400', 'max-lg:w-28', 'max-lg:h-28','overflow-hidden');
        let leagueImg=document.createElement("img");
        leagueImg.classList.add('w-16', 'object-center', 'object-cover','new-league-boxs');
        leagueImg.src=leaguesData.league.logo;
        leagueImg.id=leaguesData.league.id;
        leagueBox.appendChild(leagueImg);
        leagueSection.appendChild(leagueBox);
        leagueBox.addEventListener("click",(e)=>{
            let newSelectedLeagueId=e.target.id;
            selectedleagueIds(newSelectedLeagueId);;
        })
    });
    
}

leagueBoxes.forEach((leagueBox)=>{
    leagueBox.addEventListener("click",(e)=>{
        e.target.classList.add('league-selected');
        let selectedLeagueId=e.target.id;
        selectedleagueIds(selectedLeagueId);
        leagueBoxes.forEach((otherLeagueBoxes)=>{
            if(otherLeagueBoxes!==leagueBox){
                otherLeagueBoxes.classList.remove('league-selected');
            }
        });
    });
});

async function liveStandings(leagueId){
    const response=await fetch(standings_url+leagueId,options);
    var data=await response.json();
    leagueName.innerHTML=data.response[0].league.name;
    data.response[0].league.standings[0].forEach(element => {
        let clubsStands=document.createElement("div");
        clubsStands.classList.add('w-full','h-11','flex','items-center','justify-between','p-2','border-b-2','border-gray-300');
        standingsSection.appendChild(clubsStands);
        let leftSection=document.createElement("div");
        let rightSection=document.createElement("div");
        leftSection.classList.add('w-1/2','p-0.5','flex','gap-2');
        rightSection.classList.add('w-1/2','p-0.5','flex','gap-3','items-center','justify-end','max-[555px]:gap-3');
        let rank=document.createElement("p");
        let clubLogo=document.createElement("img");
        let clubName=document.createElement("h4");
        rank.classList.add('font-nb', 'font-semibold', 'text-lg','max-[555px]:text-sm');
        rank.innerHTML=element.rank;
        clubLogo.classList.add('w-8','object-cover');
        clubLogo.src=element.team.logo;
        clubName.classList.add('font-nb', 'font-semibold', 'text-lg','max-[555px]:text-sm');
        clubName.innerHTML=element.team.name;
        leftSection.appendChild(rank);
        leftSection.appendChild(clubLogo);
        leftSection.appendChild(clubName);
        let matchesPlayed=document.createElement("p");
        let won=document.createElement("p");
        let draw=document.createElement("p");
        let lose=document.createElement("p");
        let gf=document.createElement("p");
        let ga=document.createElement("p");
        let gd=document.createElement("p");
        let points=document.createElement("p");
        matchesPlayed.innerHTML=element.all.played;
        matchesPlayed.classList.add('font-nb', 'text-lg', 'font-semibold','text-center','max-[555px]:text-sm');
        won.innerHTML=element.all.win;
        won.classList.add('font-nb', 'text-lg', 'font-semibold','text-center','w-3','max-[555px]:text-sm');
        draw.innerHTML=element.all.draw;
        draw.classList.add('font-nb', 'text-lg', 'font-semibold','text-center','w-3','max-[555px]:text-sm');
        lose.innerHTML=element.all.lose;
        lose.classList.add('font-nb', 'text-lg', 'font-semibold','text-center','w-3','max-[555px]:text-sm');
        gf.innerHTML=element.all.goals.for;
        gf.classList.add('font-nb', 'text-lg', 'font-semibold','text-center','w-4','max-sm:hidden');
        ga.innerHTML=element.all.goals.against;
        ga.classList.add('font-nb', 'text-lg', 'font-semibold','text-center','w-4','max-sm:hidden');
        gd.innerHTML=element.goalsDiff;
        gd.classList.add('font-nb', 'text-lg', 'font-semibold','text-center','w-4','max-sm:hidden');
        points.innerHTML=element.points;
        points.classList.add('font-nb', 'text-lg', 'font-semibold','text-center','w-3','max-[555px]:text-sm');
        rightSection.appendChild(matchesPlayed);
        rightSection.appendChild(won);
        rightSection.appendChild(draw);
        rightSection.appendChild(lose);
        rightSection.appendChild(gf);
        rightSection.appendChild(ga);
        rightSection.appendChild(gd);
        rightSection.appendChild(points);
        clubsStands.appendChild(leftSection);
        clubsStands.appendChild(rightSection);
    });
}

async function playerStats(leagueId){
    const playerResponse=await fetch(playerstats_url+leagueId,options);
    var playerData=await playerResponse.json();
    leagueName.innerHTML=playerData.response[0].statistics[0].league.name;
    playerData.response.forEach((stats)=>{
        let playerStatDetails=document.createElement("div");
        playerStatDetails.classList.add('w-full', 'h-9', 'flex', 'items-center', 'justify-between', 'p-2', 'border-b-2', 'border-gray-300');
        let statsLeftSection=document.createElement("div");
        let playerRank=document.createElement("p");
        let playerImg=document.createElement("img");
        let playerName=document.createElement("p");
        statsLeftSection.classList.add('w-60', 'h-9', 'flex', 'gap-3', 'items-center');
        playerRank.classList.add('font-nb', 'font-semibold', 'text-lg', 'ml-4');
        playerImg.classList.add('w-7','object-cover','object-center');
        playerName.classList.add('font-nb', 'font-semibold', 'text-lg','max-sm:text-sm');
        playerRank.innerHTML=statsRank+1;
        playerImg.src=stats.player.photo;
        playerName.innerHTML=stats.player.name;
        statsLeftSection.appendChild(playerRank);
        statsLeftSection.appendChild(playerImg);
        statsLeftSection.appendChild(playerName);
        let goals=document.createElement("p");
        goals.classList.add('font-nb', 'font-medium', 'text-lg' ,'mr-5');
        goals.innerHTML=stats.statistics[0].goals.total;
        playerStatDetails.appendChild(statsLeftSection);
        playerStatDetails.appendChild(goals);
        statSection.appendChild(playerStatDetails);
        statsRank++;
    });
}

async function matchDetails(date,season,id){
    const matches=await fetch(matches_url+date+`&season=${season}`+`&league=${id}`,options);
    var matchData=await matches.json();
    leagueName.innerHTML=matchData.response[0].league.name;
    matchData.response.forEach((matchesData)=>{
        let mathcDetailsSection=document.createElement("div");
        mathcDetailsSection.classList.add('w-full', 'h-40', 'flex', 'items-center', 'justify-evenly', 'p-2', 'border-b-2', 'border-gray-300', 'relative');
        let time=document.createElement("p");
        time.classList.add('absolute', 'top-1', 'left-3', 'font-nb', 'text-lg');
        time.innerHTML=matchesData.fixture.date;
        let homeTeamDetails=document.createElement("div");
        let homeTeamlogo=document.createElement("img");
        let homeTeamName=document.createElement("h3");
        homeTeamDetails.classList.add('w-24', 'h-24', 'flex', 'flex-col', 'items-center','justify-center', 'gap-2','mt-4');
        homeTeamlogo.classList.add('w-16', 'object-cover', 'max-[555px]:w-12');
        homeTeamName.classList.add('font-nb', 'font-semibold', 'text-xl', 'max-[555px]:text-lg','text-center');
        homeTeamlogo.src=matchesData.teams.home.logo;
        homeTeamName.innerHTML=matchesData.teams.home.name;
        homeTeamDetails.appendChild(homeTeamlogo);
        homeTeamDetails.appendChild(homeTeamName);
        let scoreCardSection=document.createElement("div");
        scoreCardSection.classList.add('w-28', 'h-16', 'flex', 'items-center', 'justify-center', 'gap-3');
        let homeTeamScore=document.createElement("p");
        let vs=document.createElement("p");
        let awayTeamScore=document.createElement("p");
        homeTeamScore.classList.add('font-nb', 'font-medium', 'text-xl', 'max-[555px]:text-lg');
        vs.classList.add('font-nb', 'font-medium', 'text-xl', 'max-[555px]:text-lg');
        awayTeamScore.classList.add('font-nb', 'font-medium', 'text-xl', 'max-[555px]:text-lg'); 
        homeTeamScore.innerHTML=matchesData.goals.home;
        awayTeamScore.innerHTML=matchesData.goals.away;
        vs.innerHTML="VS";
        scoreCardSection.appendChild(homeTeamScore);
        scoreCardSection.appendChild(vs);   
        scoreCardSection.appendChild(awayTeamScore);   
        let awayTeamDetails=document.createElement("div");
        let awayTeamlogo=document.createElement("img");
        let awayTeamName=document.createElement("h3");
        awayTeamDetails.classList.add('w-24', 'h-24', 'flex', 'flex-col', 'items-center','justify-center', 'gap-2','mt-4');
        awayTeamlogo.classList.add('w-16', 'object-cover', 'max-[555px]:w-12');
        awayTeamName.classList.add('font-nb', 'font-semibold', 'text-xl', 'max-[555px]:text-lg','text-center');
        awayTeamlogo.src=matchesData.teams.away.logo;
        awayTeamName.innerHTML=matchesData.teams.away.name;
        awayTeamDetails.appendChild(awayTeamlogo);
        awayTeamDetails.appendChild(awayTeamName);
        mathcDetailsSection.appendChild(time);
        mathcDetailsSection.appendChild(homeTeamDetails);
        mathcDetailsSection.appendChild(scoreCardSection);
        mathcDetailsSection.appendChild(awayTeamDetails);
        matchSection.appendChild(mathcDetailsSection);
    });
    
}
