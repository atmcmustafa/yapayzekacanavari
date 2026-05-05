import { useState } from "react";
import Layout from "../layout/Layout";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import erkek from "/img/erkek.png";
import robot from "/img/robot-dialog.png";

import NewGame from "../components/NewGame";
import PuzzleApp from "../components/PuzzleApp";
import GPTtest from "../components/GPTtest";

const RobotDialog = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showNextTopicButton, setShowNextTopicButton] = useState(false);

  const dialogues = [
    { audio: "/audio.m4a" },
    { audio: "/audio-new.mp3" },
    { audio: "/prompt.mp3" },
    { audio: "/yz.mp3" },
  ];

  const games = [NewGame, PuzzleApp, NewGame, GPTtest];

  const handleStartDialog = () => {
    setAudioPlaying(true);
    setShowAudioPlayer(true);
  };

  const handleAudioEnded = () => {
    setAudioPlaying(false);
    setShowGame(true);
    setShowAudioPlayer(false);
  };

  const handleGameComplete = () => {
    setShowGame(false);
    setShowNextTopicButton(true);
  };

  const handleNextTopic = () => {
    if (currentStep < dialogues.length - 1) {
      setCurrentStep(currentStep + 1);
      setAudioPlaying(true);
      setShowAudioPlayer(true);
      setShowNextTopicButton(false);
    }
  };

  const CurrentGame = games[currentStep];

  return (
    <Layout>
      <div className="mt-16 container mx-auto">
        {!showGame && (
          <div
            className={`flex gap-12 justify-center w-full ${
              showGame ? "mr-0" : "mr-36"
            }`}
          >
            <div className="h-[600px]">
              <img src={robot} className="h-full" alt="robot" />
            </div>
            <div className="h-[600px]">
              <img src={erkek} className="h-full" alt="erkek" />
            </div>
          </div>
        )}
        <div className="flex justify-center  mx-auto mt-12">
          {!audioPlaying &&
            !showPlayButton &&
            !showGame &&
            !showNextTopicButton && (
              <button
                onClick={handleStartDialog}
                className="h-10 w-full bg-blue-500 rounded text-white"
              >
                Başla
              </button>
            )}
          {showAudioPlayer && (
            <AudioPlayer
              src={dialogues[currentStep].audio}
              onEnded={handleAudioEnded}
              autoPlay={audioPlaying}
              showLoopControl={false}
              showJumpControls={true}
              customAdditionalControls={[]}
              customVolumeControls={[]}
              layout="horizontal"
              className="audio-player !bg-orange-600 !text-white"
            />
          )}
          {showGame && (
            <CurrentGame className="w-full" onComplete={handleGameComplete} />
          )}
          {showNextTopicButton && (
            <button
              onClick={handleNextTopic}
              className="h-10 w-full bg-green-500 rounded text-white"
            >
              Yeni Konuya Geç
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RobotDialog;
