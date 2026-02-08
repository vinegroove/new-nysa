import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/ProfileSettings";
import EmailPreferences from "@/components/EmailPreferences";
import AccountSettings from "@/components/AccountSettings";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // ProtectedRoute ensures user exists
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
