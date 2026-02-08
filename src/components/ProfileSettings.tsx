import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface ProfileSettingsProps {
  user: User;
}

interface Profile {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  bio?: string;
  created_at?: string;
}

const ProfileSettings = ({ user }: ProfileSettingsProps) => {
  const [profile, setProfile] = useState<Profile>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("profiles")
        .select("first_name, last_name, date_of_birth, bio, created_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate date of birth is not in the future
    if (profile.date_of_birth) {
      const dob = new Date(profile.date_of_birth);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dob > today) {
        setError("Date of birth cannot be in the future");
        setLoading(false);
        return;
      }
    }

    try {
      const { error } = await (supabase as any).from("profiles").upsert(
        {
          user_id: user.id,
          first_name: profile.first_name || null,
          last_name: profile.last_name || null,
          date_of_birth: profile.date_of_birth || null,
          bio: profile.bio || null,
        },
        {
          onConflict: "user_id",
        },
      );

      if (error) throw error;

      toast({
        title: "Profile updated!",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your personal information to connect with the Nysa community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email || ""} disabled className="bg-muted" />
              <p className="text-sm text-muted-foreground">Email cannot be changed</p>
            </div>

            {profile.created_at && (
              <div className="space-y-2">
                <Label>Member Since</Label>
                <p className="text-sm text-muted-foreground">
                  Joined {formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={profile.first_name || ""}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  placeholder="Your first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={profile.last_name || ""}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={profile.date_of_birth || ""}
                onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                min={new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split('T')[0]}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={profile.bio || ""}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us a bit about yourself and your interest in vineyard restoration..."
                rows={3}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
