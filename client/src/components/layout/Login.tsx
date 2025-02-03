import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import apiClient from "@/interceptor/axios.interceptor";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Define validation schema with Zod
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string(),
});

// Define form data type
type LoginFormData = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const { toast } = useToast();
  const { setCredentials } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setLoading(true);
      const response = await apiClient.post(`/auth/login`, data);

      // Extract token and user data
      const { token, user } = response.data;

      // Set credentials in AuthContext
      setCredentials(user, token);

      // Redirect to dashboard
      navigate("/engine/overview");      
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: `Login failed. ${error.message}`,
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to your logit account to experience a seamless electronic logbook system.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {
                loading
                ? 'Logging in...'
                : 'Login'
              }
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Login;
