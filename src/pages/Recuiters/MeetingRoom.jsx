import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, Settings, Users, 
  MessageSquare, ScreenShare, Share2, Send, X, Shield, 
  Info, Clock, Calendar, User as UserIcon, Smile, Loader2, Sparkles
} from 'lucide-react';
import { io } from 'socket.io-client';
import { toast, Toaster } from 'sonner';
import { useAuth } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';

// ICE Servers Configuration
const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ]
};

const MeetingRoom = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  
  // State
  const [isInLobby, setIsInLobby] = useState(true);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState('On Hold');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [newInterviewDate, setNewInterviewDate] = useState('');
  const [newInterviewTime, setNewInterviewTime] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  // Refs for WebRTC
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const peerConnections = useRef({}); // { socketId: RTCPeerConnection }
  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef({}); // { socketId: videoElement }
  const chatEndRef = useRef(null);

  // Get User Info
  useEffect(() => {
    if (user) {
      const name = user.Fullname || user.companyName || 'Recruiter';
      setUserName(name);
      setUserId(user._id || 'unknown');
    }
  }, [user]);

  // Fetch Meeting Details
  useEffect(() => {
    const fetchMeetingInfo = async () => {
      if (!token) return;
      try {
        const response = await fetch(`http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/get-meeting/${roomCode}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success) {
          setMeetingDetails(result.data);
        }
      } catch (error) {
        console.error('Error fetching meeting info:', error);
      }
    };
    fetchMeetingInfo();
  }, [roomCode, token]);

  // Media Setup
  useEffect(() => {
    const startMedia = async () => {
      try {
        if (!localStreamRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          localStreamRef.current = stream;
        }
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast.error('Could not access camera or microphone');
      }
    };

    startMedia();

    return () => {
      // Only stop tracks when the whole component unmounts
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Update video ref whenever isInLobby or stream changes
  useEffect(() => {
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  }, [isInLobby]);

  // Scroll Chat to Bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  // Initialize WebRTC and Socket
  const startCall = async () => {
    setIsInLobby(false);
    
    // Connect Socket
    socketRef.current = io('http://localhost:4518');

    socketRef.current.on('connect', () => {
      console.log('Socket connected');
      socketRef.current.emit('join-room', { roomId: roomCode, userId, userName });
    });

    // Handle Socket Events
    socketRef.current.on('room-participants', async (existingParticipants) => {
      console.log('Existing participants:', existingParticipants);
      setParticipants(existingParticipants);
      
      // Update labels for existing participants
      existingParticipants.forEach(p => {
        const label = document.getElementById(`label-${p.socketId}`);
        if (label) label.innerText = p.userName;
      });
      
      for (const participant of existingParticipants) {
        const pc = createPeerConnection(participant.socketId);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socketRef.current.emit('offer', { roomId: roomCode, offer, targetSocketId: participant.socketId });
      }
    });

    socketRef.current.on('user-joined', ({ socketId, userId, userName }) => {
      toast.success(`${userName} joined the meeting`);
      setParticipants(prev => [...prev, { socketId, userId, userName }]);
      
      // Update label if video already exists
      const label = document.getElementById(`label-${socketId}`);
      if (label) label.innerText = userName;
    });

    socketRef.current.on('offer', async ({ offer, fromSocketId }) => {
      const pc = createPeerConnection(fromSocketId);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socketRef.current.emit('answer', { roomId: roomCode, answer, targetSocketId: fromSocketId });
    });

    socketRef.current.on('answer', async ({ answer, fromSocketId }) => {
      const pc = peerConnections.current[fromSocketId];
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socketRef.current.on('ice-candidate', async ({ candidate, fromSocketId }) => {
      const pc = peerConnections.current[fromSocketId];
      if (pc) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socketRef.current.on('chat-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socketRef.current.on('user-left', (socketId) => {
      const p = participants.find(part => part.socketId === socketId);
      if (p) toast.info(`${p.userName} left the meeting`);
      
      if (peerConnections.current[socketId]) {
        peerConnections.current[socketId].close();
        delete peerConnections.current[socketId];
      }
      setParticipants(prev => prev.filter(part => part.socketId !== socketId));
      
      // Remove remote video wrapper
      const wrapper = document.getElementById(`wrapper-${socketId}`);
      if (wrapper) wrapper.remove();
    });

    socketRef.current.on('media-state-changed', ({ socketId, isAudioMuted, isVideoOff }) => {
      // Logic to update participant UI if needed
    });
  };

  const createPeerConnection = (targetSocketId) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    peerConnections.current[targetSocketId] = pc;

    // Add local tracks to peer connection
    localStreamRef.current.getTracks().forEach(track => {
      pc.addTrack(track, localStreamRef.current);
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('ice-candidate', { roomId: roomCode, candidate: event.candidate, targetSocketId });
      }
    };

    pc.ontrack = (event) => {
      console.log('Received remote track');
      let videoEl = document.getElementById(`video-${targetSocketId}`);
      if (!videoEl) {
        const container = document.getElementById('remote-videos-container');
        if (container) {
          const wrapper = document.createElement('div');
          wrapper.className = "relative rounded-2xl overflow-hidden bg-[#202124] border border-white/5 shadow-lg group aspect-video";
          wrapper.id = `wrapper-${targetSocketId}`;
          
          videoEl = document.createElement('video');
          videoEl.id = `video-${targetSocketId}`;
          videoEl.autoplay = true;
          videoEl.playsInline = true;
          videoEl.className = "w-full h-full object-cover rounded-2xl";
          
          const label = document.createElement('div');
          label.className = "absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-xs font-medium text-white/90";
          label.id = `label-${targetSocketId}`;
          label.innerText = 'Remote User';
          
          wrapper.appendChild(videoEl);
          wrapper.appendChild(label);
          container.appendChild(wrapper);
        }
      }
      if (videoEl) videoEl.srcObject = event.streams[0];
    };

    return pc;
  };

  // Media Controls
  const toggleMic = () => {
    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
      socketRef.current?.emit('media-state', { roomId: roomCode, isAudioMuted: !audioTrack.enabled, isVideoOff: !isVideoOn });
      toast.info(audioTrack.enabled ? 'Microphone Unmuted' : 'Microphone Muted');
    }
  };

  const toggleCamera = () => {
    const videoTrack = localStreamRef.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);
      socketRef.current?.emit('media-state', { roomId: roomCode, isAudioMuted: !isMicOn, isVideoOff: !videoTrack.enabled });
      toast.info(videoTrack.enabled ? 'Camera Turned On' : 'Camera Turned Off');
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStreamRef.current = screenStream;
        const videoTrack = screenStream.getVideoTracks()[0];

        // Replace track in all peer connections
        for (const socketId in peerConnections.current) {
          const pc = peerConnections.current[socketId];
          const sender = pc.getSenders().find(s => s.track.kind === 'video');
          if (sender) sender.replaceTrack(videoTrack);
        }

        videoTrack.onended = () => stopScreenShare();
        
        if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;
        setIsScreenSharing(true);
        toast.success('Screen sharing started');
      } else {
        stopScreenShare();
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
      toast.error('Failed to share screen');
    }
  };

  const stopScreenShare = () => {
    const videoTrack = localStreamRef.current.getVideoTracks()[0];
    for (const socketId in peerConnections.current) {
      const pc = peerConnections.current[socketId];
      const sender = pc.getSenders().find(s => s.track.kind === 'video');
      if (sender) sender.replaceTrack(videoTrack);
    }
    screenStreamRef.current?.getTracks().forEach(track => track.stop());
    if (localVideoRef.current) localVideoRef.current.srcObject = localStreamRef.current;
    setIsScreenSharing(false);
    toast.info('Screen sharing stopped');
  };

  // Chat
  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    socketRef.current.emit('chat-message', { roomId: roomCode, message: newMessage, userName });
    setNewMessage('');
  };

  // End Call
  const handleEndCall = async () => {
    try {
      // Cleanup
      localStreamRef.current?.getTracks().forEach(track => track.stop());
      screenStreamRef.current?.getTracks().forEach(track => track.stop());
      Object.values(peerConnections.current).forEach(pc => pc.close());
      socketRef.current?.disconnect();

      const rawRole = user?.role || user?.Role || "";
      const roleStr = (Array.isArray(rawRole) ? rawRole[0] : rawRole || "").toLowerCase();

      if (roleStr === 'recruiter') {
        setShowFeedbackModal(true);
      } else {
        toast.success('Meeting ended successfully');
        navigate('/user-home');
      }
    } catch (error) {
      console.error('Error ending call:', error);
      navigate('/user-home');
    }
  };

  const submitFeedback = async () => {
    if (!token || !meetingDetails?._id) return;
    
    if (feedbackStatus === "Next Round" && (!newInterviewDate || !newInterviewTime)) {
      toast.error("Please provide a date and time for the next round");
      return;
    }

    setIsSubmittingFeedback(true);
    try {
      // Logic for status and date/time
      let finalStatus = meetingDetails.status;
      let finalDate = meetingDetails.interviewDate;
      let finalTime = meetingDetails.interviewTime;

      if (feedbackStatus === "Selected" || feedbackStatus === "Rejected") {
        finalStatus = "Completed";
      } else if (feedbackStatus === "Next Round") {
        finalStatus = "Scheduled";
        finalDate = newInterviewDate;
        finalTime = newInterviewTime;
      }

      const updateData = {
        jobId: meetingDetails.jobId?._id || meetingDetails.jobId,
        candidateId: meetingDetails.candidateId?._id || meetingDetails.candidateId,
        applicationId: meetingDetails.applicationId?._id || meetingDetails.applicationId,
        interviewTitle: meetingDetails.interviewTitle,
        interviewType: meetingDetails.interviewType,
        meetingPlatform: meetingDetails.meetingPlatform,
        meetingLink: meetingDetails.meetingLink,
        interviewDate: finalDate,
        interviewTime: finalTime,
        duration: meetingDetails.duration,
        notes: feedbackNotes || meetingDetails.notes,
        status: finalStatus,
        result: feedbackStatus
      };

      const response = await fetch(`http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/update-meeting/${meetingDetails._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Feedback submitted successfully');
        navigate('/recruiter-home');
      } else {
        toast.error(result.message || 'Failed to update meeting status');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('An error occurred while submitting feedback');
    } finally {
      setIsSubmittingFeedback(false);
      setShowFeedbackModal(false);
    }
  };

  if (isInLobby) {
    return (
      <div className="min-h-screen bg-[#1A1C1E] text-white font-sans flex flex-col items-center justify-center p-6">
        <Toaster position="top-center" richColors />
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Video Preview */}
          <div className="space-y-6">
            <div className="relative aspect-video bg-[#202124] rounded-2xl border border-white/5 shadow-2xl overflow-hidden group">
              <video 
                ref={localVideoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover scale-x-[-1]"
              />
              {!isVideoOn && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#202124]">
                  <div className="w-24 h-24 rounded-full bg-[#3C4043] flex items-center justify-center mb-4">
                    <UserIcon className="w-12 h-12 text-[#BDC1C6]" />
                  </div>
                  <p className="text-[#BDC1C6] text-sm font-medium">Camera is off</p>
                </div>
              )}
              
              {/* Controls Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button 
                  onClick={toggleMic}
                  className={`p-3 rounded-full transition-all border ${isMicOn ? 'bg-[#3C4043]/80 hover:bg-[#434649] border-white/10' : 'bg-[#EA4335] border-[#EA4335]'}`}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <button 
                  onClick={toggleCamera}
                  className={`p-3 rounded-full transition-all border ${isVideoOn ? 'bg-[#3C4043]/80 hover:bg-[#434649] border-white/10' : 'bg-[#EA4335] border-[#EA4335]'}`}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-center text-[#BDC1C6]">
              <Settings className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-widest">Check your audio and video</span>
            </div>
          </div>

          {/* Right: Meeting Info */}
          <div className="space-y-8 max-w-md mx-auto w-full">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-normal text-white mb-2">Ready to join?</h1>
              <p className="text-[#BDC1C6] text-sm">
                {participants.length === 0 
                  ? "No one else is here yet" 
                  : `${participants.length} participant${participants.length > 1 ? 's' : ''} in the call`}
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#BDC1C6] ml-1">Your name</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg focus:outline-none focus:border-[#8AB4F8] transition-all text-white placeholder:text-white/20"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={startCall}
                  className="w-full py-3 bg-[#8AB4F8] hover:bg-[#AECBFA] text-[#202124] rounded-full text-sm font-medium transition-all shadow-lg"
                >
                  Join now
                </button>
                <button 
                  onClick={() => navigate('/recruiter-interviews')}
                  className="w-full py-3 bg-transparent hover:bg-white/5 text-[#8AB4F8] rounded-full text-sm font-medium transition-all border border-white/10"
                >
                  Go back
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 text-[#BDC1C6]">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-medium uppercase tracking-[0.1em]">Safe and secure connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1C1E] text-white font-sans flex flex-col overflow-hidden">
      <Toaster position="top-center" richColors />
      
      {!showFeedbackModal ? (
        <>
          {/* Header */}
          <header className="h-16 px-6 flex items-center justify-between relative z-20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border-r border-white/10 pr-4">
                <h2 className="text-sm font-medium text-white/90">{meetingDetails?.interviewTitle || "Technical Interview"}</h2>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/5 rounded-full transition-all text-white/70 hover:text-white">
                <Info className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                  {participants.length + 1}
                </span>
              </div>
            </div>
          </header>

          {/* Main Grid */}
          <main className="flex-1 relative flex overflow-hidden px-4 pb-4">
            <div className="flex-1 flex flex-col gap-4 relative overflow-hidden">
              {/* Video Grid */}
              <div 
                id="video-grid" 
                className={`grid gap-4 flex-1 transition-all duration-500 ${
                  participants.length === 0 ? 'grid-cols-1 place-items-center' : 
                  participants.length === 1 ? 'grid-cols-1 md:grid-cols-2' : 
                  'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {/* Local Video Container */}
                <div className={`relative rounded-2xl overflow-hidden bg-[#202124] border border-white/5 shadow-lg group w-full ${participants.length === 0 ? 'max-w-[80%] aspect-video' : 'h-full'}`}>
                  <video 
                    ref={localVideoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`w-full h-full object-cover rounded-2xl ${isScreenSharing ? '' : 'scale-x-[-1]'}`}
                  />
                  
                  {!isVideoOn && !isScreenSharing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#202124]">
                      <div className="w-20 h-20 rounded-full bg-[#3C4043] flex items-center justify-center mb-3">
                        <UserIcon className="w-10 h-10 text-[#BDC1C6]" />
                      </div>
                      <p className="text-[#BDC1C6] text-sm font-medium">You</p>
                    </div>
                  )}
                  
                  {/* Name Tag */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-xs font-medium text-white/90">
                    {userName} (You)
                  </div>
                  
                  {/* Muted Indicator */}
                  {isMicOn === false && (
                    <div className="absolute top-4 right-4 p-1.5 bg-[#EA4335] rounded-full shadow-lg">
                      <MicOff className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Remote Videos Container */}
                <div id="remote-videos-container" className="contents" />
              </div>
            </div>

            {/* Chat Panel */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.aside 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 360, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="ml-4 bg-white rounded-2xl flex flex-col text-[#202124] shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">In-call messages</h3>
                    <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  
                  <div className="p-4 bg-gray-50 text-[11px] text-gray-500 leading-relaxed">
                    Messages can only be seen by people in the call and are deleted when the call ends.
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar-light">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                        <p className="text-xs font-medium">No messages yet</p>
                      </div>
                    ) : (
                      messages.map((msg, idx) => (
                        <div key={idx} className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-700">{msg.userName}</span>
                            <span className="text-[10px] text-gray-400">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="text-sm text-gray-600 break-words leading-snug">
                            {msg.message}
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <form onSubmit={sendMessage} className="p-4 border-t border-gray-100">
                    <div className="relative flex items-center gap-2">
                      <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Send a message to everyone"
                        className="flex-1 px-4 py-3 bg-gray-100 border-none rounded-full focus:ring-0 text-sm placeholder:text-gray-500"
                      />
                      <button type="submit" className="p-2 text-[#1a73e8] hover:bg-blue-50 rounded-full transition-all">
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </motion.aside>
              )}
            </AnimatePresence>
          </main>

          {/* Control Bar - Google Meet Style */}
          <footer className="h-20 bg-[#1A1C1E] px-6 relative z-20 flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-[200px]">
              <div className="text-sm font-medium text-white/90">
                {roomCode}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMic}
                className={`p-3.5 rounded-full transition-all ${isMicOn ? 'bg-[#3C4043] hover:bg-[#434649] text-white' : 'bg-[#EA4335] text-white hover:bg-[#D93025]'}`}
                title={isMicOn ? "Turn off microphone" : "Turn on microphone"}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={toggleCamera}
                className={`p-3.5 rounded-full transition-all ${isVideoOn ? 'bg-[#3C4043] hover:bg-[#434649] text-white' : 'bg-[#EA4335] text-white hover:bg-[#D93025]'}`}
                title={isVideoOn ? "Turn off camera" : "Turn on camera"}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button 
                onClick={toggleScreenShare}
                className={`p-3.5 rounded-full transition-all ${isScreenSharing ? 'bg-[#8AB4F8] text-[#202124]' : 'bg-[#3C4043] hover:bg-[#434649] text-white'}`}
                title={isScreenSharing ? "Stop presenting" : "Present now"}
              >
                <ScreenShare className="w-5 h-5" />
              </button>

              <button className="p-3.5 rounded-full bg-[#3C4043] hover:bg-[#434649] text-white transition-all">
                <Smile className="w-5 h-5" />
              </button>

              <button 
                onClick={handleEndCall}
                className="p-3.5 px-6 rounded-full bg-[#EA4335] text-white hover:bg-[#D93025] transition-all flex items-center gap-2 ml-4"
                title="Leave call"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 min-w-[200px] justify-end">
              <button 
                onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
                className={`p-2.5 rounded-full transition-all ${isParticipantsOpen ? 'bg-[#8AB4F8]/10 text-[#8AB4F8]' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
              >
                <Users className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`p-2.5 rounded-full transition-all ${isChatOpen ? 'bg-[#8AB4F8]/10 text-[#8AB4F8]' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-full transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </footer>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden text-slate-900"
            >
              <div className="p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">Meeting Feedback</h2>
                    <p className="text-slate-500 text-sm font-medium">How was the candidate's performance?</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Status Selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Meeting Status</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Selected", "Rejected", "On Hold", "Next Round"].map((status) => (
                        <button
                          key={status}
                          onClick={() => setFeedbackStatus(status)}
                          className={`px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${
                            feedbackStatus === status 
                              ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-500/20' 
                              : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-teal-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Conditional Next Round Inputs */}
                  {feedbackStatus === "Next Round" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Next Date</label>
                        <input
                          type="date"
                          value={newInterviewDate}
                          onChange={(e) => setNewInterviewDate(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Next Time</label>
                        <input
                          type="time"
                          value={newInterviewTime}
                          onChange={(e) => setNewInterviewTime(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium text-sm"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Notes */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes & Feedback</label>
                    <textarea
                      value={feedbackNotes}
                      onChange={(e) => setFeedbackNotes(e.target.value)}
                      placeholder="Add any additional notes about the candidate..."
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium text-sm min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      onClick={() => navigate('/recruiter-home')}
                      className="flex-1 py-4 text-slate-500 font-black uppercase tracking-widest text-xs hover:text-slate-900 transition-all"
                    >
                      Skip for now
                    </button>
                    <button
                      onClick={submitFeedback}
                      disabled={isSubmittingFeedback}
                      className="flex-1 py-4 bg-teal-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmittingFeedback && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isSubmittingFeedback ? 'Submitting...' : 'Save Feedback'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar-light::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-light::-webkit-scrollbar-thumb {
          background: #e0e0e0;
          border-radius: 10px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-thumb:hover {
          background: #bdbdbd;
        }
      `}} />
    </div>
  );
};

export default MeetingRoom;
