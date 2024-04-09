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

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("audio", blob);

        try {
          toast.loading("Processing...");
          const backend = process.env.NEXT_PUBLIC_API_URL;
          const response = await axios.post(
            `${backend}/transcription`,
            formData,
            {
              "Content-Type": "multipart/form-data",
            }
          );
          console.log(response);
          // setTranscription(response?.data?.transcription);
          toast.dismiss();
          toast.success("Submitted");
          audioUrlRef.current = data.audioUrl; // Save the audio URL
        } catch (error) {
          toast.dismiss();
          toast.error("An error occurred, try again");
          console.error("Error:", error);
        }
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
