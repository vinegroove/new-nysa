import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/ProfileSettings";
import EmailPreferences from "@/components/EmailPreferences";
import AccountSettings from "@/components/AccountSettings";
import { Grape } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (!session) {
        navigate("/auth");
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Grape className="h-8 w-8 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Nysa Community Account</h1>
          <p className="text-muted-foreground">Manage your profile and get notified of our occasional events</p>
        </div>

        <Tabs defaultValue="emails" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="emails" className="mt-6">
            <EmailPreferences user={user} />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <ProfileSettings user={user} />
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <AccountSettings user={user} />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
