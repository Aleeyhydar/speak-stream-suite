import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Play, Pause, Volume2, Mic, Crown, AlertCircle, Settings, Music, AudioWaveform, FileAudio, Zap, Sparkles, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "@/components/AuthDialog";

const Convert = () => {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState("aria");
  const [speed, setSpeed] = useState([1]);
  const [pitch, setPitch] = useState([0]);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  // Pro features state
  const [audioFormat, setAudioFormat] = useState("mp3");
  const [bitrate, setBitrate] = useState([128]);
  const [sampleRate, setSampleRate] = useState("22050");
  const [emotion, setEmotion] = useState("neutral");
  const [backgroundMusic, setBackgroundMusic] = useState("none");
  const [ssmlEnabled, setSsmlEnabled] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Usage tracking - in real app this would come from backend
  const [usedCharacters, setUsedCharacters] = useState(0);
  const CHARACTER_LIMIT = 3000; // Free users limit
  
  // User plan detection - in real app this would come from user profile
  const getUserPlan = (): "guest" | "free" | "pro" | "business" => {
    if (!user) return "guest";
    // For demo purposes, let's simulate a free plan for logged users
    // In real app, this would come from user's subscription data
    return "free";
  };
  
  const userPlan = getUserPlan();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to convert.",
        variant: "destructive",
      });
      return;
    }

    // Check character limit for free/guest users
    if (userPlan !== "pro" && userPlan !== "business") {
      if (usedCharacters + text.length > CHARACTER_LIMIT) {
        toast({
          title: "Character Limit Reached",
          description: `You've reached the ${CHARACTER_LIMIT.toLocaleString()} character limit. Upgrade to Pro for unlimited usage.`,
          variant: "destructive",
        });
        setShowAuthDialog(true);
        return;
      }
    }

    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update used characters for free users
    if (userPlan !== "pro" && userPlan !== "business") {
      setUsedCharacters(prev => prev + text.length);
    }
    
    setIsGenerating(false);
    
    toast({
      title: "Audio Generated!",
      description: "Your text has been converted to speech successfully.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your audio file is being downloaded.",
    });
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Available voices based on plan
  const availableVoices = userPlan === "free" || userPlan === "guest" 
    ? [{ id: "aria", name: "Aria", accent: "US Female" }]
    : [
        { id: "aria", name: "Aria", accent: "US Female" },
        { id: "sarah", name: "Sarah", accent: "UK Female" },
        { id: "roger", name: "Roger", accent: "US Male" },
        { id: "liam", name: "Liam", accent: "AU Male" },
      ];

  const remainingCharacters = userPlan === "pro" || userPlan === "business" 
    ? "Unlimited" 
    : CHARACTER_LIMIT - usedCharacters;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Voice Converter
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Transform your text into lifelike speech or convert audio to text with our advanced AI technology.
          </p>
          
          {/* Usage indicator for free/guest users */}
          {(userPlan === "free" || userPlan === "guest") && (
            <Card className="card-premium max-w-md mx-auto mt-6">
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Character Usage</span>
                  <Badge variant="secondary">{userPlan === "guest" ? "Guest" : "Free"}</Badge>
                </div>
                <div className="bg-muted rounded-full h-2 mb-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${(usedCharacters / CHARACTER_LIMIT) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{usedCharacters.toLocaleString()} / {CHARACTER_LIMIT.toLocaleString()} used</span>
                  {!user && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowAuthDialog(true)}
                      className="text-xs p-1 h-auto"
                    >
                      Sign up for more
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="text-to-speech" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="text-to-speech" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Text to Speech
            </TabsTrigger>
            <TabsTrigger value="speech-to-text" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Speech to Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text-to-speech">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Text Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Textarea
                    placeholder={`Enter your text here... (${
                      userPlan === "pro" || userPlan === "business" 
                        ? "unlimited characters" 
                        : `up to ${CHARACTER_LIMIT.toLocaleString()} characters`
                    })`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={10}
                    className="resize-none"
                    maxLength={userPlan === "pro" || userPlan === "business" ? undefined : CHARACTER_LIMIT}
                  />
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-muted-foreground">
                      {text.length}/{userPlan === "pro" || userPlan === "business" ? "∞" : CHARACTER_LIMIT.toLocaleString()} characters
                    </div>
                    {(userPlan === "free" || userPlan === "guest") && (
                      <div className="text-muted-foreground">
                        Remaining: {typeof remainingCharacters === "number" ? remainingCharacters.toLocaleString() : remainingCharacters}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium">Voice Selection</Label>
                        {(userPlan === "free" || userPlan === "guest") && (
                          <Badge variant="outline" className="text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Limited Selection
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {availableVoices.map((voiceOption) => (
                          <button
                            key={voiceOption.id}
                            onClick={() => setVoice(voiceOption.id)}
                            className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                              voice === voiceOption.id 
                                ? "border-primary bg-primary/10 text-primary" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                              <span className="text-pink-600 font-semibold text-sm">
                                {voiceOption.name.charAt(0)}
                              </span>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-xs">{voiceOption.name}</div>
                              <div className="text-xs text-muted-foreground">{voiceOption.accent}</div>
                            </div>
                          </button>
                        ))}
                        
                        {/* Show locked voices for free users */}
                        {(userPlan === "free" || userPlan === "guest") && (
                          <>
                            {[
                              { name: "Sarah", accent: "UK Female" },
                              { name: "Roger", accent: "US Male" },
                              { name: "Liam", accent: "AU Male" }
                            ].map((lockedVoice, index) => (
                              <button
                                key={index}
                                onClick={() => setShowAuthDialog(true)}
                                className="p-3 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-all flex flex-col items-center gap-2 opacity-60 relative"
                              >
                                <Crown className="h-4 w-4 absolute top-1 right-1 text-primary" />
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                  <span className="text-muted-foreground font-semibold text-sm">
                                    {lockedVoice.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium text-xs">{lockedVoice.name}</div>
                                  <div className="text-xs text-muted-foreground">{lockedVoice.accent}</div>
                                </div>
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                      
                      {(userPlan === "free" || userPlan === "guest") && (
                        <div className="mt-3 p-3 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground">
                            <Crown className="h-3 w-3 inline mr-1" />
                            Upgrade to Pro for access to 50+ premium voices, high-quality audio, and unlimited usage.
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Speed: {speed[0]}x</Label>
                      <Slider
                        value={speed}
                        onValueChange={setSpeed}
                        max={2}
                        min={0.5}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Pitch: {pitch[0] > 0 ? '+' : ''}{pitch[0]}</Label>
                      <Slider
                        value={pitch}
                        onValueChange={setPitch}
                        max={12}
                        min={-12}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    {/* Pro Features */}
                    {(userPlan === "pro" || userPlan === "business") && (
                      <>
                        <div className="border-t pt-4">
                          <div className="flex items-center gap-2 mb-4">
                            <Crown className="h-4 w-4 text-primary" />
                            <Label className="text-sm font-medium">Pro Features</Label>
                            <Badge variant="secondary" className="text-xs">Premium</Badge>
                          </div>
                          
                          <div className="space-y-4">
                            {/* Audio Format Selection */}
                            <div>
                              <Label className="text-sm font-medium mb-3 block">Audio Format</Label>
                              <div className="grid grid-cols-4 gap-2">
                                {[
                                  { id: "mp3", name: "MP3", icon: FileAudio },
                                  { id: "wav", name: "WAV", icon: AudioWaveform },
                                  { id: "flac", name: "FLAC", icon: Music },
                                  { id: "ogg", name: "OGG", icon: Volume2 }
                                ].map((format) => {
                                  const Icon = format.icon;
                                  return (
                                    <button
                                      key={format.id}
                                      onClick={() => setAudioFormat(format.id)}
                                      className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                                        audioFormat === format.id 
                                          ? "border-primary bg-primary/10 text-primary" 
                                          : "border-border hover:border-primary/50"
                                      }`}
                                    >
                                      <Icon className="h-4 w-4" />
                                      <div className="text-xs font-medium">{format.name}</div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Quality Settings */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Bitrate: {bitrate[0]}kbps</Label>
                                <Slider
                                  value={bitrate}
                                  onValueChange={setBitrate}
                                  max={320}
                                  min={64}
                                  step={32}
                                  className="mt-2"
                                />
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Sample Rate</Label>
                                <Select value={sampleRate} onValueChange={setSampleRate}>
                                  <SelectTrigger className="mt-2">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="16000">16 kHz</SelectItem>
                                    <SelectItem value="22050">22.05 kHz</SelectItem>
                                    <SelectItem value="44100">44.1 kHz</SelectItem>
                                    <SelectItem value="48000">48 kHz</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {/* Emotion Control */}
                            <div>
                              <Label className="text-sm font-medium mb-3 block">Voice Emotion</Label>
                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  { id: "neutral", name: "Neutral", emoji: "😐" },
                                  { id: "happy", name: "Happy", emoji: "😊" },
                                  { id: "sad", name: "Sad", emoji: "😢" },
                                  { id: "excited", name: "Excited", emoji: "🤩" },
                                  { id: "calm", name: "Calm", emoji: "😌" },
                                  { id: "angry", name: "Angry", emoji: "😠" }
                                ].map((emotionOption) => (
                                  <button
                                    key={emotionOption.id}
                                    onClick={() => setEmotion(emotionOption.id)}
                                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                                      emotion === emotionOption.id 
                                        ? "border-primary bg-primary/10 text-primary" 
                                        : "border-border hover:border-primary/50"
                                    }`}
                                  >
                                    <span className="text-lg">{emotionOption.emoji}</span>
                                    <div className="text-xs font-medium">{emotionOption.name}</div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Background Music */}
                            <div>
                              <Label className="text-sm font-medium mb-3 block">Background Music</Label>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { id: "none", name: "None" },
                                  { id: "ambient", name: "Ambient" },
                                  { id: "corporate", name: "Corporate" },
                                  { id: "upbeat", name: "Upbeat" }
                                ].map((music) => (
                                  <button
                                    key={music.id}
                                    onClick={() => setBackgroundMusic(music.id)}
                                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                                      backgroundMusic === music.id 
                                        ? "border-primary bg-primary/10 text-primary" 
                                        : "border-border hover:border-primary/50"
                                    }`}
                                  >
                                    <Music className="h-4 w-4 mx-auto mb-1" />
                                    <div className="text-xs font-medium">{music.name}</div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* SSML Support */}
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Settings className="h-4 w-4" />
                                  <Label className="text-sm font-medium">SSML Support</Label>
                                </div>
                                <button
                                  onClick={() => setSsmlEnabled(!ssmlEnabled)}
                                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                    ssmlEnabled ? "bg-primary" : "bg-muted-foreground"
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                      ssmlEnabled ? "translate-x-5" : "translate-x-1"
                                    }`}
                                  />
                                </button>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Use Speech Synthesis Markup Language for advanced control over pronunciation, pauses, and emphasis.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Pro Features Teaser for Free Users */}
                    {(userPlan === "free" || userPlan === "guest") && (
                      <div className="border-t pt-4">
                        <div className="p-4 bg-gradient-to-r from-primary/5 to-accent rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Unlock Pro Features</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Multiple audio formats
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              HD quality (up to 48kHz)
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Voice emotions
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Background music
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => setShowAuthDialog(true)}
                            className="btn-hero w-full text-xs py-2"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Upgrade to Pro
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating} 
                    className="btn-hero w-full"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Generating...
                      </>
                    ) : (
                      "Generate Speech"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Output Section */}
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Audio Output</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                        <Volume2 className="h-12 w-12 text-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        Your generated audio will appear here
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={togglePlay}
                      disabled={!text}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      onClick={handleDownload}
                      disabled={!text}
                      className="btn-secondary"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download {(userPlan === "pro" || userPlan === "business") ? audioFormat.toUpperCase() : "MP3"}
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground text-center space-y-1">
                    <div>Estimated generation time: ~3 seconds</div>
                    {(userPlan === "free" || userPlan === "guest") && (
                      <div className="text-xs">
                        Quality: Standard (16kHz) • Format: MP3 only
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 h-auto ml-1 text-xs"
                          onClick={() => setShowAuthDialog(true)}
                        >
                          Upgrade for HD quality
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="speech-to-text">
            <Card className="card-premium max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Speech to Text Conversion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Audio File</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your audio file here, or click to browse
                  </p>
                  <Button className="btn-secondary">
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supports MP3, WAV, M4A files up to 100MB
                  </p>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Output Language</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="p-3 rounded-lg border-2 border-primary bg-primary/10 text-primary transition-all flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-xs">EN</span>
                      </div>
                      <div className="text-xs font-medium">English</div>
                    </button>
                    
                    <button className="p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-all flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-semibold text-xs">ES</span>
                      </div>
                      <div className="text-xs font-medium">Spanish</div>
                    </button>
                    
                    <button className="p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-all flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-xs">FR</span>
                      </div>
                      <div className="text-xs font-medium">French</div>
                    </button>
                    
                    <button className="p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-all flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-yellow-600 font-semibold text-xs">DE</span>
                      </div>
                      <div className="text-xs font-medium">German</div>
                    </button>
                    
                    <button className="p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-all flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-xs">IT</span>
                      </div>
                      <div className="text-xs font-medium">Italian</div>
                    </button>
                  </div>
                </div>

                <Button className="btn-hero w-full">
                  Convert to Text
                </Button>

                <div className="bg-muted rounded-lg p-4">
                  <Label className="text-sm font-medium">Transcription Result</Label>
                  <div className="mt-2 text-muted-foreground">
                    Your transcribed text will appear here...
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  );
};

export default Convert;