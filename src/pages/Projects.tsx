import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Play, Pause, Edit3, Trash2, Calendar, Volume2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Mock projects data - in real app this would come from backend
  const projects = [
    {
      id: "1",
      title: "Welcome Message",
      text: "Welcome to our AI-powered voice platform. Transform your ideas into lifelike speech with just a few clicks.",
      voice: "Aria",
      createdAt: "2024-01-15",
      duration: "12s",
      format: "MP3",
      quality: "High"
    },
    {
      id: "2", 
      title: "Product Demo Script",
      text: "Discover the future of text-to-speech technology. Our advanced AI creates natural, expressive voices...",
      voice: "Roger",
      createdAt: "2024-01-14",
      duration: "45s",
      format: "MP3",
      quality: "High"
    },
    {
      id: "3",
      title: "Podcast Intro",
      text: "Hello and welcome to Tech Talk, the podcast where we explore the latest innovations in artificial intelligence...",
      voice: "Sarah",
      createdAt: "2024-01-12",
      duration: "28s",
      format: "MP3", 
      quality: "Ultra"
    }
  ];

  const handlePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // In real app, would play actual audio
      setTimeout(() => setPlayingId(null), 3000);
    }
  };

  const handleDownload = (title: string) => {
    toast({
      title: "Download Started",
      description: `Downloading "${title}"...`,
    });
  };

  const handleDelete = (id: string, title: string) => {
    toast({
      title: "Project Deleted",
      description: `"${title}" has been removed from your projects.`,
      variant: "destructive",
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Projects
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Access, manage, and rework your previous voice generation projects. Available for Pro and Business users.
            </p>
          </div>

          {projects.length === 0 ? (
            <Card className="card-premium max-w-2xl mx-auto text-center">
              <CardContent className="py-12">
                <Volume2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start creating voice projects to see them here. All your generated audio will be saved automatically.
                </p>
                <Button className="btn-hero" asChild>
                  <a href="/convert">Create First Project</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 max-w-4xl mx-auto">
              {projects.map((project) => (
                <Card key={project.id} className="card-premium">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(project.createdAt).toLocaleDateString()}
                          </div>
                          <Badge variant="secondary">{project.voice}</Badge>
                          <span>{project.duration}</span>
                          <span>{project.format}</span>
                          <Badge variant="outline">{project.quality} Quality</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm leading-relaxed">
                        {project.text.length > 150 
                          ? `${project.text.substring(0, 150)}...`
                          : project.text
                        }
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePlay(project.id)}
                        >
                          {playingId === project.id ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Playing...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Preview
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(project.title)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <a href={`/convert?project=${project.id}`}>
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </a>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(project.id, project.title)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Card className="card-premium max-w-md mx-auto">
              <CardContent className="py-6">
                <h3 className="font-semibold mb-2">Storage Limit</h3>
                <div className="bg-muted rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  75% of storage used (15GB / 20GB)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Projects;