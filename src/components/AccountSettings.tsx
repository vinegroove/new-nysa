import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, Trash2 } from "lucide-react";

interface AccountSettingsProps {
  user: User;
}

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const AccountSettings = ({ user }: AccountSettingsProps) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onPasswordSubmit = async (values: PasswordFormValues) => {
    setIsChangingPassword(true);
    try {
      // First verify the current password
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: values.currentPassword,
      });

      if (verifyError) {
        toast({
          title: "Incorrect current password",
          description: "Please enter your correct current password.",
          variant: "destructive",
        });
        return;
      }

      // If verification succeeds, update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: values.newPassword,
      });

      if (updateError) throw updateError;

      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (deleteConfirmation !== "DELETE") {
      toast({
        title: "Invalid confirmation",
        description: "Please type 'DELETE' to confirm account deletion.",
        variant: "destructive",
      });
      return;
    }

    setIsDeletingAccount(true);
    try {
      // Call the edge function to delete the account completely
      const { data, error } = await supabase.functions.invoke("delete-user-account", {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      // Sign out the user locally
      await supabase.auth.signOut();

      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });

      // Redirect to home
      navigate("/");
    } catch (error: any) {
      console.error("Account deletion error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeletingAccount(false);
      setDeleteConfirmation("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your current password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your new password (min. 6 characters)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Account Deletion Section */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="space-y-2">
                  <p>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </p>
                  <p>
                    To confirm deletion, please type <span className="font-mono font-bold">DELETE</span> below:
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <Label htmlFor="delete-confirmation">Type DELETE to confirm:</Label>
                <Input
                  id="delete-confirmation"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="DELETE"
                  className="mt-2"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteConfirmation("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleAccountDeletion}
                  disabled={isDeletingAccount || deleteConfirmation !== "DELETE"}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeletingAccount && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
