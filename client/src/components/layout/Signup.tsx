import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/interceptor/axios.interceptor";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

// Define validation schema with Zod
const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email format" }),
    firstName: z.string().min(3, { message: "Firstname must be at least 3 characters" }),
    middleName: z.string().optional(),
    lastName: z.string().min(3, { message: "Lastname must be at least 3 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["STUDENT", "INDUSTRY_SUPERVISOR", "SCHOOL_SUPERVISOR"], {
      message: "Role is required",
    }),
    matricNo: z.string().optional(),
    position: z.string().optional(),
    companyName: z.string().optional(),
    faculty: z.string().optional(),
    schoolPosition: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === "STUDENT") return !!data.matricNo;
      if (data.role === "INDUSTRY_SUPERVISOR") return !!data.position && !!data.companyName;
      if (data.role === "SCHOOL_SUPERVISOR") return !!data.faculty && !!data.schoolPosition;
      return true;
    },
    {
      message: "Please fill in the required fields for the selected role",
      path: ["role"],
    }
  );

// Define form data type
type SignupFormData = z.infer<typeof formSchema>;

const Signup: React.FC = () => {
  const { toast } = useToast();
  const { setCredentials } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const role = form.watch("role");

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
        setLoading(true);
        const response = await apiClient.post(`/auth/register`, data);

        // Extract token and user data
        const { token, user } = response.data;
  
        // Set credentials in AuthContext
        setCredentials(user, token);
  
        // Redirect to dashboard
        navigate("/engine/overview");    
    } catch (error: any) {
        toast({
          variant: 'destructive',
          description: `Signup failed: ${error.message}`
        });
    } finally {
        setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome!</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create a Logit account to experience a seamless electronic logbook system.
        </p>

        {/* Form */}
        <div className="max-h-80 overflow-y-auto px-1">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {/* Firstname Field */}
                <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Middlename Field */}
                <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your middlename" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Lastname Field */}
                <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

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

                {/* Role Selection */}
                <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                        <FormItem className="flex items-center space-x-2">
                            <RadioGroupItem value="STUDENT" />
                            <FormLabel className="font-normal" style={{ margin: '0px', marginLeft: '4px'}}>Student</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                            <RadioGroupItem value="INDUSTRY_SUPERVISOR" />
                            <FormLabel className="font-normal" style={{ margin: '0px', marginLeft: '4px'}}>Industry Supervisor</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                            <RadioGroupItem value="SCHOOL_SUPERVISOR" />
                            <FormLabel className="font-normal" style={{ margin: '0px', marginLeft: '4px'}}>School Supervisor</FormLabel>
                        </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Conditional Fields */}
                {role === "STUDENT" && (
                <FormField
                    control={form.control}
                    name="matricNo"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Matric Number</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter your matric number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                )}

                {role === "INDUSTRY_SUPERVISOR" && (
                <>
                    <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                            <Input placeholder="Your position" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </>
                )}

                {role === "SCHOOL_SUPERVISOR" && (
                <>
                    <FormField
                    control={form.control}
                    name="faculty"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Faculty</FormLabel>
                        <FormControl>
                            <Input placeholder="Faculty name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="schoolPosition"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>School Position</FormLabel>
                        <FormControl>
                            <Input placeholder="School Position" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </>
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={loading}>
                 {
                    loading
                    ? 'Signing up...'
                    : 'Sign Up'
                 }
                </Button>
            </form>
            </Form>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Social Signup */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="w-full">
            Google
          </Button>
          <Button variant="outline" className="w-full">
            Facebook
          </Button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-4">
          &copy; Logit. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default Signup;
