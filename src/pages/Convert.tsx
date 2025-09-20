import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Upload, Download, Play, Pause, Volume2, Mic } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Convert = () => {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState("aria");
  const [speed, setSpeed] = useState([1]);
  const [pitch, setPitch] = useState([0]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to convert.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
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
                    placeholder="Enter your text here... (up to 5000 characters)"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={10}
                    className="resize-none"
                    maxLength={5000}
                  />
                  
                  <div className="text-sm text-muted-foreground text-right">
                    {text.length}/5000 characters
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Voice</Label>
                      <Select value={voice} onValueChange={setVoice}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aria">Aria (Female, American)</SelectItem>
                          <SelectItem value="sarah">Sarah (Female, British)</SelectItem>
                          <SelectItem value="roger">Roger (Male, American)</SelectItem>
                          <SelectItem value="liam">Liam (Male, Australian)</SelectItem>
                          <SelectItem value="charlotte">Charlotte (Female, French)</SelectItem>
                        </SelectContent>
                      </Select>
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
                      Download MP3
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground text-center">
                    Estimated generation time: ~3 seconds
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
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
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
    </div>
  );
};

export default Convert;