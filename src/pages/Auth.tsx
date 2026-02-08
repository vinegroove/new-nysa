import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Grape, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LOADING_MESSAGES } from "@/lib/constants";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [updatePasswordMode, setUpdatePasswordMode] = useState(false);

  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "signin";
  const mode = searchParams.get("mode");

  const { isLoading, error, signIn, signUp, resetPassword, updatePassword } = useAuth();

  // Check if this is a password recovery flow
  useState(() => {
    if (mode === "reset-password" || searchParams.get("type") === "recovery") {
      setUpdatePasswordMode(true);
    }
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn({ email, password });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp({ email, password });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    const result = await resetPassword(email);
    if (result.success) {
      setResetMode(false);
      setEmail("");
    }
    setResetLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePassword({ newPassword, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 mb-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Grape className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl">Nysa</span>
          </div>
          <p className="text-muted-foreground">Join our sustainable viticulture restoration community</p>
        </div>

        {updatePasswordMode ? (
          <Card>
            <CardHeader>
              <CardTitle>Set New Password</CardTitle>
              <CardDescription>Please enter your new password to complete the reset process</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? LOADING_MESSAGES.UPDATING_PASSWORD : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Tabs
            defaultValue={defaultTab}
            className="w-full"
            onValueChange={() => {
              setEmail("");
              setPassword("");
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>{resetMode ? "Reset Password" : "Welcome Back"}</CardTitle>
                  <CardDescription>
                    {resetMode
                      ? "Enter your email address to receive a password reset link"
                      : "Sign in to your account to access your dashboard"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!resetMode ? (
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                        />
                      </div>
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? LOADING_MESSAGES.SIGNING_IN : "Sign In"}
                      </Button>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setResetMode(true)}
                          className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Email</Label>
                        <Input
                          id="reset-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <Button type="submit" className="w-full" disabled={resetLoading}>
                        {resetLoading ? LOADING_MESSAGES.SENDING_RESET : "Send Reset Email"}
                      </Button>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setResetMode(false);
                          }}
                          className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                        >
                          Back to Sign In
                        </button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Join Our Community</CardTitle>
                  <CardDescription>Create an account to participate in vineyard restoration events</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? LOADING_MESSAGES.CREATING_ACCOUNT : "Create Account"}
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        By signing up you accept our{" "}
                        <Link to="/privacy-policy" className="hover:text-foreground underline-offset-4 hover:underline">
                          privacy policy
                        </Link>{" "}
                        and{" "}
                        <Link to="/terms-of-use" className="hover:text-foreground underline-offset-4 hover:underline">
                          terms of use
                        </Link>
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Auth;
