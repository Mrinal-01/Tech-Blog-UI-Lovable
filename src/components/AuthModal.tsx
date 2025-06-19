import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, User, Phone, Chrome, ArrowLeft } from "lucide-react";
import OTPVerification from "./OTPVerification";
import ForgotPassword from "./ForgotPassword";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: 'login' | 'signup';
}

const AuthModal = ({ open, onOpenChange, initialView = 'login' }: AuthModalProps) => {
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'otp' | 'forgot'>(initialView);
  const [userEmail, setUserEmail] = useState("");
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    phone: "",
    name: "",
    password: "",
    rePassword: ""
  });

  // Reset state when modal opens/closes or view changes
  const resetStates = () => {
    setLoginEmail("");
    setLoginPassword("");
    setSignupData({
      username: "",
      email: "",
      phone: "",
      name: "",
      password: "",
      rePassword: ""
    });
    setUserEmail("");
  };

  // Handle modal open/close
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetStates();
      setCurrentView(initialView);
    }
    onOpenChange(open);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Test login functionality
    if (loginEmail === "test@example.com" && loginPassword === "password") {
      console.log("Test login successful");
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', loginEmail);
      onOpenChange(false);
      window.location.reload(); // Refresh to update header
      return;
    }
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', loginEmail);
        onOpenChange(false);
      } else {
        console.error("Login failed");
        alert("Invalid credentials. Try test@example.com / password for demo.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error. Try test@example.com / password for demo.");
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.rePassword) {
      alert("Passwords don't match!");
      return;
    }
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupData.username,
          email: signupData.email,
          phone: signupData.phone,
          name: signupData.name,
          password: signupData.password
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        setUserEmail(signupData.email);
        setCurrentView('otp');
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('/api/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Google login initiated:", data);
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleBackToAuth = () => {
    setCurrentView('login');
    resetStates();
  };

  // Update view when initialView prop changes
  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView]);

  if (currentView === 'otp') {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <OTPVerification 
            email={userEmail} 
            onVerified={() => {
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('userEmail', userEmail);
              setCurrentView('login');
              onOpenChange(false);
            }}
            onBack={handleBackToAuth}
          />
        </DialogContent>
      </Dialog>
    );
  }

  if (currentView === 'forgot') {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <ForgotPassword 
            onBack={handleBackToAuth}
            onSuccess={() => {
              setCurrentView('login');
              alert("Password reset link sent to your email!");
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-0">
        <div className="relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>
          
          <div className="relative p-8">
            <DialogHeader className="text-center mb-6">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {currentView === 'login' ? "Welcome Back!" : "Join TechBlog"}
              </DialogTitle>
              <p className="text-muted-foreground mt-2">
                {currentView === 'login' ? "Sign in to your account" : "Create your account"}
              </p>
            </DialogHeader>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full mb-6 h-12 border-2 border-border hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
            >
              <Chrome className="w-5 h-5 mr-3 text-blue-600" />
              Continue with Google
            </Button>

            <div className="relative mb-6">
              <Separator />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 px-3 text-sm text-muted-foreground">
                or
              </span>
            </div>

            {currentView === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="pl-10 h-12 border-2 border-border focus:border-purple-400 rounded-lg"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-10 h-12 border-2 border-border focus:border-purple-400 rounded-lg"
                    required
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setCurrentView('forgot')}
                    className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Sign In
                </Button>

                <div className="text-center text-sm text-muted-foreground p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  Demo: test@example.com / password
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                    className="pl-10 h-12 border-2 border-border focus:border-purple-400 rounded-lg"
                    required
                  />
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={signupData.username}
                    onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                    className="pl-10 h-12 border-2 border-border focus:border-purple-400 rounded-lg"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    className="pl-10 h-12 border-2 border-border focus:border-purple-400 rounded-lg"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                    className="pl-10 h-12 border-2 border-border focus:border-purple-400 rounded-lg"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    className="pl-10 h-12 border-2 border-border focus:border-purple-400 rounded-lg"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={signupData.rePassword}
                    onChange={(e) => setSignupData({...signupData, rePassword: e.target.value})}
                    className="pl-10 h-12 border-2 border-border focus:border-purple-400 rounded-lg"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Create Account
                </Button>
              </form>
            )}

            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                {currentView === 'login' ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => {
                    setCurrentView(currentView === 'login' ? 'signup' : 'login');
                    resetStates();
                  }}
                  className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                >
                  {currentView === 'login' ? "Create Account" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
