song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;    
scoreleftwrist = 0;
scorerightwrist = 0;
song_name = "";
song_1 = "";
song_2 = "";

function preload(){
    song1 = loadSound("hedwigs-theme-song.mp3");
    song2 = loadSound("My-Heart-Will-Go-On.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center;

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);

}

function modelLoaded(){
    console.log('poseNet is initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF00000");
    stroke("#FF0000");

    song_name = song1.isPlaying();
    console.log(song_name)
     
    if(scoreleftwrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2 == false){
            song2.play();
        }
        else{
            console.log("Song Name: My Heart Will Go On");
            document.getElementById("song-name").innerHTML = "Song Name: My Heart Will Go On";
        }
    }

    if(scorerightwrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1 == false){
            song1.play();
        }
        else{
            console.log("Song Name: Hedwigs Theme Song");
            document.getElementById("song-name").innerHTML = "Song Name: Hedwigs Theme Song";
        }
    }

}

function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftwrist);

        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log(scorerightwrist);

        leftWristX = results[0].pose.leftWristX.x;
        leftWristY = results[0].pose.leftWristY.y;

        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWristX.x;
        rightWristY = results[0].pose.rightWristY.y;
         
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}