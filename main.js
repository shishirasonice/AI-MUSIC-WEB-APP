song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;    
scoreleftwrist = 0;
song_name = "";

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
}

function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftwrist);

        leftWristX = results[0].pose.leftWristX.x;
        leftWristY = results[0].pose.leftWristY.y;

        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWristX.x;
        rightWristY = results[0].pose.rightWristY.y;
         
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}