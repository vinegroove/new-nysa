import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailPreferencesProps {
  user: User;
}

interface EmailPrefs {
  receive_community_events_emails: boolean;
  receive_volunteering_events_emails: boolean;
  receive_newsletter: boolean;
}

const EmailPreferences = ({ user }: EmailPreferencesProps) => {
  const [preferences, setPreferences] = useState<EmailPrefs>({
    receive_community_events_emails: true,
    receive_volunteering_events_emails: true,
    receive_newsletter: true,
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPreferences();
  }, [user.id]);

  const fetchPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("receive_community_events_emails, receive_volunteering_events_emails, receive_newsletter")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching preferences:", error);
        return;
      }

      if (data) {
        setPreferences({
          receive_community_events_emails: data.receive_community_events_emails ?? true,
          receive_volunteering_events_emails: data.receive_volunteering_events_emails ?? true,
          receive_newsletter: data.receive_newsletter ?? true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (field: keyof EmailPrefs, value: boolean) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ [field]: value })
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating preference:", error);
        toast({
          title: "Error",
          description: "Failed to update email preferences. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setPreferences((prev) => ({ ...prev, [field]: value }));
      toast({
        title: "Preferences Updated",
        description: "Your email preferences have been saved successfully.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to update email preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">Loading preferences...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Communication Preferences</CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose which emails you'd like to receive from our community.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Community Events</p>
            <p className="text-xs text-muted-foreground">
              Get notified about upcoming community events and gatherings
            </p>
          </div>
          <Switch
            checked={preferences.receive_community_events_emails}
            onCheckedChange={(checked) =>
              updatePreference("receive_community_events_emails", checked)
            }
            disabled={updating}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Volunteering Events</p>
            <p className="text-xs text-muted-foreground">
              Get notified about volunteering opportunities and related events
            </p>
          </div>
          <Switch
            checked={preferences.receive_volunteering_events_emails}
            onCheckedChange={(checked) =>
              updatePreference("receive_volunteering_events_emails", checked)
            }
            disabled={updating}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Newsletter</p>
            <p className="text-xs text-muted-foreground">
              Receive our occasional newsletter with updates, stories, and community news
            </p>
          </div>
          <Switch
            checked={preferences.receive_newsletter}
            onCheckedChange={(checked) =>
              updatePreference("receive_newsletter", checked)
            }
            disabled={updating}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailPreferences;