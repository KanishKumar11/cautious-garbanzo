"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";

const Transcription = () => {
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioUrlRef = useRef("");

  const startRecording = async () => {
    try {
      audioStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(audioStreamRef.current);

      mediaRecorderRef.current.ondataavailable = async (e) => {
        const reader = new FileReader();
        reader.onload = async () => {
          const audioArrayBuffer = reader.result;
          const audioContext = new AudioContext();
          const audioBuffer = await audioContext.decodeAudioData(
            audioArrayBuffer
          );
          const audioSource = audioContext.createBufferSource();
          audioSource.buffer = audioBuffer;

          const recognition = new webkitSpeechRecognition(); // Initialize Web Speech API
          recognition.lang = "en-US"; // Set language (change if needed)
          recognition.interimResults = true; // Get interim results
          recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1];
            if (result.isFinal) {
              setTranscription(
                (prevTranscription) =>
                  prevTranscription + result[0].transcript + " "
              );
            }
          };
          recognition.start();
          audioSource.connect(audioContext.destination);
          audioSource.start();
        };
        reader.readAsArrayBuffer(e.data);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && audioStreamRef.current) {
      mediaRecorderRef.current.stop();
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playAudio = () => {
    if (audioUrlRef.current) {
      const audio = new Audio(audioUrlRef.current);
      audio.play();
    }
  };

  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl flex items-center justify-start flex-col h-full">
      <div
        className={`absolute h-4 w-4 right-4 top-4 ${
          recording ? "bg-green-400" : "bg-red-600"
        } rounded-full`}
      />
      <h2 className="text-2xl font-bold text-center my-4">Transcription</h2>
      <Button onClick={toggleRecording}>{recording ? "Stop" : "Record"}</Button>
      {/* Play button */}
      <p>{recording ? "Recording..." : "Ready to record"}</p>
      <Textarea
        className="h-full"
        value={transcription}
        onChange={(e) => setTranscription(e.target.value)}
      ></Textarea>
    </div>
  );
};

export default Transcription;
